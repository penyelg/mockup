import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EMERGENCY_HOTLINES } from '../../data/mockData';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Download,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Smartphone,
  ExternalLink,
  Edit2,
  Check,
  ChevronRight,
} from 'lucide-react';

export const PatientProfile: React.FC = () => {
  const { addToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Maria Clara Santos');
  const [phone, setPhone] = useState('0917-555-0192');
  const [barangay, setBarangay] = useState('Poblacion, Isabel, Leyte');
  const [email, setEmail] = useState('maria.santos@isabel-demo.ph');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    addToast('success', 'Profile Updated', 'Demo patient profile saved locally.');
  };

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          Patient Profile & Settings
        </h2>
        <p className="text-xs text-slate-500">
          Manage your contact information, emergency hotlines, and PWA setup.
        </p>
      </div>

      {/* Patient Profile Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2457A7] to-[#27A89A] text-white font-bold text-base flex items-center justify-center shadow-xs">
              MC
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{name}</h3>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#27A89A]" />
                <span>{barangay}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Mobile Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Barangay Residence</label>
              <input
                type="text"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-3 rounded-lg bg-[#2457A7] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="truncate">{email}</span>
            </div>
          </div>
        )}
      </div>

      {/* PWA: Add to Home Screen Instructions */}
      <div className="bg-gradient-to-br from-slate-900 to-[#1c3a6e] text-white p-4 rounded-2xl shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-[#27A89A]" />
          <h3 className="text-xs sm:text-sm font-bold">
            Add IsabelCare to Your Home Screen (PWA)
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Install IsabelCare on your Android or iPhone device for fast 1-tap clinic discovery and offline access to Isabel medical hotlines.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-200">
          <div className="bg-white/10 p-3 rounded-xl border border-white/10 space-y-1">
            <span className="font-semibold text-white block flex items-center gap-1">
              <span>Android (Google Chrome)</span>
            </span>
            <ol className="text-[11px] text-slate-300 list-decimal list-inside space-y-0.5">
              <li>Tap the three vertical dots (⋮) menu</li>
              <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></li>
              <li>Confirm "Install" to add icon</li>
            </ol>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/10 space-y-1">
            <span className="font-semibold text-white block flex items-center gap-1">
              <span>Apple iPhone (Safari)</span>
            </span>
            <ol className="text-[11px] text-slate-300 list-decimal list-inside space-y-0.5">
              <li>Tap the Share icon at the bottom</li>
              <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
              <li>Tap "Add" in the top right corner</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Emergency & Municipal Health Hotlines (Isabel, Leyte) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Isabel, Leyte Emergency Hotlines</span>
          </div>
          <span className="text-[10px] text-slate-400">Public Safety Contacts</span>
        </div>

        <div className="space-y-2">
          {EMERGENCY_HOTLINES.map((hotline, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <h4 className="font-semibold text-slate-900">{hotline.name}</h4>
                <p className="text-[11px] text-slate-500">{hotline.note}</p>
              </div>
              <span className="font-mono font-bold text-[#2457A7] text-xs shrink-0">
                {hotline.number}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimers & Capstone Proposal Context */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2.5 text-xs text-slate-600">
        <div className="flex items-center gap-2 text-slate-900 font-bold">
          <ShieldCheck className="w-4 h-4 text-[#2457A7]" />
          <span>System Information & Academic Proposal</span>
        </div>
        <p className="leading-relaxed">
          This system is an academic software prototype proposed for an IT Capstone Project titled:
        </p>
        <blockquote className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-medium text-slate-800 text-[11px] italic">
          “Design and Development of an AI-Assisted Healthcare Navigation and Clinic Appointment Booking System for Patients and Healthcare Providers in Isabel, Leyte.”
        </blockquote>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          All clinic records, practitioner profiles, and prices displayed in this prototype are realistic sample data intended to demonstrate user experience workflows and municipal service accessibility.
        </p>
      </div>
    </div>
  );
};
