import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Users,
  BarChart3,
  CheckCircle2,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface NavItem {
  id: 'overview' | 'approvals' | 'clinics' | 'users' | 'reports';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const AdminSidebar: React.FC = () => {
  const { adminTab, setAdminTab, clinics, setCurrentRole } = useApp();

  const pendingApprovalsCount = clinics.filter((c) => c.status === 'pending').length;

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'approvals', label: 'Clinic Submissions', icon: ShieldCheck, badge: pendingApprovalsCount },
    { id: 'clinics', label: 'Clinic Directory', icon: Building2 },
    { id: 'users', label: 'User Accounts', icon: Users },
    { id: 'reports', label: 'Municipal Health Reports', icon: BarChart3 },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-white shrink-0 flex flex-col justify-between border-r border-slate-800">
      <div>
        {/* Brand */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2457A7] to-[#27A89A] flex items-center justify-center font-bold text-white text-xs shadow-xs">
              ADM
            </div>
            <div>
              <h2 className="text-xs font-bold text-white tracking-tight">
                Isabel Health Office
              </h2>
              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-[#27A89A]" />
                LGU Isabel, Leyte
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = adminTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id)}
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

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 text-[11px] text-slate-300 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            System Administrator
          </span>
          <p className="font-semibold text-white">Engr. Mark Anthony Dizon</p>
          <p className="text-[10px] text-slate-400">Municipal IT & Health Officer</p>
        </div>

        <button
          onClick={() => setCurrentRole('patient')}
          className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#27A89A]" />
          <span>Switch to Patient View</span>
        </button>
      </div>
    </aside>
  );
};
