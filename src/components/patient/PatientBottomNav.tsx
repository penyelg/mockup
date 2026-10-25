import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Sparkles, Building2, Calendar, User } from 'lucide-react';

interface PatientNavItem {
  id: 'home' | 'ai-nav' | 'clinics' | 'appointments' | 'profile';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const PatientBottomNav: React.FC = () => {
  const { patientTab, setPatientTab, appointments } = useApp();
  const pendingCount = appointments.filter((a) => a.status === 'pending').length;

  const navItems: PatientNavItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ai-nav', label: 'AI Navigate', icon: Sparkles },
    { id: 'clinics', label: 'Clinics', icon: Building2 },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: pendingCount },
    { id: 'profile', label: 'Profile & PWA', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            patientTab === item.id ||
            (item.id === 'clinics' && patientTab === 'clinic-details');

          return (
            <button
              key={item.id}
              onClick={() => setPatientTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-lg transition-colors relative ${
                isActive
                  ? 'text-[#2457A7] font-semibold'
                  : 'text-slate-500 hover:text-slate-800 font-normal'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-[#2457A7]' : 'text-slate-500'
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-[14px] rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 truncate">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#2457A7]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
