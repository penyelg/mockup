import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  Building2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Trash2,
  ChevronRight,
  Info,
} from 'lucide-react';
import { AppointmentStatus, AppointmentRequest } from '../../types';

export const PatientAppointments: React.FC = () => {
  const {
    appointments,
    cancelAppointment,
    setSelectedClinicId,
    setPatientTab,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRequest | null>(null);

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === 'pending') return apt.status === 'pending';
    if (activeTab === 'confirmed') return apt.status === 'confirmed';
    if (activeTab === 'cancelled') return apt.status === 'cancelled' || apt.status === 'rejected';
    return true; // 'all'
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Pending Clinic Confirmation</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Confirmed</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>Clinic Declined</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
            <XCircle className="w-3 h-3 text-slate-500" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  const [cancellingApt, setCancellingApt] = useState<AppointmentRequest | null>(null);

  const handleConfirmCancel = () => {
    if (cancellingApt) {
      cancelAppointment(cancellingApt.id, 'Cancelled by patient via portal.');
      setCancellingApt(null);
    }
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          My Appointments & Bookings
        </h2>
        <p className="text-xs text-slate-500">
          Track the status of your requested visits at clinics in Isabel, Leyte.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
        {[
          { id: 'all', label: 'All', count: appointments.length },
          { id: 'pending', label: 'Pending', count: appointments.filter((a) => a.status === 'pending').length },
          { id: 'confirmed', label: 'Confirmed', count: appointments.filter((a) => a.status === 'confirmed').length },
          { id: 'cancelled', label: 'Declined/Cancelled', count: appointments.filter((a) => a.status === 'cancelled' || a.status === 'rejected').length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === tab.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Appointment Cards List */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-2">
          <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-800">No appointments found</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            You don't have any appointments in the "{activeTab}" category.
          </p>
          <button
            onClick={() => setPatientTab('clinics')}
            className="mt-2 text-xs font-semibold text-[#2457A7] hover:underline"
          >
            Browse Clinics & Book Now
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3 hover:border-slate-300 transition-colors"
            >
              {/* Top row: Status and Reference code */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>{getStatusBadge(apt.status)}</div>
                <span className="text-[11px] font-mono font-medium text-slate-400">
                  {apt.id}
                </span>
              </div>

              {/* Clinic and Service */}
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {apt.serviceName}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-[#2457A7] shrink-0" />
                  <span className="font-semibold text-slate-800">{apt.clinicName}</span>
                </div>
              </div>

              {/* Scheduled Date, Time, Fee */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium">{apt.appointmentDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium">{apt.appointmentTime}</span>
                </div>
                <div className="col-span-2 text-[11px] text-slate-500 pt-1 border-t border-slate-200/50 flex justify-between">
                  <span>Listed Fee:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {apt.estimatedPrice !== null
                      ? apt.estimatedPrice === 0
                        ? 'Free / Subsidized'
                        : `₱${apt.estimatedPrice.toLocaleString()}`
                      : 'Price not listed'}
                  </span>
                </div>
              </div>

              {/* Patient Note */}
              {apt.note && (
                <div className="text-[11px] text-slate-600">
                  <span className="font-medium text-slate-700">Patient Note: </span>
                  <span className="italic">{apt.note}</span>
                </div>
              )}

              {/* Clinic Representative Response Note */}
              {apt.clinicResponseNote && (
                <div className="bg-blue-50/70 p-2.5 rounded-lg border border-blue-100 text-[11px] text-blue-900 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#2457A7] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Clinic Message: </span>
                    <span>{apt.clinicResponseNote}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedClinicId(apt.clinicId);
                    setPatientTab('clinic-details');
                  }}
                  className="flex-1 py-1.5 px-3 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold text-center transition-colors"
                >
                  View Clinic
                </button>

                {apt.status === 'pending' && (
                  <button
                    onClick={() => setCancellingApt(apt)}
                    className="py-1.5 px-3 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Cancel Request</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancellingApt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-5 space-y-3 animate-in fade-in-50 zoom-in-95">
            <h4 className="text-sm font-bold text-slate-900">
              Cancel Appointment Request?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to cancel your request for <strong>{cancellingApt.serviceName}</strong> at <strong>{cancellingApt.clinicName}</strong> on {cancellingApt.appointmentDate}?
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCancellingApt(null)}
                className="py-1.5 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Keep Request
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="py-1.5 px-3.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
              >
                Yes, Cancel Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
