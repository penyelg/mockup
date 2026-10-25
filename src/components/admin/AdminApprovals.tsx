import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Check,
  X,
  Building2,
  FileText,
  MapPin,
  Clock,
  AlertCircle,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { Clinic } from '../../types';

export const AdminApprovals: React.FC = () => {
  const {
    clinics,
    approveClinicSubmission,
    rejectClinicSubmission,
  } = useApp();

  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('Incomplete DOH sanitary permit credentials.');

  // Separate pending and already reviewed clinics
  const pendingClinics = clinics.filter((c) => c.status === 'pending');
  const pastSubmissions = clinics.filter((c) => c.status === 'approved' || c.status === 'rejected');

  const handleApprove = (clinicId: string) => {
    approveClinicSubmission(clinicId);
    setSelectedClinic(null);
  };

  const handleOpenReject = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setRejectModalOpen(true);
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClinic) return;
    rejectClinicSubmission(selectedClinic.id, rejectionReason);
    setRejectModalOpen(false);
    setSelectedClinic(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Clinic Registration Submissions
        </h2>
        <p className="text-xs text-slate-500">
          Review credentials, business permits, and DOH accreditation before approving clinics into the IsabelCare directory.
        </p>
      </div>

      {/* Pending Submissions Queue */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-3">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">
              Pending Submissions Awaiting Municipal Approval ({pendingClinics.length})
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Isabel Health Office Protocol</span>
        </div>

        {pendingClinics.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="font-semibold text-slate-800">Queue is clear!</p>
            <p className="text-slate-500 mt-0.5">No pending clinic registration applications need review right now.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingClinics.map((clinic) => (
              <div key={clinic.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      {clinic.name}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                      Pending Approval
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{clinic.address}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 font-mono">
                    <span>License: {clinic.licenseNo}</span>
                    <span>·</span>
                    <span>Contact: {clinic.phone}</span>
                    <span>·</span>
                    <span>Submitted: {clinic.submittedDate || 'Oct 22, 2026'}</span>
                  </div>

                  <p className="text-xs text-slate-600 italic">
                    "{clinic.description}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <button
                    onClick={() => setSelectedClinic(clinic)}
                    className="py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>

                  <button
                    onClick={() => handleApprove(clinic.id)}
                    className="py-1.5 px-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve Listing</span>
                  </button>

                  <button
                    onClick={() => handleOpenReject(clinic)}
                    className="py-1.5 px-3 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review History / Approved Clinics Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-3">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">
            Registered Directory Facilities ({pastSubmissions.length})
          </h3>
          <p className="text-xs text-slate-500">
            Current status of clinic entries listed in IsabelCare
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-[11px] uppercase tracking-wider font-semibold text-slate-500 border-b border-slate-200">
                <th className="py-2.5 px-4">Clinic Facility</th>
                <th className="py-2.5 px-4">Barangay</th>
                <th className="py-2.5 px-4">Accreditation / License</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pastSubmissions.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <div>{c.name}</div>
                    <span className="text-[11px] font-normal text-slate-500">{c.phone}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{c.barangay}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                    {c.licenseNo}
                  </td>
                  <td className="py-3 px-4">
                    {c.status === 'approved' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Approved & Live</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                        <X className="w-3 h-3 text-rose-600" />
                        <span>Rejected ({c.rejectionReason || 'Permit issue'})</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedClinic(c)}
                      className="text-xs text-[#2457A7] font-semibold hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Clinic Details Modal */}
      {selectedClinic && !rejectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 space-y-4 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Municipal Verification Audit
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedClinic.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedClinic(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-900">Official License:</span>
                  <span className="font-mono text-slate-700">{selectedClinic.licenseNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-900">Location:</span>
                  <span>{selectedClinic.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-900">Contact:</span>
                  <span>{selectedClinic.phone} · {selectedClinic.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-900">Operating Hours:</span>
                  <span>{selectedClinic.hours}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Clinic Description & Scope:</h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {selectedClinic.description}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Proposed Services ({selectedClinic.services.length}):</h4>
                <div className="space-y-1">
                  {selectedClinic.services.map((s) => (
                    <div key={s.id} className="flex justify-between p-2 rounded bg-slate-50 border border-slate-100">
                      <span>{s.name} ({s.category})</span>
                      <span className="font-mono font-semibold">
                        {s.price !== null ? (s.price === 0 ? 'Free' : `₱${s.price}`) : 'Unlisted'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setSelectedClinic(null)}
                className="py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
              {selectedClinic.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleOpenReject(selectedClinic)}
                    className="py-2 px-3 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedClinic.id)}
                    className="py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                  >
                    Approve Clinic Listing
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {rejectModalOpen && selectedClinic && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-5 space-y-4 animate-in fade-in-50 zoom-in-95">
            <h3 className="text-sm font-bold text-slate-900">
              Reject Registration Application
            </h3>
            <p className="text-xs text-slate-600">
              Provide an official reason for declining <strong>{selectedClinic.name}</strong>.
            </p>

            <form onSubmit={handleConfirmReject} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Rejection Reason:
                </label>
                <textarea
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7] resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectModalOpen(false)}
                  className="py-1.5 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-1.5 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
