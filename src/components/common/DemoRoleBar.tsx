import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  Maximize2,
  Building2,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  User,
  MapPin,
} from 'lucide-react';
import { UserRole } from '../../types';

export const DemoRoleBar: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    phoneFrameMode,
    setPhoneFrameMode,
    resetDemoData,
    clinics,
    appointments,
  } = useApp();

  const pendingAppointmentsCount = appointments.filter((a) => a.status === 'pending').length;
  const pendingClinicsCount = clinics.filter((c) => c.status === 'pending').length;

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white text-xs border-b border-slate-800 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-3 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* System Title & Project Context */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#27A89A] flex items-center justify-center font-bold text-white text-xs">
            IC
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-white tracking-tight flex items-center gap-1.5">
              <span>IsabelCare Prototype</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-normal">
                IT Capstone Demo
              </span>
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-[#27A89A]" />
              Isabel, Leyte, Philippines
            </span>
          </div>
        </div>

        {/* Demo Role Switcher Tabs */}
        <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => setCurrentRole('patient')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              currentRole === 'patient'
                ? 'bg-[#2457A7] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Patient (Mobile PWA)</span>
          </button>

          <button
            onClick={() => setCurrentRole('clinic_rep')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all relative ${
              currentRole === 'clinic_rep'
                ? 'bg-[#2457A7] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Clinic Representative</span>
            {pendingAppointmentsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                {pendingAppointmentsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentRole('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all relative ${
              currentRole === 'admin'
                ? 'bg-[#2457A7] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator</span>
            {pendingClinicsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                {pendingClinicsCount}
              </span>
            )}
          </button>
        </div>

        {/* Viewport & Demo Controls */}
        <div className="flex items-center gap-2">
          {currentRole === 'patient' && (
            <div className="flex items-center bg-slate-800 p-0.5 rounded-md border border-slate-700">
              <button
                onClick={() => setPhoneFrameMode(true)}
                title="Phone Frame Mockup"
                className={`p-1.5 rounded flex items-center gap-1 ${
                  phoneFrameMode ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Phone Frame</span>
              </button>
              <button
                onClick={() => setPhoneFrameMode(false)}
                title="Fluid Responsive View"
                className={`p-1.5 rounded flex items-center gap-1 ${
                  !phoneFrameMode ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Fluid View</span>
              </button>
            </div>
          )}

          <button
            onClick={resetDemoData}
            title="Reset sample clinics, requests and demo state"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span className="text-[11px]">Reset Data</span>
          </button>
        </div>
      </div>
    </header>
  );
};
