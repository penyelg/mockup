import React from 'react';
import { useApp } from '../../context/AppContext';
import { ClinicSidebar } from './ClinicSidebar';
import { ClinicOverview } from './ClinicOverview';
import { ClinicProfile } from './ClinicProfile';
import { ClinicServices } from './ClinicServices';
import { ClinicAvailability } from './ClinicAvailability';
import { ClinicRequests } from './ClinicRequests';
import { Building2, Bell, User, MapPin } from 'lucide-react';

export const ClinicDashboardContainer: React.FC = () => {
  const { clinicRepTab, activeClinicRepClinicId, clinics } = useApp();
  const clinic = clinics.find((c) => c.id === activeClinicRepClinicId) || clinics[0];

  const renderScreen = () => {
    switch (clinicRepTab) {
      case 'overview':
        return <ClinicOverview />;
      case 'profile':
        return <ClinicProfile />;
      case 'services':
        return <ClinicServices />;
      case 'availability':
        return <ClinicAvailability />;
      case 'requests':
        return <ClinicRequests />;
      default:
        return <ClinicOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <ClinicSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2457A7]/10 text-[#2457A7] flex items-center justify-center font-bold text-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight">
                {clinic.name}
              </h1>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#27A89A]" />
                <span>Brgy. {clinic.barangay}, Isabel, Leyte</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-semibold text-slate-900 block leading-tight">
                Representative Portal
              </span>
              <span className="text-[10px] text-slate-500">
                Staff Access · Isabel, Leyte
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#27A89A]/15 text-[#27A89A] flex items-center justify-center font-bold text-xs border border-[#27A89A]/30">
              REP
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
