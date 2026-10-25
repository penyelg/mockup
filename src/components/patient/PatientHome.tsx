import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Search,
  Building2,
  Calendar,
  PhoneCall,
  ChevronRight,
  ShieldAlert,
  Clock,
  MapPin,
  CheckCircle2,
  Stethoscope,
  Baby,
  HeartPulse,
  FlaskConical,
} from 'lucide-react';

export const PatientHome: React.FC = () => {
  const {
    setPatientTab,
    setSelectedClinicId,
    setPrefilledConcern,
    setAppointmentModalOpen,
    clinics,
  } = useApp();

  const [concernInput, setConcernInput] = useState('');

  const sampleConcerns = [
    'I have a toothache and swollen gums',
    'Toddler has high fever and cough for 2 days',
    'Prenatal checkup and ultrasound scan',
    'Need blood chemistry: fasting sugar & CBC',
    'Itchy red skin rash on arms',
  ];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPrefilledConcern(concernInput || 'I have a toothache and want to find a nearby dental clinic');
    setPatientTab('ai-nav');
  };

  const handleQuickConcernClick = (concern: string) => {
    setConcernInput(concern);
    setPrefilledConcern(concern);
    setPatientTab('ai-nav');
  };

  const approvedClinics = clinics.filter((c) => c.status === 'approved').slice(0, 3);

  return (
    <div className="space-y-5 pb-6">
      {/* Hero Greeting & Search Box */}
      <section className="bg-gradient-to-br from-[#2457A7] via-[#1E4B91] to-[#27A89A] text-white p-5 rounded-2xl shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs">
              Isabel, Leyte Healthcare Portal
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
            How can we help you find healthcare today?
          </h2>

          <p className="text-xs text-blue-100 leading-relaxed max-w-xl">
            Describe your symptoms or healthcare need in everyday language. Our navigation system will connect you with matching clinics in Isabel, Leyte.
          </p>

          {/* Stated Concern Input Field */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="bg-white p-1.5 rounded-xl shadow-lg flex items-center gap-2 text-slate-800">
              <Sparkles className="w-5 h-5 text-[#27A89A] ml-2 shrink-0" />
              <input
                type="text"
                value={concernInput}
                onChange={(e) => setConcernInput(e.target.value)}
                placeholder="Describe what healthcare service you need..."
                className="w-full text-xs sm:text-sm py-2 px-1 focus:outline-none text-slate-800 placeholder-slate-400"
              />
              <button
                type="submit"
                className="bg-[#2457A7] hover:bg-[#1c4585] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shrink-0 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Find Services</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Clickable Suggestions */}
          <div className="pt-1">
            <p className="text-[11px] text-blue-200 mb-1.5 font-medium">
              Common patient concerns:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sampleConcerns.map((concern, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickConcernClick(concern)}
                  className="text-[11px] text-left bg-white/15 hover:bg-white/25 active:bg-white/35 text-white px-2.5 py-1 rounded-md transition-colors backdrop-blur-xs border border-white/10"
                >
                  {concern}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Medical Safety Disclaimer (Prominent & Clear) */}
      <section className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2.5">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <span className="font-semibold text-amber-950">Patient Notice: </span>
          IsabelCare helps you discover local clinics and book appointments. Suggestions are for healthcare navigation only and are not a medical diagnosis. In a medical emergency, visit the nearest emergency facility or call the Isabel MDRRMO Hotline.
        </div>
      </section>

      {/* Quick Action Navigation Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => setPatientTab('ai-nav')}
          className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-[#2457A7] hover:shadow-xs transition-all text-left flex flex-col justify-between group"
        >
          <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#2457A7] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              AI Navigation
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Match concerns to services
            </p>
          </div>
        </button>

        <button
          onClick={() => setPatientTab('clinics')}
          className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-[#2457A7] hover:shadow-xs transition-all text-left flex flex-col justify-between group"
        >
          <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#27A89A] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              Browse Clinics
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Directory in Isabel, Leyte
            </p>
          </div>
        </button>

        <button
          onClick={() => setPatientTab('appointments')}
          className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-[#2457A7] hover:shadow-xs transition-all text-left flex flex-col justify-between group"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              My Bookings
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Check appointment status
            </p>
          </div>
        </button>

        <button
          onClick={() => setPatientTab('profile')}
          className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-[#2457A7] hover:shadow-xs transition-all text-left flex flex-col justify-between group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">
              Emergency Hotlines
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              RHU & MDRRMO Isabel
            </p>
          </div>
        </button>
      </section>

      {/* Popular Healthcare Services */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Popular Healthcare Services
          </h3>
          <button
            onClick={() => setPatientTab('clinics')}
            className="text-xs text-[#2457A7] font-semibold hover:underline"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { name: 'Dental Care', desc: 'Tooth extraction, cleaning, filling', icon: Stethoscope, category: 'Dental Care' },
            { name: 'Maternal & Prenatal', desc: 'Prenatal exams, ultrasound', icon: HeartPulse, category: 'Maternal & Child' },
            { name: 'Pediatrics / Child', desc: 'Fever check, infant immunization', icon: Baby, category: 'Pediatrics' },
            { name: 'Diagnostic Labs', desc: 'CBC, blood sugar, urinalysis', icon: FlaskConical, category: 'Diagnostic Laboratory' },
          ].map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  setPrefilledConcern(`Looking for ${srv.name} services in Isabel`);
                  setPatientTab('ai-nav');
                }}
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-left transition-colors flex flex-col justify-between"
              >
                <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center mb-1.5">
                  <Icon className="w-4 h-4 text-[#2457A7]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 leading-tight">
                    {srv.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                    {srv.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Approved Clinics in Isabel, Leyte */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Approved Clinics in Isabel, Leyte
            </h3>
            <p className="text-[11px] text-slate-500">
              Verified healthcare facilities and operating hours
            </p>
          </div>
          <button
            onClick={() => setPatientTab('clinics')}
            className="text-xs text-[#2457A7] font-semibold hover:underline"
          >
            Browse All ({clinics.filter((c) => c.status === 'approved').length})
          </button>
        </div>

        <div className="space-y-3">
          {approvedClinics.map((clinic) => (
            <div
              key={clinic.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-44 h-32 sm:h-auto relative bg-slate-100 shrink-0">
                  <img
                    src={clinic.image}
                    alt={clinic.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-600/90 text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Approved Clinic</span>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {clinic.name}
                      </h4>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-500 block">Starting at</span>
                        <span className="text-xs font-bold text-slate-900">
                          {clinic.startingPrice !== null
                            ? clinic.startingPrice === 0
                              ? 'Free / Subsidized'
                              : `₱${clinic.startingPrice.toLocaleString()}`
                            : 'Price not listed'}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{clinic.barangay}, Isabel, Leyte</span>
                    </p>

                    <p className="text-[11px] text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {clinic.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{clinic.hours.split(':')[0]}</span>
                      </span>
                      <span>·</span>
                      <span className="text-emerald-700 font-medium">
                        Next: {clinic.nextAvailableSlot}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setSelectedClinicId(clinic.id);
                        setPatientTab('clinic-details');
                      }}
                      className="flex-1 py-1.5 px-3 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-semibold text-center transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedClinicId(clinic.id);
                        setAppointmentModalOpen(true);
                      }}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-[#2457A7] hover:bg-[#1c4585] text-white text-xs font-semibold text-center transition-colors shadow-xs"
                    >
                      Request Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
