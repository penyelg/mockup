import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  Building2,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Phone,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { AppointmentRequest } from '../../types';

export const AppointmentRequestModal: React.FC = () => {
  const {
    appointmentModalOpen,
    setAppointmentModalOpen,
    selectedClinicId,
    selectedServiceId,
    clinics,
    requestAppointment,
    setPatientTab,
  } = useApp();

  const clinic = clinics.find((c) => c.id === selectedClinicId) || clinics[0];

  const [serviceId, setServiceId] = useState(
    selectedServiceId || (clinic?.services[0]?.id || '')
  );
  const [date, setDate] = useState('2026-10-26');
  const [time, setTime] = useState('09:00 AM');
  const [note, setNote] = useState('Need examination for recurring symptoms. Thank you.');
  const [patientName, setPatientName] = useState('Maria Clara Santos');
  const [patientPhone, setPatientPhone] = useState('0917-555-0192');
  const [patientBarangay, setPatientBarangay] = useState('Poblacion');

  const [submittedRequest, setSubmittedRequest] = useState<AppointmentRequest | null>(null);

  // Sync selected service when prop or clinic changes
  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
    } else if (clinic?.services[0]) {
      setServiceId(clinic.services[0].id);
    }
  }, [selectedServiceId, clinic]);

  if (!appointmentModalOpen) return null;

  const currentService = clinic.services.find((s) => s.id === serviceId) || clinic.services[0];

  // Available slots for the selected date from clinic slots
  const availableSlotsForDate = clinic.slots.filter(
    (s) => s.date === date && s.isAvailable
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const req = requestAppointment({
      clinicId: clinic.id,
      serviceId: currentService.id,
      date,
      time,
      note,
      patientName,
      patientPhone,
      patientBarangay,
    });
    setSubmittedRequest(req);
  };

  const handleClose = () => {
    setAppointmentModalOpen(false);
    setSubmittedRequest(null);
  };

  const handleViewAppointments = () => {
    handleClose();
    setPatientTab('appointments');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in-50 zoom-in-95">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex items-center justify-between z-10">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {submittedRequest ? 'Request Submitted' : 'Request Clinic Appointment'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {clinic.name} · Isabel, Leyte
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5">
          {submittedRequest ? (
            /* Success State with Pending notice */
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <Clock className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Status: Pending Clinic Confirmation
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2">
                  Your appointment request has been sent!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  The clinic representative at <strong>{clinic.name}</strong> will review your request. You can check the live status on the <strong>My Appointments</strong> page.
                </p>
              </div>

              {/* Request Reference Receipt */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Reference ID:</span>
                  <span className="font-mono font-bold text-slate-900">{submittedRequest.id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Healthcare Service:</span>
                  <span className="font-semibold text-slate-900">{submittedRequest.serviceName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Requested Schedule:</span>
                  <span className="font-semibold text-slate-900">
                    {submittedRequest.appointmentDate} at {submittedRequest.appointmentTime}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Estimated Fee:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {submittedRequest.estimatedPrice !== null
                      ? submittedRequest.estimatedPrice === 0
                        ? 'Free / Subsidized'
                        : `₱${submittedRequest.estimatedPrice.toLocaleString()}`
                      : 'Price not listed'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient:</span>
                  <span className="text-slate-800">{submittedRequest.patientName} ({submittedRequest.patientPhone})</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={handleViewAppointments}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#2457A7] hover:bg-[#1c4585] text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Go to My Appointments</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Request Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Clinic Header */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#2457A7]/10 text-[#2457A7] flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {clinic.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {clinic.address}
                  </p>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Healthcare Service Required:
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-[#2457A7]"
                >
                  {clinic.services.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} — {srv.price !== null ? (srv.price === 0 ? 'Free' : `₱${srv.price.toLocaleString()}`) : 'Price unlisted'}
                    </option>
                  ))}
                </select>
                {currentService && (
                  <p className="text-[11px] text-slate-500 mt-1 italic">
                    {currentService.description}
                  </p>
                )}
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#2457A7]" />
                    <span>Preferred Date:</span>
                  </label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-[#2457A7]"
                  >
                    <option value="2026-10-26">Mon, Oct 26, 2026</option>
                    <option value="2026-10-27">Tue, Oct 27, 2026</option>
                    <option value="2026-10-28">Wed, Oct 28, 2026</option>
                    <option value="2026-10-29">Thu, Oct 29, 2026</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#27A89A]" />
                    <span>Time Slot:</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-[#2457A7]"
                  >
                    {availableSlotsForDate.length > 0 ? (
                      availableSlotsForDate.map((s, idx) => (
                        <option key={idx} value={s.time}>
                          {s.time} (Available)
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="08:30 AM">08:30 AM (Standard)</option>
                        <option value="09:30 AM">09:30 AM (Standard)</option>
                        <option value="10:30 AM">10:30 AM (Standard)</option>
                        <option value="01:30 PM">01:30 PM (Standard)</option>
                        <option value="02:30 PM">02:30 PM (Standard)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Patient Information (Pre-filled demo) */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
                  Patient Contact Information:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Patient Full Name</label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full text-xs p-2 rounded border border-slate-300 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">Contact Phone Number</label>
                    <input
                      type="text"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full text-xs p-2 rounded border border-slate-300 bg-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Barangay (Isabel, Leyte)</label>
                  <input
                    type="text"
                    value={patientBarangay}
                    onChange={(e) => setPatientBarangay(e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Short Note / Reason */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Reason for Consultation / Symptoms Note (Optional):
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Describe any symptoms, previous treatments, or special requests..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7] text-slate-800 resize-none"
                />
              </div>

              {/* Request Summary & Fee Notice */}
              <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 space-y-1 text-xs text-blue-950">
                <div className="flex justify-between font-semibold">
                  <span>Estimated Listed Fee:</span>
                  <span className="font-mono text-sm">
                    {currentService?.price !== null
                      ? currentService?.price === 0
                        ? 'Free / Subsidized'
                        : `₱${currentService?.price.toLocaleString()}`
                      : 'Price not listed'}
                  </span>
                </div>
                <p className="text-[11px] text-blue-800 leading-snug">
                  * Notice: Payment is settled directly at the clinic. Requests require confirmation by the clinic representative before being confirmed.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#2457A7] hover:bg-[#1c4585] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Submit Appointment Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
