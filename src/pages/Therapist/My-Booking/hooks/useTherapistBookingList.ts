import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import type { TreatmentMode, TreatmentStatus } from '@/components/my-booking';
import { useTherapistBookings } from '@/hooks/useTherapist';

export type { TreatmentMode, TreatmentStatus };

export function useTherapistBookingList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [modeFilter, setModeFilter] = useState<string>('ALL');

  const { data: bookingsRes, isLoading } = useTherapistBookings();
  const bookings = useMemo(() => bookingsRes?.data ?? [], [bookingsRes]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesTab =
        activeTab === 'ALL' ||
        (activeTab === 'UPCOMING' &&
          (booking.status === 'UPCOMING' || booking.status === 'PENDING')) ||
        (activeTab === 'PAST' &&
          (booking.status === 'COMPLETED' || booking.status === 'CANCELLED'));

      const matchesMode = modeFilter === 'ALL' || booking.treatmentMode === modeFilter;
      const matchesSearch = (booking.patientName || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesTab && matchesMode && matchesSearch;
    });
  }, [bookings, activeTab, modeFilter, searchQuery]);

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
