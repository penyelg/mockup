export type UserRole = 'patient' | 'clinic_rep' | 'admin';

export type ServiceCategory =
  | 'General Practice'
  | 'Dental Care'
  | 'Maternal & Child'
  | 'Pediatrics'
  | 'Diagnostic Laboratory'
  | 'Internal Medicine';

export interface ClinicService {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number | null; // null represents "Price not listed"
  durationMinutes: number;
  isAvailable: boolean;
}

export interface AppointmentSlot {
  date: string; // YYYY-MM-DD
  time: string; // e.g. "09:00 AM"
  isAvailable: boolean;
  bookedBy?: string;
}

export interface Clinic {
  id: string;
  name: string;
  licenseNo: string;
  barangay: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  description: string;
  image: string;
  status: 'approved' | 'pending' | 'rejected';
  startingPrice: number | null;
  services: ClinicService[];
  nextAvailableSlot: string;
  accreditations: string[];
  slots: AppointmentSlot[];
  submittedDate?: string;
  rejectionReason?: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled';

export interface AppointmentRequest {
  id: string; // e.g. "APT-ISB-2026-001"
  clinicId: string;
  clinicName: string;
  serviceId: string;
  serviceName: string;
  patientName: string;
  patientPhone: string;
  patientBarangay: string;
  appointmentDate: string;
  appointmentTime: string;
  note: string;
  status: AppointmentStatus;
  clinicResponseNote?: string;
  createdAt: string;
  estimatedPrice: number | null;
}

export interface AiNavigationResult {
  query: string;
  interpretedCategory: ServiceCategory;
  urgencyLevel: 'Routine' | 'Prompt Consultation' | 'Urgent / Emergency Attention';
  confidenceNote: string;
  patientPreparationTips: string[];
  matchingClinicIds: string[];
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  barangay: string;
  clinicId?: string; // for clinic rep
  status: 'Active' | 'Under Review';
}
