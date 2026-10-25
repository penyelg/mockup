import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Bell, Shield, ArrowLeft } from 'lucide-react';

export const PatientHeader: React.FC = () => {
  const { patientTab, setPatientTab, appointments } = useApp();
  const pendingCount = appointments.filter((a) => a.status === 'pending').length;

  const getScreenTitle = () => {
    switch (patientTab) {
      case 'home':
        return 'IsabelCare';
      case 'ai-nav':
        return 'AI Healthcare Navigation';
      case 'clinics':
        return 'Find Local Clinics';
      case 'clinic-details':
        return 'Clinic Information';
      case 'appointments':
        return 'My Appointments';
      case 'profile':
        return 'Patient Profile & PWA';
      default:
        return 'IsabelCare';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-2.5 min-w-0">
        {patientTab !== 'home' ? (
          <button
            onClick={() => setPatientTab('home')}
            className="p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2457A7] to-[#27A89A] flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0">
            IC
          </div>
        )}

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-bold text-slate-900 truncate">
              {getScreenTitle()}
            </h1>
            <span className="text-[10px] bg-sky-50 text-[#2457A7] font-semibold px-1.5 py-0.2 rounded border border-sky-100 shrink-0">
              Isabel, Leyte
            </span>
          </div>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
            <MapPin className="w-2.5 h-2.5 text-[#27A89A] shrink-0" />
            <span>Healthcare Navigation & Appointments</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => setPatientTab('appointments')}
          className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          title="View Appointments"
        >
          <Bell className="w-4 h-4" />
          {pendingCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
          )}
        </button>

        <button
          onClick={() => setPatientTab('profile')}
          className="w-7 h-7 rounded-full bg-[#2457A7]/10 text-[#2457A7] font-semibold text-xs flex items-center justify-center border border-[#2457A7]/20"
          title="Patient Profile"
        >
          MC
        </button>
      </div>
    </header>
  );
};
