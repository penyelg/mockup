import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, User, Shield, Building2, Search, CheckCircle2 } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const { users } = useApp();
  const [roleFilter, setRoleFilter] = useState<'all' | 'patient' | 'clinic_rep' | 'admin'>('all');
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Registered Accounts Management
        </h2>
        <p className="text-xs text-slate-500">
          Fictional user records for patients, clinic representatives, and municipal health staff.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Users' },
            { id: 'patient', label: 'Patients' },
            { id: 'clinic_rep', label: 'Clinic Representatives' },
            { id: 'admin', label: 'Administrators' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id as any)}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                roleFilter === tab.id
                  ? 'bg-[#2457A7] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7]"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[11px] uppercase tracking-wider font-semibold text-slate-500 border-b border-slate-200">
                <th className="py-3 px-4">User Name</th>
                <th className="py-3 px-4">System Role</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Residence (Isabel)</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div>{user.name}</div>
                        <span className="text-[11px] text-slate-400 block font-normal font-mono">
                          {user.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    {user.role === 'patient' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        <User className="w-3 h-3" />
                        <span>Patient</span>
                      </span>
                    )}
                    {user.role === 'clinic_rep' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                        <Building2 className="w-3 h-3" />
                        <span>Clinic Representative</span>
                      </span>
                    )}
                    {user.role === 'admin' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                        <Shield className="w-3 h-3" />
                        <span>Administrator</span>
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-slate-600">
                    <div>{user.phone}</div>
                    <span className="text-[11px] text-slate-400 block">{user.email}</span>
                  </td>

                  <td className="py-3 px-4 text-slate-700 font-medium">
                    Brgy. {user.barangay}, Isabel
                  </td>

                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{user.status}</span>
                    </span>
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
