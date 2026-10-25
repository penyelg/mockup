import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Info,
  Navigation,
} from 'lucide-react';

export const PatientClinicDetails: React.FC = () => {
  const {
    selectedClinicId,
    clinics,
    setPatientTab,
    setAppointmentModalOpen,
    setSelectedServiceId,
  } = useApp();

  const clinic = clinics.find((c) => c.id === selectedClinicId) || clinics[0];

  // Selected date for slot viewing
  const [selectedDate, setSelectedDate] = useState('2026-10-26');

  // Filter slots for the selected date
  const dateSlots = clinic?.slots.filter((s) => s.date === selectedDate) || [];

  return (
    <div className="space-y-5 pb-8">
      {/* Back button and breadcrumb */}
      <button
        onClick={() => setPatientTab('clinics')}
        className="flex items-center gap-1.5 text-xs text-[#2457A7] font-semibold hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Clinic Directory</span>
      </button>

      {/* Hero Clinic Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="h-44 sm:h-56 relative bg-slate-100">
          <img
            src={clinic.image}
            alt={clinic.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-4">
            <div className="text-white space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/90 text-white flex items-center gap-1 backdrop-blur-xs">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Approved Clinic</span>
                </span>
                <span className="text-[10px] text-slate-300">
                  {clinic.licenseNo}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-bold tracking-tight text-white leading-snug">
                {clinic.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Essential Info Grid */}
        <div className="p-4 space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {clinic.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-100">
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#27A89A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Address</span>
                  <span>{clinic.address}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#2457A7] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Operating Hours</span>
                  <span>{clinic.hours}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#2457A7] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Contact Phone</span>
                  <span className="font-mono">{clinic.phone}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#27A89A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Email Inquiries</span>
                  <span>{clinic.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Accreditations */}
          {clinic.accreditations && clinic.accreditations.length > 0 && (
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center gap-2 text-xs text-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#2457A7] shrink-0" />
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-slate-900">Accreditations:</span>
                <span>{clinic.accreditations.join(' · ')}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Available Healthcare Services & Transparent Pricing */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Healthcare Services & Listed Pricing
            </h3>
            <p className="text-[11px] text-slate-500">
              Select a service below to request an appointment slot
            </p>
          </div>
          <span className="text-[10px] text-slate-400">Philippine Peso (PHP ₱)</span>
        </div>

        <div className="space-y-2.5">
          {clinic.services.map((service) => (
            <div
              key={service.id}
              className="p-3 rounded-xl border border-slate-200 hover:border-[#2457A7] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
                    {service.name}
                  </h4>
                  <span className="text-[10px] text-[#2457A7] font-medium px-1.5 py-0.2 bg-blue-50 rounded">
                    {service.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {service.description}
                </p>
                <div className="text-[11px] text-slate-400 mt-1">
                  Est. Duration: {service.durationMinutes} mins
                </div>
              </div>

              <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 block">Listed Fee</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                    {service.price !== null
                      ? service.price === 0
                        ? 'Free / LGU Subsidized'
                        : `₱${service.price.toLocaleString()}`
                      : 'Price not listed'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedServiceId(service.id);
                    setAppointmentModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#2457A7] hover:bg-[#1c4585] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Slots Calendar Preview */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2457A7]" />
            <h3 className="text-sm font-bold text-slate-900">
              Recorded Appointment Availability
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Live Provider Schedule</span>
        </div>

        {/* Date Selector Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['2026-10-25', '2026-10-26', '2026-10-27', '2026-10-28'].map((date) => {
            const d = new Date(date);
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = d.getDate();
            const isSelected = selectedDate === date;

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`py-2 px-3 rounded-xl border text-center transition-all min-w-[70px] ${
                  isSelected
                    ? 'bg-[#2457A7] text-white border-[#2457A7] shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="block text-[10px] uppercase font-semibold">
                  {dayName}
                </span>
                <span className="block text-sm font-bold mt-0.5">
                  {dayNum}
                </span>
              </button>
            );
          })}
        </div>

        {/* Available Slots Grid */}
        <div>
          <span className="text-xs font-semibold text-slate-700 block mb-2">
            Time Slots for {selectedDate}:
          </span>

          {dateSlots.length === 0 ? (
            <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-lg border border-slate-100">
              No recorded slots published for this date yet. You may still submit an appointment request for the clinic representative to confirm.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {dateSlots.map((slot, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border text-xs text-center transition-all ${
                    slot.isAvailable
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 font-medium'
                      : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through'
                  }`}
                >
                  <span className="block font-semibold">{slot.time}</span>
                  <span className="text-[10px] block mt-0.5">
                    {slot.isAvailable ? 'Available' : 'Booked'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setAppointmentModalOpen(true)}
          className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#2457A7] hover:bg-[#1c4585] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>Request an Appointment at {clinic.name}</span>
        </button>
      </div>

      {/* Stylized Static Map Mockup of Isabel, Leyte */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <Navigation className="w-4 h-4 text-[#27A89A]" />
            <span>Clinic Location · Isabel, Leyte</span>
          </div>
          <span className="text-[11px] text-slate-400">Visual Map Reference</span>
        </div>

        {/* Stylized Map Canvas */}
        <div className="h-44 rounded-xl bg-slate-100 border border-slate-200 relative overflow-hidden flex items-center justify-center p-3">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

          {/* Coastal water area indication for Isabel coast */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-sky-100/70 border-t border-sky-200 flex items-center justify-center">
            <span className="text-[10px] text-sky-600 font-medium tracking-wider uppercase">
              Port of Isabel & Dupon Bay Coastline
            </span>
          </div>

          {/* Road vector simulation */}
          <div className="absolute top-0 bottom-16 left-1/3 w-3 bg-slate-200 transform -rotate-12" />
          <div className="absolute top-1/2 left-0 right-0 h-2.5 bg-amber-200/80 transform rotate-2" />

          {/* Pinned Clinic Location */}
          <div className="relative z-10 bg-white px-3 py-2 rounded-xl border border-slate-300 shadow-md flex items-center gap-2 text-left max-w-xs">
            <div className="w-8 h-8 rounded-full bg-[#2457A7] text-white flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {clinic.name}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {clinic.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
