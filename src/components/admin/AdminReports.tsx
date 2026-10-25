import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  PieChart,
  FileSpreadsheet,
} from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { clinics, appointments } = useApp();

  const total = appointments.length;
  const confirmed = appointments.filter((a) => a.status === 'confirmed').length;
  const pending = appointments.filter((a) => a.status === 'pending').length;
  const cancelled = appointments.filter((a) => a.status === 'cancelled' || a.status === 'rejected').length;

  const confirmationRate = total > 0 ? Math.round((confirmed / total) * 100) : 0;

  // Demand category breakdown simulation
  const specialtyBreakdown = [
    { name: 'Dental Care (Extractions, Fillings, Cleaning)', percentage: 35, inquiries: '42 inquiries' },
    { name: 'Maternal & Prenatal Healthcare', percentage: 26, inquiries: '31 inquiries' },
    { name: 'General Outpatient & Family Practice', percentage: 21, inquiries: '25 inquiries' },
    { name: 'Clinical Diagnostics & Ultrasound', percentage: 18, inquiries: '22 inquiries' },
  ];

  // Barangay distribution
  const barangayBreakdown = [
    { name: 'Poblacion (Town Proper)', count: 52, percentage: 44 },
    { name: 'Matlang', count: 26, percentage: 22 },
    { name: 'Bilwang', count: 19, percentage: 16 },
    { name: 'Libertad & Marvel', count: 14, percentage: 12 },
    { name: 'Other Barangays', count: 7, percentage: 6 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Municipal Healthcare Analytics & Activity Report
        </h2>
        <p className="text-xs text-slate-500">
          Aggregated navigation trends, appointment conversion, and barangay access metrics for Isabel, Leyte.
        </p>
      </div>

      {/* KPI Overview Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block mb-1">Confirmation Rate</span>
          <div className="text-2xl font-bold text-emerald-800 font-mono">
            {confirmationRate}%
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Provider approval efficiency</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block mb-1">Confirmed Visits</span>
          <div className="text-2xl font-bold text-slate-900 font-mono">
            {confirmed}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Patients served in Isabel</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block mb-1">Pending Inquiries</span>
          <div className="text-2xl font-bold text-amber-800 font-mono">
            {pending}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">In provider queue</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 block mb-1">Approved Clinics</span>
          <div className="text-2xl font-bold text-[#2457A7] font-mono">
            {clinics.filter((c) => c.status === 'approved').length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Serving Isabel community</p>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Healthcare Service Demand in Isabel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Healthcare Specialty Demand in Isabel
            </h3>
            <span className="text-[11px] text-slate-400">By AI Search Matches</span>
          </div>

          <div className="space-y-3">
            {specialtyBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.name}</span>
                  <span className="font-mono text-slate-600">{item.percentage}% ({item.inquiries})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2457A7] to-[#27A89A] rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 leading-relaxed">
            * Data derived from patient conversational navigation requests submitted across Isabel, Leyte barangays.
          </p>
        </div>

        {/* Geographic Distribution Across Isabel Barangays */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Barangay Patient Distribution
            </h3>
            <span className="text-[11px] text-slate-400">By Patient Residence</span>
          </div>

          <div className="space-y-3">
            {barangayBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.name}</span>
                  <span className="font-mono text-slate-600">{item.percentage}% ({item.count} users)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-slate-700 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 leading-relaxed">
            * Poblacion demonstrates highest early adoption, followed by industrial and residential areas along Matlang and Bilwang corridors.
          </p>
        </div>
      </div>

      {/* Capstone Proposal Methodology Box */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md space-y-3 text-xs">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>Capstone Research Context & System Significance</span>
        </h3>
        <p className="text-slate-300 leading-relaxed">
          In rural and semi-urban municipalities like Isabel, Leyte, patients often travel to physical clinic locations without knowing beforehand if the required physician is on duty, what services are offered, or what initial fees are expected.
        </p>
        <p className="text-slate-300 leading-relaxed">
          This prototype addresses these challenges by offering: (1) an AI-assisted healthcare navigation interface for plain-language symptom-to-service routing, (2) transparent clinic listings with operating hours and pricing, and (3) a closed-loop appointment request workflow connecting patients, clinic representatives, and local health administrators.
        </p>
      </div>
    </div>
  );
};
