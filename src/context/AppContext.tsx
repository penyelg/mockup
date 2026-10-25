import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Clinic,
  AppointmentRequest,
  UserRole,
  DemoUser,
  ClinicService,
  AppointmentSlot,
} from '../types';
import {
  INITIAL_CLINICS,
  INITIAL_APPOINTMENTS,
  DEMO_USERS,
} from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Role & Viewport
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  phoneFrameMode: boolean;
  setPhoneFrameMode: (enabled: boolean) => void;

  // Patient Navigation State
  patientTab: 'home' | 'ai-nav' | 'clinics' | 'clinic-details' | 'appointments' | 'profile';
  setPatientTab: (tab: 'home' | 'ai-nav' | 'clinics' | 'clinic-details' | 'appointments' | 'profile') => void;
  selectedClinicId: string | null;
  setSelectedClinicId: (id: string | null) => void;
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  prefilledConcern: string;
  setPrefilledConcern: (concern: string) => void;
  appointmentModalOpen: boolean;
  setAppointmentModalOpen: (open: boolean) => void;

  // Clinic Rep Navigation State
  clinicRepTab: 'overview' | 'profile' | 'services' | 'availability' | 'requests';
  setClinicRepTab: (tab: 'overview' | 'profile' | 'services' | 'availability' | 'requests') => void;
  activeClinicRepClinicId: string;
  setActiveClinicRepClinicId: (clinicId: string) => void;

  // Admin Navigation State
  adminTab: 'overview' | 'approvals' | 'clinics' | 'users' | 'reports';
  setAdminTab: (tab: 'overview' | 'approvals' | 'clinics' | 'users' | 'reports') => void;

  // Data Collections
  clinics: Clinic[];
  appointments: AppointmentRequest[];
  users: DemoUser[];

  // Interactive Actions
  requestAppointment: (data: {
    clinicId: string;
    serviceId: string;
    date: string;
    time: string;
    note: string;
    patientName: string;
    patientPhone: string;
    patientBarangay: string;
  }) => AppointmentRequest;
  cancelAppointment: (id: string, reason?: string) => void;
  updateAppointmentStatus: (
    id: string,
    status: 'confirmed' | 'rejected',
    responseNote?: string
  ) => void;
  approveClinicSubmission: (clinicId: string) => void;
  rejectClinicSubmission: (clinicId: string, reason: string) => void;
  updateClinicProfile: (clinicId: string, updates: Partial<Clinic>) => void;
  addClinicService: (clinicId: string, service: Omit<ClinicService, 'id'>) => void;
  updateClinicService: (clinicId: string, serviceId: string, updates: Partial<ClinicService>) => void;
  deleteClinicService: (clinicId: string, serviceId: string) => void;
  toggleSlotAvailability: (clinicId: string, date: string, time: string) => void;
  addClinicSlot: (clinicId: string, slot: AppointmentSlot) => void;
  resetDemoData: () => void;

  // Toast Notifications
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CLINICS: 'isabelcare_clinics_v1',
  APPOINTMENTS: 'isabelcare_appointments_v1',
  ROLE: 'isabelcare_role_v1',
  PHONE_FRAME: 'isabelcare_phone_frame_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return saved === 'clinic_rep' || saved === 'admin' ? saved : 'patient';
  });

  const [phoneFrameMode, setPhoneFrameMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PHONE_FRAME);
    return saved !== null ? saved === 'true' : false; // Default to fluid on larger screens, users can toggle anytime
  });

  const [patientTab, setPatientTab] = useState<'home' | 'ai-nav' | 'clinics' | 'clinic-details' | 'appointments' | 'profile'>('home');
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>('isabel-smile-dental');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [prefilledConcern, setPrefilledConcern] = useState<string>('');
  const [appointmentModalOpen, setAppointmentModalOpen] = useState<boolean>(false);

  const [clinicRepTab, setClinicRepTab] = useState<'overview' | 'profile' | 'services' | 'availability' | 'requests'>('overview');
  const [activeClinicRepClinicId, setActiveClinicRepClinicId] = useState<string>('isabel-smile-dental');

  const [adminTab, setAdminTab] = useState<'overview' | 'approvals' | 'clinics' | 'users' | 'reports'>('overview');

  const [clinics, setClinics] = useState<Clinic[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLINICS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CLINICS;
      }
    }
    return INITIAL_CLINICS;
  });

  const [appointments, setAppointments] = useState<AppointmentRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_APPOINTMENTS;
      }
    }
    return INITIAL_APPOINTMENTS;
  });

  const [users] = useState<DemoUser[]>(DEMO_USERS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PHONE_FRAME, String(phoneFrameMode));
  }, [phoneFrameMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLINICS, JSON.stringify(clinics));
  }, [clinics]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.CLINICS);
    localStorage.removeItem(STORAGE_KEYS.APPOINTMENTS);
    setClinics(INITIAL_CLINICS);
    setAppointments(INITIAL_APPOINTMENTS);
    setSelectedClinicId('isabel-smile-dental');
    addToast('info', 'Demo Data Reset', 'Restored sample clinics, slots, and initial appointment records.');
  };

  // Patient Submits an Appointment Request
  const requestAppointment = (data: {
    clinicId: string;
    serviceId: string;
    date: string;
    time: string;
    note: string;
    patientName: string;
    patientPhone: string;
    patientBarangay: string;
  }): AppointmentRequest => {
    const clinic = clinics.find((c) => c.id === data.clinicId);
    const service = clinic?.services.find((s) => s.id === data.serviceId);

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().substring(0, 5);

    const newRequest: AppointmentRequest = {
      id: `APT-ISB-2026-${Math.floor(100 + Math.random() * 900)}`,
      clinicId: data.clinicId,
      clinicName: clinic?.name || 'Local Clinic',
      serviceId: data.serviceId,
      serviceName: service?.name || 'Healthcare Service',
      patientName: data.patientName || 'Maria Clara Santos',
      patientPhone: data.patientPhone || '0917-555-0192',
      patientBarangay: data.patientBarangay || 'Poblacion',
      appointmentDate: data.date,
      appointmentTime: data.time,
      note: data.note,
      status: 'pending',
      createdAt: `${dateStr} ${timeStr}`,
      estimatedPrice: service?.price ?? null,
    };

    setAppointments((prev) => [newRequest, ...prev]);

    // Update clinic slots to mark as reserved
    setClinics((prev) =>
      prev.map((c) => {
        if (c.id === data.clinicId) {
          const updatedSlots = c.slots.map((s) => {
            if (s.date === data.date && s.time === data.time) {
              return { ...s, isAvailable: false, bookedBy: data.patientName };
            }
            return s;
          });
          return { ...c, slots: updatedSlots };
        }
        return c;
      })
    );

    addToast(
      'success',
      'Appointment Request Submitted',
      `Sent to ${clinic?.name}. Request status is currently Pending Clinic Confirmation.`
    );

    return newRequest;
  };

  const cancelAppointment = (id: string, reason?: string) => {
    const target = appointments.find((a) => a.id === id);
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'cancelled',
              clinicResponseNote: reason || 'Cancelled by patient.',
            }
          : a
      )
    );

    // Free up clinic slot
    if (target) {
      setClinics((prev) =>
        prev.map((c) => {
          if (c.id === target.clinicId) {
            const updatedSlots = c.slots.map((s) => {
              if (s.date === target.appointmentDate && s.time === target.appointmentTime) {
                return { ...s, isAvailable: true, bookedBy: undefined };
              }
              return s;
            });
            return { ...c, slots: updatedSlots };
          }
          return c;
        })
      );
    }

    addToast('info', 'Request Cancelled', `Appointment request ${id} was marked as cancelled.`);
  };

  const updateAppointmentStatus = (
    id: string,
    status: 'confirmed' | 'rejected',
    responseNote?: string
  ) => {
    const target = appointments.find((a) => a.id === id);
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              clinicResponseNote:
                responseNote ||
                (status === 'confirmed'
                  ? 'Confirmed by clinic representative. Please arrive 15 minutes before your scheduled appointment.'
                  : 'Slot unavailable due to emergency schedule or provider conflict.'),
            }
          : a
      )
    );

    if (status === 'rejected' && target) {
      // Re-open slot if rejected
      setClinics((prev) =>
        prev.map((c) => {
          if (c.id === target.clinicId) {
            const updatedSlots = c.slots.map((s) => {
              if (s.date === target.appointmentDate && s.time === target.appointmentTime) {
                return { ...s, isAvailable: true, bookedBy: undefined };
              }
              return s;
            });
            return { ...c, slots: updatedSlots };
          }
          return c;
        })
      );
    }

    addToast(
      status === 'confirmed' ? 'success' : 'warning',
      status === 'confirmed' ? 'Appointment Confirmed' : 'Appointment Rejected',
      `Request ${id} updated to ${status}. Patient's record now reflects this change.`
    );
  };

  const approveClinicSubmission = (clinicId: string) => {
    const target = clinics.find((c) => c.id === clinicId);
    setClinics((prev) =>
      prev.map((c) =>
        c.id === clinicId
          ? {
              ...c,
              status: 'approved',
              nextAvailableSlot: 'Tomorrow at 9:00 AM',
            }
          : c
      )
    );
    addToast(
      'success',
      'Clinic Listing Approved',
      `${target?.name || 'Clinic'} is now approved and visible in the public directory.`
    );
  };

  const rejectClinicSubmission = (clinicId: string, reason: string) => {
    const target = clinics.find((c) => c.id === clinicId);
    setClinics((prev) =>
      prev.map((c) =>
        c.id === clinicId
          ? {
              ...c,
              status: 'rejected',
              rejectionReason: reason,
            }
          : c
      )
    );
    addToast(
      'warning',
      'Clinic Listing Rejected',
      `Application for ${target?.name} was rejected: ${reason}`
    );
  };

  const updateClinicProfile = (clinicId: string, updates: Partial<Clinic>) => {
    setClinics((prev) =>
      prev.map((c) => (c.id === clinicId ? { ...c, ...updates } : c))
    );
    addToast('success', 'Profile Updated', 'Clinic information and operating hours have been saved.');
  };

  const addClinicService = (clinicId: string, service: Omit<ClinicService, 'id'>) => {
    const newService: ClinicService = {
      ...service,
      id: `srv-${Date.now().toString(36)}`,
    };
    setClinics((prev) =>
      prev.map((c) =>
        c.id === clinicId
          ? { ...c, services: [...c.services, newService] }
          : c
      )
    );
    addToast('success', 'Service Added', `Added "${service.name}" to listed healthcare services.`);
  };

  const updateClinicService = (clinicId: string, serviceId: string, updates: Partial<ClinicService>) => {
    setClinics((prev) =>
      prev.map((c) => {
        if (c.id === clinicId) {
          const updated = c.services.map((s) => (s.id === serviceId ? { ...s, ...updates } : s));
          return { ...c, services: updated };
        }
        return c;
      })
    );
    addToast('success', 'Service Updated', 'Updated service details and pricing.');
  };

  const deleteClinicService = (clinicId: string, serviceId: string) => {
    setClinics((prev) =>
      prev.map((c) => {
        if (c.id === clinicId) {
          return { ...c, services: c.services.filter((s) => s.id !== serviceId) };
        }
        return c;
      })
    );
    addToast('info', 'Service Removed', 'Removed service from active clinic offerings.');
  };

  const toggleSlotAvailability = (clinicId: string, date: string, time: string) => {
    setClinics((prev) =>
      prev.map((c) => {
        if (c.id === clinicId) {
          const existing = c.slots.find((s) => s.date === date && s.time === time);
          if (existing) {
            const updatedSlots = c.slots.map((s) =>
              s.date === date && s.time === time ? { ...s, isAvailable: !s.isAvailable } : s
            );
            return { ...c, slots: updatedSlots };
          } else {
            return {
              ...c,
              slots: [...c.slots, { date, time, isAvailable: true }],
            };
          }
        }
        return c;
      })
    );
  };

  const addClinicSlot = (clinicId: string, slot: AppointmentSlot) => {
    setClinics((prev) =>
      prev.map((c) =>
        c.id === clinicId
          ? { ...c, slots: [...c.slots, slot] }
          : c
      )
    );
    addToast('success', 'Slot Added', `Added ${slot.time} on ${slot.date} to available appointment schedule.`);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        phoneFrameMode,
        setPhoneFrameMode,
        patientTab,
        setPatientTab,
        selectedClinicId,
        setSelectedClinicId,
        selectedServiceId,
        setSelectedServiceId,
        prefilledConcern,
        setPrefilledConcern,
        appointmentModalOpen,
        setAppointmentModalOpen,
        clinicRepTab,
        setClinicRepTab,
        activeClinicRepClinicId,
        setActiveClinicRepClinicId,
        adminTab,
        setAdminTab,
        clinics,
        appointments,
        users,
        requestAppointment,
        cancelAppointment,
        updateAppointmentStatus,
        approveClinicSubmission,
        rejectClinicSubmission,
        updateClinicProfile,
        addClinicService,
        updateClinicService,
        deleteClinicService,
        toggleSlotAvailability,
        addClinicSlot,
        resetDemoData,
        toasts,
        addToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
