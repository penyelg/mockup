import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Building2,
  Stethoscope,
  Clock,
  Inbox,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

interface ClinicNavItem {
  id: 'overview' | 'profile' | 'services' | 'availability' | 'requests';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const ClinicSidebar: React.FC = () => {
  const {
    clinicRepTab,
    setClinicRepTab,
    activeClinicRepClinicId,
    setActiveClinicRepClinicId,
    clinics,
    appointments,
    setCurrentRole,
    setPatientTab,
    setSelectedClinicId,
  } = useApp();

  const activeClinic = clinics.find((c) => c.id === activeClinicRepClinicId) || clinics[1];
  const pendingRequestsCount = appointments.filter(
    (a) => a.clinicId === activeClinic.id && a.status === 'pending'
  ).length;

  const approvedClinics = clinics.filter((c) => c.status === 'approved');

  const navItems: ClinicNavItem[] = [
    { id: 'overview', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Appointment Requests', icon: Inbox, badge: pendingRequestsCount },
    { id: 'services', label: 'Services & Prices', icon: Stethoscope },
    { id: 'availability', label: 'Availability & Slots', icon: Clock },
    { id: 'profile', label: 'Clinic Information', icon: Building2 },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-white shrink-0 flex flex-col justify-between border-r border-slate-800">
      <div>
        {/* Brand & Clinic Switcher */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-[#27A89A] flex items-center justify-center font-bold text-white text-xs">
              CP
            </div>
            <div>
              <h2 className="text-xs font-bold text-white tracking-tight">
                Clinic Representative Portal
              </h2>
              <span className="text-[10px] text-slate-400">Isabel, Leyte</span>
            </div>
          </div>

          {/* Clinic Switcher Select */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              Managing Clinic:
            </label>
            <select
              value={activeClinicRepClinicId}
              onChange={(e) => setActiveClinicRepClinicId(e.target.value)}
              className="w-full text-xs p-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-[#27A89A]"
            >
              {approvedClinics.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = clinicRepTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setClinicRepTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#2457A7] text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-slate-300" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Patient Preview Shortcut */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 text-[11px] text-slate-300 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Listing Status: Approved</span>
          </div>
          <p className="text-[10px] text-slate-400">
            DOH Licensed in Isabel, Leyte
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedClinicId(activeClinic.id);
            setCurrentRole('patient');
            setPatientTab('clinic-details');
          }}
          className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#27A89A]" />
          <span>View Patient Profile</span>
        </button>
      </div>
    </aside>
  );
};
