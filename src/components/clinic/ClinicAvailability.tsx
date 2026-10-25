import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  Info,
} from 'lucide-react';
import { AppointmentSlot } from '../../types';

export const ClinicAvailability: React.FC = () => {
  const {
    activeClinicRepClinicId,
    clinics,
    toggleSlotAvailability,
    addClinicSlot,
    appointments,
  } = useApp();

  const clinic = clinics.find((c) => c.id === activeClinicRepClinicId) || clinics[0];

  const [selectedDate, setSelectedDate] = useState('2026-10-26');
  const [newTime, setNewTime] = useState('04:00 PM');
  const [showAddSlot, setShowAddSlot] = useState(false);

  const availableDates = ['2026-10-25', '2026-10-26', '2026-10-27', '2026-10-28', '2026-10-29'];

  const slotsForDate = clinic.slots.filter((s) => s.date === selectedDate);

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTime) return;
    addClinicSlot(clinic.id, {
      date: selectedDate,
      time: newTime,
      isAvailable: true,
    });
    setShowAddSlot(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Appointment Availability Management
          </h2>
          <p className="text-xs text-slate-500">
            Publish and manage daily appointment slots for {clinic.name}.
          </p>
        </div>

        <button
          onClick={() => setShowAddSlot(true)}
          className="py-2 px-3.5 rounded-xl bg-[#2457A7] hover:bg-[#1c4585] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Slot for {selectedDate}</span>
        </button>
      </div>

      {/* Date Selector Carousel */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <label className="block text-xs font-semibold text-slate-700">
          Select Calendar Date to Manage:
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {availableDates.map((date) => {
            const d = new Date(date);
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = d.getDate();
            const isSelected = selectedDate === date;
            const slotsCount = clinic.slots.filter((s) => s.date === date).length;

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`py-2.5 px-4 rounded-xl border text-center transition-all min-w-[85px] ${
                  isSelected
                    ? 'bg-[#2457A7] text-white border-[#2457A7] shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="block text-[11px] uppercase font-semibold">
                  {dayName}
                </span>
                <span className="block text-base font-bold mt-0.5">
                  {dayNum}
                </span>
                <span className={`block text-[10px] mt-1 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {slotsCount} slots
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Grid */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Slots for {selectedDate}
            </h3>
            <p className="text-[11px] text-slate-500">
              Click any unbooked slot to toggle its availability for patient requests.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Available</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Booked by Patient</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span>Disabled / Closed</span>
            </span>
          </div>
        </div>

        {slotsForDate.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <Clock className="w-6 h-6 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No time slots created for this date.</p>
            <p className="mt-1">Click "Add Slot" above to configure your clinic hours for this day.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {slotsForDate.map((slot, idx) => {
              const isBooked = !slot.isAvailable && !!slot.bookedBy;

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all text-xs flex flex-col justify-between min-h-[90px] ${
                    isBooked
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                      : slot.isAvailable
                      ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950 hover:border-emerald-400 cursor-pointer'
                      : 'bg-slate-100 border-slate-200 text-slate-400 hover:border-slate-300 cursor-pointer'
                  }`}
                  onClick={() => {
                    if (!isBooked) {
                      toggleSlotAvailability(clinic.id, slot.date, slot.time);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm font-mono">{slot.time}</span>
                    {isBooked ? (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-bold">
                        Booked
                      </span>
                    ) : slot.isAvailable ? (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900 font-semibold">
                        Available
                      </span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-600 font-semibold">
                        Closed
                      </span>
                    )}
                  </div>

                  <div className="mt-2 pt-2 border-t border-black/5 flex items-center justify-between text-[11px]">
                    {isBooked ? (
                      <span className="flex items-center gap-1 font-semibold text-amber-900 truncate">
                        <User className="w-3 h-3 shrink-0" />
                        <span>{slot.bookedBy}</span>
                      </span>
                    ) : (
                      <span className="text-slate-500">
                        {slot.isAvailable ? 'Click to close slot' : 'Click to open slot'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Slot Modal */}
      {showAddSlot && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-5 space-y-4 animate-in fade-in-50 zoom-in-95">
            <h3 className="text-sm font-bold text-slate-900">
              Add New Appointment Slot
            </h3>
            <p className="text-xs text-slate-500">
              Date: <strong>{selectedDate}</strong>
            </p>

            <form onSubmit={handleAddSlot} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Slot Time:
                </label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="08:30 AM">08:30 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="09:30 AM">09:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSlot(false)}
                  className="py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-lg bg-[#2457A7] text-white text-xs font-semibold"
                >
                  Add Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
