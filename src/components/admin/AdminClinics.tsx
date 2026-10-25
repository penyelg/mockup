import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ISABEL_BARANGAYS } from '../../data/mockData';
import {
  Building2,
  Search,
  Filter,
  MapPin,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
} from 'lucide-react';

export const AdminClinics: React.FC = () => {
  const { clinics, setCurrentRole, setSelectedClinicId, setPatientTab } = useApp();

  const [search, setSearch] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('All Isabel, Leyte');

  const filtered = clinics.filter((c) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchLicense = c.licenseNo.toLowerCase().includes(q);
      const matchBarangay = c.barangay.toLowerCase().includes(q);
      if (!matchName && !matchLicense && !matchBarangay) return false;
    }
    if (selectedBarangay !== 'All Isabel, Leyte' && c.barangay !== selectedBarangay) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Municipal Clinic Directory Management
        </h2>
        <p className="text-xs text-slate-500">
          All healthcare facilities recorded in the municipality of Isabel, Leyte.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clinic name or license..."
            className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7]"
          />
        </div>

        <div className="w-full sm:w-64">
          <select
            value={selectedBarangay}
            onChange={(e) => setSelectedBarangay(e.target.value)}
            className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
          >
            {ISABEL_BARANGAYS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clinics Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[11px] uppercase tracking-wider font-semibold text-slate-500 border-b border-slate-200">
                <th className="py-3 px-4">Clinic Facility</th>
                <th className="py-3 px-4">Location (Isabel)</th>
                <th className="py-3 px-4">Services Count</th>
                <th className="py-3 px-4">Starting Price</th>
                <th className="py-3 px-4">Directory Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((clinic) => (
                <tr key={clinic.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#2457A7]/10 text-[#2457A7] flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div>{clinic.name}</div>
                        <span className="text-[11px] font-mono text-slate-400 block font-normal">
                          {clinic.licenseNo}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    <div>Brgy. {clinic.barangay}</div>
                    <span className="text-[11px] text-slate-400 block truncate max-w-xs">
                      {clinic.address}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-700 font-mono">
                    {clinic.services.length} services
                  </td>

                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                    {clinic.startingPrice !== null
                      ? clinic.startingPrice === 0
                        ? 'Free'
                        : `₱${clinic.startingPrice.toLocaleString()}`
                      : 'Unlisted'}
                  </td>

                  <td className="py-3.5 px-4">
                    {clinic.status === 'approved' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Live on Directory</span>
                      </span>
                    )}
                    {clinic.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>Pending Approval</span>
                      </span>
                    )}
                    {clinic.status === 'rejected' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                        <XCircle className="w-3 h-3 text-rose-600" />
                        <span>Rejected</span>
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedClinicId(clinic.id);
                        setCurrentRole('patient');
                        setPatientTab('clinic-details');
                      }}
                      className="text-xs text-[#2457A7] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Patient View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
