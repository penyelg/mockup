import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminOverview } from './AdminOverview';
import { AdminApprovals } from './AdminApprovals';
import { AdminClinics } from './AdminClinics';
import { AdminUsers } from './AdminUsers';
import { AdminReports } from './AdminReports';
import { ShieldCheck, MapPin } from 'lucide-react';

export const AdminDashboardContainer: React.FC = () => {
  const { adminTab } = useApp();

  const renderScreen = () => {
    switch (adminTab) {
      case 'overview':
        return <AdminOverview />;
      case 'approvals':
        return <AdminApprovals />;
      case 'clinics':
        return <AdminClinics />;
      case 'users':
        return <AdminUsers />;
      case 'reports':
        return <AdminReports />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2457A7]/10 text-[#2457A7] flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight">
                System Administrator Console
              </h1>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#27A89A]" />
                <span>Municipal Health Supervision · Isabel, Leyte, Philippines</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-semibold text-slate-900 block leading-tight">
                Engr. Mark Anthony Dizon
              </span>
              <span className="text-[10px] text-slate-500">
                LGU Health Office Administrator
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
};
