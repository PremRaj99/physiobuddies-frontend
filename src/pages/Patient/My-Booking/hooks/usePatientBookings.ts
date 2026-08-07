import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { TreatmentMode, TreatmentStatus } from '@/components/my-booking';
import { usePatientMyBookings } from '@/hooks/usePatient';
import type { PatientBookingRecord } from '@/services/patient.service';

export type { TreatmentMode, TreatmentStatus };

export function usePatientBookings() {
  const navigate = useNavigate();
  const { data: bookings = [], isLoading } = usePatientMyBookings();

  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [modeFilter, setModeFilter] = useState<string>('ALL');

  const filteredBookings = (bookings as PatientBookingRecord[]).filter(
    (booking: PatientBookingRecord) => {
      const matchesTab = activeTab === 'ALL' || booking.status === activeTab;
      const matchesMode = modeFilter === 'ALL' || booking.treatmentMode === modeFilter;
      const matchesSearch =
        (booking.therapistName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (booking.id || '').toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesMode && matchesSearch;
    },
  );

  return {
    navigate,
    isLoading,
    bookings,
    filteredBookings,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    modeFilter,
    setModeFilter,
  };
}
