import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  ShieldAlert,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  MapPin,
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const { clinics, appointments, users, setAdminTab } = useApp();

  const totalClinics = clinics.length;
  const approvedClinics = clinics.filter((c) => c.status === 'approved').length;
  const pendingClinics = clinics.filter((c) => c.status === 'pending');
  const totalAppointments = appointments.length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            Municipal Oversight
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
            Isabel Healthcare System Administration
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            LGU health navigation supervision, clinic verification, and appointment traffic for Isabel, Leyte.
          </p>
        </div>

        {pendingClinics.length > 0 && (
          <button
            onClick={() => setAdminTab('approvals')}
            className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Clock className="w-4 h-4" />
            <span>Review {pendingClinics.length} Pending Submission</span>
          </button>
        )}
      </div>

      {/* 4 Admin Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Clinic Directory</span>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {approvedClinics} <span className="text-xs font-normal text-slate-400">/ {totalClinics}</span>
          </div>
          <p className="text-[11px] text-emerald-700 mt-1">{approvedClinics} active in Isabel</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between text-amber-800 mb-2">
            <span className="text-xs font-semibold">Pending Verifications</span>
            <ShieldAlert className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-800 font-mono tabular-nums">
            {pendingClinics.length}
          </div>
          <p className="text-[11px] text-amber-700 mt-1">Requires admin approval</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Registered Accounts</span>
            <Users className="w-4 h-4 text-[#2457A7]" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {users.length}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Patients & clinic reps</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Appointment Requests</span>
            <Calendar className="w-4 h-4 text-[#27A89A]" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {totalAppointments}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Processed across clinics</p>
        </div>
      </div>

      {/* Main Split: Pending Clinic Applications & Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Submissions Alert Box */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Clinic Registration Submissions
              </h3>
              <p className="text-xs text-slate-500">
                New healthcare facilities requiring municipal verification before directory listing
              </p>
            </div>
            <button
              onClick={() => setAdminTab('approvals')}
              className="text-xs text-[#2457A7] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {pendingClinics.length === 0 ? (
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>All clinic registration applications have been reviewed. No pending approvals at this time.</span>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingClinics.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {c.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 font-semibold">
                        Submitted for Review
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{c.address}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      License: {c.licenseNo} · Submitted on {c.submittedDate || 'Oct 22, 2026'}
                    </p>
                  </div>

                  <button
                    onClick={() => setAdminTab('approvals')}
                    className="py-1.5 px-3.5 rounded-lg bg-[#2457A7] hover:bg-[#1c4585] text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
                  >
                    Review Credentials
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Quick Stats: Isabel Healthcare Capacity */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 mb-2">
              System Service Coverage in Isabel, Leyte
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 block">General Practice</span>
                <span className="font-bold text-slate-900">4 Facilities</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Dental Care</span>
                <span className="font-bold text-slate-900">2 Facilities</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Diagnostic Lab</span>
                <span className="font-bold text-slate-900">2 Facilities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Audit & System Activity Log (1 Col) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              System Audit Feed
            </h3>
            <span className="text-[10px] text-slate-400">Live Simulation</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 space-y-0.5">
              <div className="flex justify-between text-slate-500 text-[10px]">
                <span>Appointment Booked</span>
                <span>Today</span>
              </div>
              <p className="font-medium text-slate-800">
                Maria Clara Santos booked Tooth Extraction at Isabel Smile Dental
              </p>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 space-y-0.5">
              <div className="flex justify-between text-slate-500 text-[10px]">
                <span>Status Update</span>
                <span>Yesterday</span>
              </div>
              <p className="font-medium text-slate-800">
                RHU Isabel confirmed Prenatal Checkup for Maria Clara Santos
              </p>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 space-y-0.5">
              <div className="flex justify-between text-slate-500 text-[10px]">
                <span>New Clinic Registered</span>
                <span>Oct 22</span>
              </div>
              <p className="font-medium text-slate-800">
                CarePoint Pediatric & Wellness Center submitted registration documents
              </p>
            </div>
          </div>

          <button
            onClick={() => setAdminTab('reports')}
            className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold text-center transition-colors"
          >
            View Full Municipal Report
          </button>
        </div>
      </div>
    </div>
  );
};
