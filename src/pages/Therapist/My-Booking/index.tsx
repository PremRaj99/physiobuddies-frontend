'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BookingEmptyState, BookingFilterBar } from '@/components/my-booking';
import PageHeader from '@/components/custom/page-header/page-header';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TherapistBookingCard } from './components/TherapistBookingCard';
import { useTherapistBookingList } from './hooks/useTherapistBookingList';

const THERAPIST_TABS = [
  { value: 'ALL', label: 'All' },
  { value: 'TODAY', label: 'Today' },
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

export default function TherapistBookingListPage() {
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
  } = useTherapistBookingList();

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveTab('ALL');
    setModeFilter('ALL');
  };

  return (
    <div className="bg-background min-h-screen pb-24 font-sans">
      <PageHeader
        heading={
          <span>
            Treatment Session <span className="text-[#a9d6e5]">Manager</span>
          </span>
        }
        subheading="Track patient sessions, monitor progress, or review past therapy sessions."
      />

      <div className="relative z-20 mx-auto -mt-12 max-w-5xl px-4 sm:px-6">
        <BookingFilterBar
          tabs={THERAPIST_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search patient name..."
          modeFilter={modeFilter}
          onModeFilterChange={setModeFilter}
        />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-border p-6 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <Skeleton className="h-12 w-48" />
                    <Skeleton className="h-12 w-40" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredBookings.length > 0 ? (
            <motion.div
              key={activeTab + modeFilter + searchQuery}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {filteredBookings.map((booking) => (
                <motion.div key={booking.id} variants={itemVariants}>
                  <TherapistBookingCard
                    booking={booking}
                    onNavigate={(id) => navigate(`/therapist/my-bookings/${id}`)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <BookingEmptyState onClearFilters={handleClearFilters} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
