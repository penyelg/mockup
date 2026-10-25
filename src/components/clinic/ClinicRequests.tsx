import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Inbox,
  Check,
  X,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Search,
  Filter,
  User,
  Phone,
  Calendar,
} from 'lucide-react';
import { AppointmentRequest } from '../../types';

export const ClinicRequests: React.FC = () => {
  const {
    activeClinicRepClinicId,
    clinics,
    appointments,
    updateAppointmentStatus,
  } = useApp();

  const clinic = clinics.find((c) => c.id === activeClinicRepClinicId) || clinics[0];

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Response Note Modal
  const [actionTarget, setActionTarget] = useState<{
    apt: AppointmentRequest;
    action: 'confirmed' | 'rejected';
  } | null>(null);
  const [customNote, setCustomNote] = useState('');

  const clinicAppointments = appointments.filter((a) => a.clinicId === clinic.id);

  const filtered = clinicAppointments.filter((apt) => {
    if (statusFilter !== 'all' && apt.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = apt.patientName.toLowerCase().includes(q);
      const matchPhone = apt.patientPhone.includes(q);
      const matchService = apt.serviceName.toLowerCase().includes(q);
      const matchId = apt.id.toLowerCase().includes(q);
      return matchName || matchPhone || matchService || matchId;
    }
    return true;
  });

  const handleOpenActionModal = (apt: AppointmentRequest, action: 'confirmed' | 'rejected') => {
    setActionTarget({ apt, action });
    if (action === 'confirmed') {
      setCustomNote('Confirmed. Please arrive 15 minutes before your schedule and bring valid government ID.');
    } else {
      setCustomNote('Clinic schedule conflict or doctor is on emergency on-call rotation.');
    }
  };

  const handleConfirmAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionTarget) return;
    updateAppointmentStatus(actionTarget.apt.id, actionTarget.action, customNote);
    setActionTarget(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Appointment Requests
          </h2>
          <p className="text-xs text-slate-500">
            Review, confirm, or decline booking submissions for {clinic.name}.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'pending', 'confirmed', 'rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold capitalize transition-all shrink-0 ${
                statusFilter === st
                  ? 'bg-[#2457A7] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'rejected' ? 'Declined' : st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient or reference..."
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7]"
          />
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-400">
            No appointment requests match your current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] uppercase tracking-wider font-semibold text-slate-500 border-b border-slate-200">
                  <th className="py-3 px-4">Reference & Patient</th>
                  <th className="py-3 px-4">Requested Service</th>
                  <th className="py-3 px-4">Schedule</th>
                  <th className="py-3 px-4">Patient Note</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <span className="font-mono text-[11px] text-slate-500 block">
                        {apt.id}
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{apt.patientName}</span>
                      </div>
                      <span className="text-[11px] font-normal text-slate-500 block ml-5">
                        {apt.patientPhone} · Brgy. {apt.patientBarangay}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{apt.serviceName}</div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {apt.estimatedPrice !== null
                          ? apt.estimatedPrice === 0
                            ? 'Free'
                            : `₱${apt.estimatedPrice.toLocaleString()}`
                          : 'Price unlisted'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      <div>{apt.appointmentDate}</div>
                      <div className="text-slate-500 text-[11px]">{apt.appointmentTime}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                      {apt.note ? (
                        <span className="italic">"{apt.note}"</span>
                      ) : (
                        <span className="text-slate-400">None provided</span>
                      )}
                      {apt.clinicResponseNote && (
                        <div className="mt-1 text-[11px] text-[#2457A7] bg-blue-50 p-1 rounded">
                          Reply: {apt.clinicResponseNote}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {apt.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pending</span>
                        </span>
                      )}
                      {apt.status === 'confirmed' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Confirmed</span>
                        </span>
                      )}
                      {apt.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3 text-rose-600" />
                          <span>Declined</span>
                        </span>
                      )}
                      {apt.status === 'cancelled' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3 text-slate-500" />
                          <span>Cancelled</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {apt.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenActionModal(apt, 'confirmed')}
                            className="py-1 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1 shadow-xs transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Confirm</span>
                          </button>
                          <button
                            onClick={() => handleOpenActionModal(apt, 'rejected')}
                            className="py-1 px-2.5 rounded-lg border border-slate-300 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Decline</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">
                          Action completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation / Decline Response Note Modal */}
      {actionTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-5 space-y-4 animate-in fade-in-50 zoom-in-95">
            <h3 className="text-sm font-bold text-slate-900">
              {actionTarget.action === 'confirmed' ? 'Confirm Appointment Request' : 'Decline Appointment Request'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Patient: <strong>{actionTarget.apt.patientName}</strong> · Service: <strong>{actionTarget.apt.serviceName}</strong> ({actionTarget.apt.appointmentDate} at {actionTarget.apt.appointmentTime})
            </p>

            <form onSubmit={handleConfirmAction} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message / Instruction to Patient:
                </label>
                <textarea
                  rows={3}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Please bring PhilHealth ID, arrive 15 minutes before schedule..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7] resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActionTarget(null)}
                  className="py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`py-2 px-4 rounded-lg text-white text-xs font-semibold shadow-xs ${
                    actionTarget.action === 'confirmed'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  {actionTarget.action === 'confirmed' ? 'Confirm Request' : 'Decline Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
