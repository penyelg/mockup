import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { runAiHealthcareNavigation } from '../../utils/aiNavigator';
import { ISABEL_BARANGAYS } from '../../data/mockData';
import { AiNavigationResult, ServiceCategory } from '../../types';
import {
  Sparkles,
  MapPin,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  AlertTriangle,
  Lightbulb,
  Search,
  Filter,
} from 'lucide-react';

export const PatientAiNav: React.FC = () => {
  const {
    clinics,
    setSelectedClinicId,
    setPatientTab,
    setAppointmentModalOpen,
    prefilledConcern,
  } = useApp();

  const [concern, setConcern] = useState(
    prefilledConcern || 'I have a toothache and want to find a nearby dental clinic.'
  );
  const [selectedBarangay, setSelectedBarangay] = useState('All Isabel, Leyte');
  const [selectedCategory, setSelectedCategory] = useState<string>('Auto (AI Detection)');
  const [navResult, setNavResult] = useState<AiNavigationResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Run initial match on mount or when prefilled concern changes
  useEffect(() => {
    if (prefilledConcern) {
      setConcern(prefilledConcern);
      handlePerformMatch(prefilledConcern, selectedBarangay, selectedCategory);
    } else {
      handlePerformMatch(concern, selectedBarangay, selectedCategory);
    }
  }, [prefilledConcern]);

  const handlePerformMatch = (query: string, barangay: string, category: string) => {
    setIsSearching(true);
    // Simulate brief navigation processing (200ms)
    setTimeout(() => {
      const explicitCategory = category === 'Auto (AI Detection)' ? undefined : category;
      const result = runAiHealthcareNavigation(query, clinics, barangay, explicitCategory);
      setNavResult(result);
      setIsSearching(false);
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concern.trim()) return;
    handlePerformMatch(concern, selectedBarangay, selectedCategory);
  };

  const samplePrompts = [
    { text: 'I have a toothache and want to find a nearby dental clinic.', label: 'Dental pain' },
    { text: 'My toddler has a high fever and barking cough for 2 days.', label: 'Child illness' },
    { text: '5 months pregnant and needing routine prenatal checkup and ultrasound.', label: 'Maternal / Prenatal' },
    { text: 'Need fasting blood sugar, cholesterol panel, and CBC lab test.', label: 'Diagnostic lab tests' },
    { text: 'Severe itchy red skin rash with bumps spreading on arms.', label: 'Skin rash / Consultation' },
  ];

  // Matched clinic objects
  const matchedClinics = clinics.filter((c) =>
    navResult?.matchingClinicIds.includes(c.id)
  );

  return (
    <div className="space-y-5 pb-6">
      {/* Header Banner */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-[#2457A7] font-semibold text-xs mb-1">
          <Sparkles className="w-4 h-4 text-[#27A89A]" />
          <span>Conversational Healthcare Matcher</span>
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          AI-Assisted Healthcare Navigation
        </h2>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          State your symptoms or medical concern in your own words. The system matches your request to available healthcare specialties and licensed clinics in Isabel, Leyte.
        </p>

        {/* Mandatory Disclaimer */}
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-900 leading-snug">
            <span className="font-semibold">Disclaimer: </span>
            Suggestions are for healthcare navigation and clinic discovery only and are NOT a medical diagnosis. The system does not prescribe medications.
          </p>
        </div>
      </div>

      {/* Navigation Input Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-800 mb-1">
            Describe what healthcare service or concern you have:
          </label>
          <textarea
            rows={3}
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            placeholder="e.g., I have a toothache and want to find a nearby dental clinic in Isabel..."
            className="w-full text-xs sm:text-sm p-3 rounded-lg border border-slate-300 focus:border-[#2457A7] focus:ring-1 focus:ring-[#2457A7] focus:outline-none text-slate-800 resize-none"
          />
        </div>

        {/* Quick Example Concern Buttons */}
        <div>
          <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
            Or try an example concern:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setConcern(p.text);
                  handlePerformMatch(p.text, selectedBarangay, selectedCategory);
                }}
                className={`text-[11px] px-2.5 py-1 rounded-md border transition-all text-left ${
                  concern === p.text
                    ? 'bg-blue-50 border-[#2457A7] text-[#2457A7] font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Preferences Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#27A89A]" />
              Location Preference (Isabel, Leyte):
            </label>
            <select
              value={selectedBarangay}
              onChange={(e) => setSelectedBarangay(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-[#2457A7]"
            >
              {ISABEL_BARANGAYS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#2457A7]" />
              Specialty Preference:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-[#2457A7]"
            >
              <option value="Auto (AI Detection)">Auto (AI Detection from text)</option>
              <option value="Dental Care">Dental Care</option>
              <option value="General Practice">General Practice</option>
              <option value="Maternal & Child">Maternal & Child</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Diagnostic Laboratory">Diagnostic Laboratory</option>
              <option value="Internal Medicine">Internal Medicine</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSearching || !concern.trim()}
          className="w-full py-2.5 px-4 rounded-lg bg-[#2457A7] hover:bg-[#1c4585] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-[#27A89A]" />
          <span>{isSearching ? 'Analyzing Stated Need...' : 'Find Suitable Services'}</span>
        </button>
      </form>

      {/* Simulated AI Navigation Results */}
      {navResult && (
        <section className="space-y-4">
          {/* Interpreted Match Result Card */}
          <div className="bg-white rounded-xl border border-sky-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-sky-800 font-semibold">
                <Sparkles className="w-4 h-4 text-[#27A89A]" />
                <span>Interpreted Service Category</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-100 text-[#2457A7] font-semibold">
                {navResult.interpretedCategory}
              </span>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="font-medium text-slate-900 mb-1">Matching Rationale:</p>
              <p>{navResult.confidenceNote}</p>
            </div>

            {/* Preparation Tips Checklist */}
            <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-100">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2457A7] mb-2">
                <Lightbulb className="w-4 h-4 text-[#27A89A]" />
                <span>Recommended Patient Preparation:</span>
              </div>
              <ul className="space-y-1.5">
                {navResult.patientPreparationTips.map((tip, idx) => (
                  <li key={idx} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                    <span className="text-[#27A89A] font-bold">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Matching Clinic Cards in Isabel, Leyte */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Matching Clinics in Isabel, Leyte ({matchedClinics.length})
              </h3>
              <span className="text-[11px] text-slate-500">
                Sorted by specialty match
              </span>
            </div>

            {matchedClinics.length === 0 ? (
              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                No matching clinics found for the selected criteria. Try selecting "All Isabel, Leyte".
              </div>
            ) : (
              matchedClinics.map((clinic) => {
                const categoryServices = clinic.services.filter(
                  (s) => s.category === navResult.interpretedCategory
                );
                const displayServices = categoryServices.length > 0 ? categoryServices : clinic.services;

                return (
                  <div
                    key={clinic.id}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            {clinic.name}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{clinic.address}</span>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-500 block">Starting at</span>
                        <span className="text-xs font-bold text-slate-900">
                          {clinic.startingPrice !== null
                            ? clinic.startingPrice === 0
                              ? 'Free / Subsidized'
                              : `₱${clinic.startingPrice.toLocaleString()}`
                            : 'Price not listed'}
                        </span>
                      </div>
                    </div>

                    {/* Relevant Services Offered */}
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-600 block mb-1">
                        Relevant Services for {navResult.interpretedCategory}:
                      </span>
                      <div className="space-y-1">
                        {displayServices.slice(0, 2).map((srv) => (
                          <div
                            key={srv.id}
                            className="flex items-center justify-between text-[11px]"
                          >
                            <span className="text-slate-800 font-medium">{srv.name}</span>
                            <span className="text-slate-600 font-mono tabular-nums">
                              {srv.price !== null
                                ? srv.price === 0
                                  ? 'Free'
                                  : `₱${srv.price.toLocaleString()}`
                                : 'Price unlisted'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{clinic.hours.split(':')[0]}</span>
                      </span>
                      <span className="text-emerald-700 font-semibold">
                        Next Slot: {clinic.nextAvailableSlot}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setSelectedClinicId(clinic.id);
                          setPatientTab('clinic-details');
                        }}
                        className="flex-1 py-1.5 px-3 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs transition-colors"
                      >
                        View Clinic Profile
                      </button>
                      <button
                        onClick={() => {
                          setSelectedClinicId(clinic.id);
                          setAppointmentModalOpen(true);
                        }}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-[#2457A7] hover:bg-[#1c4585] text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Check Availability & Request</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}
    </div>
  );
};
