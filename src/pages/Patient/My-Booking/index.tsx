'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { BookingEmptyState, BookingFilterBar } from '@/components/my-booking';
import PageHeader from '@/components/custom/page-header/page-header';
import type { PatientBookingRecord } from '@/services/patient.service';
import { PatientBookingCard } from './components/PatientBookingCard';
import { usePatientBookings } from './hooks/usePatientBookings';

const PATIENT_TABS = [
  { value: 'ALL', label: 'All' },
  { value: 'UPCOMING', label: 'Upcoming' },
  { value: 'PAST', label: 'Past' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
} as const;

export default function PatientBookingListPage() {
  const {
    navigate,
    isLoading,
    filteredBookings,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    modeFilter,
    setModeFilter,
  } = usePatientBookings();

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveTab('ALL');
    setModeFilter('ALL');
  };

  return (
    <div className="bg-background min-h-screen pb-24 font-sans">
      <PageHeader
        heading={
          <>
            My Treatment <span className="text-[#a9d6e5]">Sessions</span>
          </>
        }
        subheading="View and manage your upcoming appointments, or review past therapy sessions."
      />

      <div className="relative z-20 mx-auto -mt-12 max-w-5xl px-4 sm:px-6">
        <BookingFilterBar
          tabs={PATIENT_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search doctor..."
          modeFilter={modeFilter}
          onModeFilterChange={setModeFilter}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#014f86]" />
            <p className="text-muted-foreground mt-4 text-sm">Loading your bookings...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredBookings.length > 0 ? (
              <motion.div
                key={activeTab + modeFilter + searchQuery}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                {filteredBookings.map((booking: PatientBookingRecord) => (
                  <motion.div key={booking.id} variants={itemVariants}>
                    <PatientBookingCard
                      booking={booking}
                      onNavigate={(id) => navigate(`/patient/my-bookings/${id}`)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <BookingEmptyState onClearFilters={handleClearFilters} />
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
