import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Stethoscope,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  Save,
} from 'lucide-react';
import { ClinicService, ServiceCategory } from '../../types';

export const ClinicServices: React.FC = () => {
  const {
    activeClinicRepClinicId,
    clinics,
    addClinicService,
    updateClinicService,
    deleteClinicService,
  } = useApp();

  const clinic = clinics.find((c) => c.id === activeClinicRepClinicId) || clinics[0];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Dental Care');
  const [description, setDescription] = useState('');
  const [priceStr, setPriceStr] = useState('');
  const [duration, setDuration] = useState('30');
  const [isAvailable, setIsAvailable] = useState(true);

  const categories: ServiceCategory[] = [
    'Dental Care',
    'General Practice',
    'Maternal & Child',
    'Pediatrics',
    'Diagnostic Laboratory',
    'Internal Medicine',
  ];

  const handleOpenAdd = () => {
    setEditingServiceId(null);
    setName('');
    setCategory('General Practice');
    setDescription('');
    setPriceStr('');
    setDuration('30');
    setIsAvailable(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (srv: ClinicService) => {
    setEditingServiceId(srv.id);
    setName(srv.name);
    setCategory(srv.category);
    setDescription(srv.description);
    setPriceStr(srv.price !== null ? String(srv.price) : '');
    setDuration(String(srv.durationMinutes));
    setIsAvailable(srv.isAvailable);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = priceStr.trim() !== '' ? Number(priceStr) : null;
    const parsedDuration = Number(duration) || 30;

    if (editingServiceId) {
      updateClinicService(clinic.id, editingServiceId, {
        name,
        category,
        description,
        price: parsedPrice,
        durationMinutes: parsedDuration,
        isAvailable,
      });
    } else {
      addClinicService(clinic.id, {
        name,
        category,
        description,
        price: parsedPrice,
        durationMinutes: parsedDuration,
        isAvailable,
      });
    }

    setModalOpen(false);
  };

  const [deletingService, setDeletingService] = useState<ClinicService | null>(null);

  const handleConfirmDelete = () => {
    if (deletingService) {
      deleteClinicService(clinic.id, deletingService.id);
      setDeletingService(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Healthcare Services & Pricing
          </h2>
          <p className="text-xs text-slate-500">
            Manage procedures, consultations, and transparent fees for {clinic.name}.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="py-2 px-4 rounded-xl bg-[#2457A7] hover:bg-[#1c4585] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] uppercase tracking-wider font-semibold text-slate-500 border-b border-slate-200">
                <th className="py-3 px-4">Service & Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Listed Price (PHP)</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {clinic.services.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div>{srv.name}</div>
                    <span className="text-[10px] text-[#2457A7] font-medium mt-0.5 inline-block">
                      {srv.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                    {srv.description}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {srv.price !== null
                      ? srv.price === 0
                        ? 'Free / Subsidized'
                        : `₱${srv.price.toLocaleString()}`
                      : 'Price not listed'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">
                    {srv.durationMinutes} min
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        srv.isAvailable
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {srv.isAvailable ? 'Available' : 'Paused'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(srv)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Edit Service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingService(srv)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-5 space-y-4 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {editingServiceId ? 'Edit Service' : 'Add New Healthcare Service'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Service Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tooth Extraction, Prenatal Consultation..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Description:
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief clinical description of what is included..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-[#2457A7] resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Listed Price (₱):
                  </label>
                  <input
                    type="number"
                    value={priceStr}
                    onChange={(e) => setPriceStr(e.target.value)}
                    placeholder="Leave empty if unlisted or 0 for free"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 font-mono"
                  />
                  <span className="text-[10px] text-slate-400">Empty = "Price not listed"</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Duration (Minutes):
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="availCheck"
                  checked={isAvailable}
                  onChange={(e) => setIsAvailable(e.target.checked)}
                  className="rounded text-[#2457A7] focus:ring-[#2457A7]"
                />
                <label htmlFor="availCheck" className="text-xs text-slate-700 font-medium select-none">
                  Active and available for appointment requests
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-lg bg-[#2457A7] hover:bg-[#1c4585] text-white text-xs font-semibold shadow-xs"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Service Confirmation Modal */}
      {deletingService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-5 space-y-3 animate-in fade-in-50 zoom-in-95">
            <h4 className="text-sm font-bold text-slate-900">
              Delete Healthcare Service?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to remove <strong>{deletingService.name}</strong> from {clinic.name}'s active services?
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeletingService(null)}
                className="py-1.5 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="py-1.5 px-3.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
              >
                Delete Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
