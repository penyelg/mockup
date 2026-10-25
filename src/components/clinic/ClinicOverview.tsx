import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Inbox,
  Clock,
  CheckCircle2,
  Stethoscope,
  AlertCircle,
  Calendar,
  Check,
  X,
  ArrowRight,
  User,
  Phone,
} from 'lucide-react';

export const ClinicOverview: React.FC = () => {
  const {
    activeClinicRepClinicId,
    clinics,
    appointments,
    updateAppointmentStatus,
    setClinicRepTab,
  } = useApp();

  const clinic = clinics.find((c) => c.id === activeClinicRepClinicId) || clinics[0];

  const clinicAppointments = appointments.filter((a) => a.clinicId === clinic.id);
  const pendingRequests = clinicAppointments.filter((a) => a.status === 'pending');
  const confirmedAppointments = clinicAppointments.filter((a) => a.status === 'confirmed');

  return (
    <div className="space-y-6">
      {/* Clinic Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Listing Status: {clinic.status.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {clinic.licenseNo}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {clinic.name}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {clinic.address} · Operating: {clinic.hours}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setClinicRepTab('profile')}
            className="py-2 px-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            Edit Clinic Info
          </button>
          <button
            onClick={() => setClinicRepTab('requests')}
            className="py-2 px-3.5 rounded-xl bg-[#2457A7] hover:bg-[#1c4585] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Review Requests ({pendingRequests.length})
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Total Requests</span>
            <Inbox className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {clinicAppointments.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Recorded via IsabelCare</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between text-amber-800 mb-2">
            <span className="text-xs font-semibold">Pending Requests</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-800 font-mono tabular-nums">
            {pendingRequests.length}
          </div>
          <p className="text-[11px] text-amber-700 mt-1">Awaiting confirmation</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-xs font-semibold">Confirmed Visits</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-800 font-mono tabular-nums">
            {confirmedAppointments.length}
          </div>
          <p className="text-[11px] text-emerald-700 mt-1">Scheduled on calendar</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Active Services</span>
            <Stethoscope className="w-4 h-4 text-[#2457A7]" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {clinic.services.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">With published prices</p>
        </div>
      </div>

      {/* Main Content Split: Recent Requests & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointment Requests (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Incoming Appointment Requests
              </h3>
              <p className="text-xs text-slate-500">
                Action pending submissions to inform patients immediately
              </p>
            </div>
            <button
              onClick={() => setClinicRepTab('requests')}
              className="text-xs text-[#2457A7] font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {clinicAppointments.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No appointment requests recorded for this clinic yet.
            </div>
          ) : (
            <div className="space-y-3">
              {clinicAppointments.slice(0, 4).map((apt) => (
                <div
                  key={apt.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {apt.patientName}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        ({apt.patientPhone})
                      </span>
                      {apt.status === 'pending' && (
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-amber-100 text-amber-800">
                          Pending
                        </span>
                      )}
                      {apt.status === 'confirmed' && (
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                          Confirmed
                        </span>
                      )}
                      {apt.status === 'rejected' && (
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-rose-100 text-rose-800">
                          Declined
                        </span>
                      )}
                      {apt.status === 'cancelled' && (
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-200 text-slate-700">
                          Cancelled
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 font-medium">
                      {apt.serviceName}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span>Schedule: {apt.appointmentDate} at {apt.appointmentTime}</span>
                      <span>·</span>
                      <span className="font-mono">{apt.id}</span>
                    </div>

                    {apt.note && (
                      <p className="text-[11px] text-slate-500 italic">
                        "{apt.note}"
                      </p>
                    )}
                  </div>

                  {/* Actions for Pending */}
                  {apt.status === 'pending' && (
                    <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                      <button
                        onClick={() =>
                          updateAppointmentStatus(
                            apt.id,
                            'confirmed',
                            'Confirmed by clinic representative. Please arrive 15 minutes early.'
                          )
                        }
                        className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Confirm</span>
                      </button>

                      <button
                        onClick={() =>
                          updateAppointmentStatus(
                            apt.id,
                            'rejected',
                            'Slot unavailable or provider emergency conflict.'
                          )
                        }
                        className="py-1.5 px-3 rounded-lg border border-slate-300 hover:bg-rose-50 hover:text-rose-700 text-slate-600 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Today's Schedule & Quick Actions (1 Col) */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Today's Bookings
              </h3>
              <Calendar className="w-4 h-4 text-[#2457A7]" />
            </div>

            <div className="space-y-2">
              {confirmedAppointments.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-2">
                  No confirmed visits scheduled for today yet.
                </p>
              ) : (
                confirmedAppointments.slice(0, 3).map((apt) => (
                  <div
                    key={apt.id}
                    className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 text-xs space-y-1"
                  >
                    <div className="flex justify-between font-semibold text-slate-900">
                      <span>{apt.patientName}</span>
                      <span className="text-[#2457A7]">{apt.appointmentTime}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      {apt.serviceName}
                    </p>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setClinicRepTab('availability')}
              className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold text-center transition-colors"
            >
              Manage Time Slots
            </button>
          </div>

          {/* Quick Management Links */}
          <div className="bg-blue-50/70 rounded-2xl border border-blue-100 p-4 space-y-2.5 text-xs text-slate-700">
            <h4 className="font-bold text-[#2457A7]">
              Clinic Management Shortcuts
            </h4>
            <div className="space-y-1.5">
              <button
                onClick={() => setClinicRepTab('services')}
                className="w-full text-left py-1.5 px-2 rounded-lg bg-white/80 hover:bg-white text-slate-800 text-xs font-medium border border-blue-100 flex items-center justify-between"
              >
                <span>Add / Edit Healthcare Services & Prices</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => setClinicRepTab('profile')}
                className="w-full text-left py-1.5 px-2 rounded-lg bg-white/80 hover:bg-white text-slate-800 text-xs font-medium border border-blue-100 flex items-center justify-between"
              >
                <span>Update Contact Phone & Operating Hours</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
