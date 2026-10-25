import React from 'react';
import { useApp } from '../../context/AppContext';
import { PatientHeader } from './PatientHeader';
import { PatientBottomNav } from './PatientBottomNav';
import { PatientHome } from './PatientHome';
import { PatientAiNav } from './PatientAiNav';
import { PatientClinics } from './PatientClinics';
import { PatientClinicDetails } from './PatientClinicDetails';
import { PatientAppointments } from './PatientAppointments';
import { PatientProfile } from './PatientProfile';
import { AppointmentRequestModal } from './AppointmentRequestModal';
import { Wifi, Battery, Signal, Sparkles } from 'lucide-react';

export const PatientAppContainer: React.FC = () => {
  const { patientTab, phoneFrameMode } = useApp();

  const renderActiveScreen = () => {
    switch (patientTab) {
      case 'home':
        return <PatientHome />;
      case 'ai-nav':
        return <PatientAiNav />;
      case 'clinics':
        return <PatientClinics />;
      case 'clinic-details':
        return <PatientClinicDetails />;
      case 'appointments':
        return <PatientAppointments />;
      case 'profile':
        return <PatientProfile />;
      default:
        return <PatientHome />;
    }
  };

  // If Phone Frame Mode is selected
  if (phoneFrameMode) {
    return (
      <div className="min-h-[calc(100vh-45px)] bg-slate-900/95 py-6 px-3 flex flex-col items-center justify-center">
        {/* Phone Frame Device Container */}
        <div className="w-full max-w-[410px] h-[840px] max-h-[92vh] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-[5px] border-slate-700/80 relative flex flex-col overflow-hidden ring-1 ring-white/10">
          {/* Top Notch / Speaker & Status Bar */}
          <div className="w-full bg-white text-slate-900 rounded-t-[38px] px-6 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-semibold shrink-0 select-none z-20">
            <span>9:41</span>
            {/* Dynamic Island / Notch */}
            <div className="w-24 h-4 bg-black rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-slate-700">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Screen Content Wrapper */}
          <div className="w-full flex-1 bg-slate-50 flex flex-col overflow-hidden relative">
            <PatientHeader />
            <main className="flex-1 overflow-y-auto px-4 pt-3 pb-4">
              {renderActiveScreen()}
            </main>
            <PatientBottomNav />
          </div>

          {/* Home Indicator Bar */}
          <div className="w-full bg-white pb-2 pt-1 rounded-b-[38px] flex justify-center shrink-0 z-20">
            <div className="w-28 h-1 bg-slate-400 rounded-full" />
          </div>
        </div>

        <AppointmentRequestModal />
      </div>
    );
  }

  // Fluid Responsive Layout (Standard Web PWA responsive viewport)
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col bg-white shadow-xs border-x border-slate-200 min-h-screen relative">
        <PatientHeader />

        <main className="flex-1 px-4 sm:px-6 pt-4 pb-6">
          {renderActiveScreen()}
        </main>

        <PatientBottomNav />
      </div>

      <AppointmentRequestModal />
    </div>
  );
};
