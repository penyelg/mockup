import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ISABEL_BARANGAYS } from '../../data/mockData';
import { ServiceCategory } from '../../types';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown,
  Info,
} from 'lucide-react';

export const PatientClinics: React.FC = () => {
  const {
    clinics,
    setSelectedClinicId,
    setPatientTab,
    setAppointmentModalOpen,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('All Isabel, Leyte');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'under500' | 'under1000'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'name'>('relevance');

  const categories: (ServiceCategory | 'All')[] = [
    'All',
    'General Practice',
    'Dental Care',
    'Maternal & Child',
    'Pediatrics',
    'Diagnostic Laboratory',
    'Internal Medicine',
  ];

  const filteredClinics = useMemo(() => {
    return clinics
      .filter((clinic) => {
        // Show approved clinics to patients
        if (clinic.status !== 'approved') return false;

        // Search text matching
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = clinic.name.toLowerCase().includes(q);
          const matchBarangay = clinic.barangay.toLowerCase().includes(q);
          const matchService = clinic.services.some(
            (s) =>
              s.name.toLowerCase().includes(q) ||
              s.category.toLowerCase().includes(q)
          );
          if (!matchName && !matchBarangay && !matchService) return false;
        }

        // Barangay filter
        if (
          selectedBarangay !== 'All Isabel, Leyte' &&
          clinic.barangay.toLowerCase() !== selectedBarangay.toLowerCase()
        ) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'All') {
          const hasCategory = clinic.services.some(
            (s) => s.category === selectedCategory
          );
          if (!hasCategory) return false;
        }

        // Price filter
        if (priceFilter === 'free') {
          if (clinic.startingPrice !== 0) return false;
        } else if (priceFilter === 'under500') {
          if (clinic.startingPrice === null || clinic.startingPrice > 500) return false;
        } else if (priceFilter === 'under1000') {
          if (clinic.startingPrice === null || clinic.startingPrice > 1000) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          const priceA = a.startingPrice ?? 999999;
          const priceB = b.startingPrice ?? 999999;
          return priceA - priceB;
        }
        if (sortBy === 'price-desc') {
          const priceA = a.startingPrice ?? -1;
          const priceB = b.startingPrice ?? -1;
          return priceB - priceA;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0; // relevance
      });
  }, [clinics, searchQuery, selectedBarangay, selectedCategory, priceFilter, sortBy]);

  return (
    <div className="space-y-4 pb-6">
      {/* Title & Demo Data Indicator */}
      <div className="flex flex-col gap-1">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          Clinic Directory — Isabel, Leyte
        </h2>
        <p className="text-xs text-slate-500">
          Compare verified healthcare facilities, listed services, and schedule openings.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400 ml-1.5 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by clinic name, service, or barangay..."
          className="w-full text-xs sm:text-sm py-1.5 px-1 focus:outline-none text-slate-800 placeholder-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Location / Barangay */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Barangay
            </label>
            <select
              value={selectedBarangay}
              onChange={(e) => setSelectedBarangay(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#2457A7]"
            >
              {ISABEL_BARANGAYS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Starting Price
            </label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as any)}
              className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#2457A7]"
            >
              <option value="all">All Prices</option>
              <option value="free">Free / Subsidized Only (RHU)</option>
              <option value="under500">Under ₱500</option>
              <option value="under1000">Under ₱1,000</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#2457A7]"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Clinic Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Filter Scroller */}
        <div>
          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Specialty Category
          </label>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1 rounded-lg shrink-0 font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#2457A7] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count & Demo Notice */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900">{filteredClinics.length}</strong> verified clinic{filteredClinics.length !== 1 ? 's' : ''} in Isabel, Leyte
        </span>
        <span className="text-[11px] text-slate-400">Sample Demo Data</span>
      </div>

      {/* Clinic Result Cards */}
      {filteredClinics.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-2">
          <Info className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-800">No clinics match your filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your price filter or selecting "All Isabel, Leyte" to see other local health facilities.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedBarangay('All Isabel, Leyte');
              setSelectedCategory('All');
              setPriceFilter('all');
            }}
            className="mt-2 text-xs font-semibold text-[#2457A7] hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredClinics.map((clinic) => (
            <article
              key={clinic.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row"
            >
              {/* Photo Area */}
              <div className="sm:w-52 h-36 sm:h-auto bg-slate-100 relative shrink-0">
                <img
                  src={clinic.image}
                  alt={clinic.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
                  <CheckCircle2 className="w-3 h-3 text-[#27A89A]" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Clinic Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {clinic.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{clinic.address}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-500 block">Starting Fee</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                        {clinic.startingPrice !== null
                          ? clinic.startingPrice === 0
                            ? 'Free / Subsidized'
                            : `₱${clinic.startingPrice.toLocaleString()}`
                          : 'Price not listed'}
                      </span>
                    </div>
                  </div>

                  {/* Services summary with clean typography (No pill boxes!) */}
                  <div className="mt-2 text-[11px] text-slate-600">
                    <span className="font-semibold text-slate-800">Services: </span>
                    <span>
                      {clinic.services
                        .slice(0, 3)
                        .map((s) => s.name)
                        .join(' · ')}
                      {clinic.services.length > 3 && ` · +${clinic.services.length - 3} more`}
                    </span>
                  </div>

                  {/* Hours and recorded availability */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{clinic.hours}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium text-emerald-700">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      <span>Next Slot: {clinic.nextAvailableSlot || 'Availability not updated'}</span>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedClinicId(clinic.id);
                      setPatientTab('clinic-details');
                    }}
                    className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs text-center transition-colors"
                  >
                    View Details & Services
                  </button>
                  <button
                    onClick={() => {
                      setSelectedClinicId(clinic.id);
                      setAppointmentModalOpen(true);
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#2457A7] hover:bg-[#1c4585] text-white font-semibold text-xs text-center shadow-xs transition-colors"
                  >
                    Request Appointment
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
