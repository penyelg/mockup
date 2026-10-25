import { Clinic, AiNavigationResult, ServiceCategory } from '../types';

interface ServicePattern {
  category: ServiceCategory;
  keywords: string[];
  explanation: string;
  urgency: 'Routine' | 'Prompt Consultation' | 'Urgent / Emergency Attention';
  preparationTips: string[];
}

const KNOWLEDGE_BASE: ServicePattern[] = [
  {
    category: 'Dental Care',
    keywords: ['tooth', 'teeth', 'dental', 'molar', 'gums', 'cavity', 'bunot', 'pasta', 'ngipin', 'oral', 'cleaning', 'dentist', 'denture'],
    explanation: 'Your stated concern involves dental symptoms or oral health needs. The system matched this to local Dental Clinics in Isabel for oral examination, extractions, or restorations.',
    urgency: 'Prompt Consultation',
    preparationTips: [
      'Gently rinse mouth with warm salt water if experiencing soreness.',
      'Do not place aspirin directly on gums or tooth.',
      'Bring previous dental records or x-rays if available.',
      'Avoid hot or sugary beverages prior to your oral exam.',
    ],
  },
  {
    category: 'Pediatrics',
    keywords: ['child', 'baby', 'toddler', 'infant', 'pediatric', 'kid', 'bata', 'vaccine', 'immunization', 'bakuna', 'growth', 'milestone', 'pediatrician'],
    explanation: 'Your stated concern concerns infant or child healthcare. The system routed you to pediatric and immunization-capable clinics in Isabel, Leyte.',
    urgency: 'Prompt Consultation',
    preparationTips: [
      'Bring your child\'s Mother & Child Health Passport / Baby Booklet for immunization records.',
      'Keep a written log of child\'s highest fever temperatures and hydration intake.',
      'Bring a familiar toy or comfort item for the child.',
    ],
  },
  {
    category: 'Maternal & Child',
    keywords: ['pregnant', 'pregnancy', 'prenatal', 'ultrasound', 'buntis', 'trimester', 'fetal', 'maternity', 'pap smear', 'family planning', 'cervical'],
    explanation: 'Your inquiry relates to maternal health, pregnancy checkup, or reproductive wellness. The system matched this to accredited maternity and prenatal care providers in Isabel.',
    urgency: 'Routine',
    preparationTips: [
      'Bring your PhilHealth ID or MDR (Member Data Record) for maternity coverage.',
      'Bring your previous ultrasound films or laboratory reports.',
      'Wear loose, comfortable two-piece clothing for abdominal examination.',
    ],
  },
  {
    category: 'Diagnostic Laboratory',
    keywords: ['blood test', 'lab', 'laboratory', 'cbc', 'urinalysis', 'cholesterol', 'sugar', 'fbs', 'ultrasound', 'x-ray', 'stool', 'fecalysis', 'fasting', 'test'],
    explanation: 'Your stated concern requires clinical laboratory tests or medical ultrasound imaging. The system identified licensed diagnostic laboratories in Isabel, Leyte.',
    urgency: 'Routine',
    preparationTips: [
      'Confirm if fasting is needed (FBS and lipid profile usually require 8 to 10 hours overnight fasting; water is permitted).',
      'Bring the doctor\'s diagnostic laboratory request slip.',
      'Arrive early in the morning for prompt specimen collection and same-day results.',
    ],
  },
  {
    category: 'Internal Medicine',
    keywords: ['hypertension', 'blood pressure', 'bp', 'heart', 'chest', 'diabetes', 'chronic', 'kidney', 'specialist', 'stroke', 'maintenance', 'senior', 'adult'],
    explanation: 'Your symptoms or management inquiry corresponds to adult internal medicine and chronic illness monitoring. Matched to specialist outpatient consultation in Isabel.',
    urgency: 'Prompt Consultation',
    preparationTips: [
      'Bring your current list of maintenance prescription medications.',
      'Bring your home blood pressure or blood glucose monitoring log.',
      'Prepare questions regarding your medication titration or daily symptoms.',
    ],
  },
  {
    category: 'General Practice',
    keywords: ['fever', 'cough', 'cold', 'flu', 'headache', 'checkup', 'consultation', 'lagnat', 'ubo', 'sipon', 'general', 'doctor', 'pain', 'rash', 'allergy'],
    explanation: 'Your concern fits primary outpatient medical consultation. The system directed you to general outpatient clinics and the Isabel Rural Health Unit.',
    urgency: 'Prompt Consultation',
    preparationTips: [
      'Note down when your symptoms began and any over-the-counter medication taken.',
      'Bring valid government ID and PhilHealth number for local registration.',
      'Wear a protective mask if experiencing respiratory symptoms.',
    ],
  },
];

export function runAiHealthcareNavigation(
  query: string,
  clinics: Clinic[],
  preferredBarangay?: string,
  preferredCategory?: string
): AiNavigationResult {
  const lowerQuery = query.toLowerCase();

  // If user selected an explicit category filter, prefer that
  let matchedPattern = KNOWLEDGE_BASE.find((p) => p.category === preferredCategory);

  if (!matchedPattern) {
    // Score based on keyword matches
    let highestScore = 0;
    matchedPattern = KNOWLEDGE_BASE[5]; // Default to General Practice

    for (const pattern of KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of pattern.keywords) {
        if (lowerQuery.includes(kw)) {
          score += 2;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        matchedPattern = pattern;
      }
    }
  }

  // Find clinics in Isabel that offer services in this category and are approved
  let matchingClinics = clinics.filter(
    (c) =>
      c.status === 'approved' &&
      c.services.some((s) => s.category === matchedPattern!.category)
  );

  // If location preference is specific (not 'All Isabel, Leyte')
  if (preferredBarangay && preferredBarangay !== 'All Isabel, Leyte') {
    const localMatches = matchingClinics.filter((c) => c.barangay.toLowerCase() === preferredBarangay.toLowerCase());
    if (localMatches.length > 0) {
      matchingClinics = localMatches;
    }
  }

  // Fallback: If no direct match in category, include General Practice clinics
  if (matchingClinics.length === 0) {
    matchingClinics = clinics.filter((c) => c.status === 'approved');
  }

  return {
    query,
    interpretedCategory: matchedPattern.category,
    urgencyLevel: matchedPattern.urgency,
    confidenceNote: matchedPattern.explanation,
    patientPreparationTips: matchedPattern.preparationTips,
    matchingClinicIds: matchingClinics.map((c) => c.id),
  };
}
