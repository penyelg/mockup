import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Save, CheckCircle2, MapPin, Phone, Mail, Clock, Shield } from 'lucide-react';
import { ISABEL_BARANGAYS } from '../../data/mockData';

export const ClinicProfile: React.FC = () => {
  const { activeClinicRepClinicId, clinics, updateClinicProfile } = useApp();
  const clinic = clinics.find((c) => c.id === activeClinicRepClinicId) || clinics[0];

  const [name, setName] = useState(clinic.name);
  const [barangay, setBarangay] = useState(clinic.barangay);
  const [address, setAddress] = useState(clinic.address);
  const [phone, setPhone] = useState(clinic.phone);
  const [email, setEmail] = useState(clinic.email);
  const [hours, setHours] = useState(clinic.hours);
  const [description, setDescription] = useState(clinic.description);
  const [licenseNo, setLicenseNo] = useState(clinic.licenseNo);

  useEffect(() => {
    setName(clinic.name);
    setBarangay(clinic.barangay);
    setAddress(clinic.address);
    setPhone(clinic.phone);
    setEmail(clinic.email);
    setHours(clinic.hours);
    setDescription(clinic.description);
    setLicenseNo(clinic.licenseNo);
  }, [clinic]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClinicProfile(clinic.id, {
      name,
      barangay,
      address,
      phone,
      email,
      hours,
      description,
      licenseNo,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Clinic Profile Management
        </h2>
        <p className="text-xs text-slate-500">
          Update your clinic's public information, location in Isabel, Leyte, and operating schedule.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        {/* Status Banner */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Listing Status: {clinic.status.toUpperCase()}
              </span>
              <span className="text-[11px] text-slate-500">
                Verified healthcare listing on the IsabelCare directory
              </span>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
            {clinic.licenseNo}
          </span>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            General Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinic Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                DOH / PRC License Number:
              </label>
              <input
                type="text"
                value={licenseNo}
                onChange={(e) => setLicenseNo(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Clinic Bio & Overview:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7] resize-none"
              required
            />
          </div>
        </div>

        {/* Location & Contact */}
        <div className="space-y-4 pt-3 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Location in Isabel, Leyte & Contact
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Barangay:
              </label>
              <select
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 bg-white"
              >
                {ISABEL_BARANGAYS.filter((b) => b !== 'All Isabel, Leyte').map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Physical Address:
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Phone Number:
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Email Address:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7]"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Operating Days & Hours:
              </label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="e.g. Monday – Saturday: 8:00 AM – 5:00 PM"
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7]"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl bg-[#2457A7] hover:bg-[#1c4585] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
