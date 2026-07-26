import { Info } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { PhysioBookingSection } from './components/PhysioBookingSection';
import { PhysioInfoTabs } from './components/PhysioInfoTabs';
import { PhysioProfileCard } from './components/PhysioProfileCard';
import { PhysioStickyFooter } from './components/PhysioStickyFooter';
import { usePhysioBooking } from './hooks/usePhysioBooking';
import { usePhysioDetails } from './hooks/usePhysioDetails';

export default function PhysioPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();

  const {
    physio,
    reviews,
    articles,
    faqs,
    availability,
    discountPercentage,
    isLoading,
    isError,
    slotsLoading,
  } = usePhysioDetails(id);

  const {
    activeDate,
    selectedSlot,
    setSelectedSlot,
    slots,
    handleDateSelect,
    handleBook,
    isBooking,
  } = usePhysioBooking(id, availability);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl space-y-6 px-4 pt-12 sm:px-6">
        <Skeleton className="h-72 w-full rounded-3xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !physio) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <Info className="text-primary/40 h-12 w-12" />
        <h2 className="text-2xl font-bold text-[#012a4a]">Physiotherapist not found</h2>
        <p className="text-[#012a4a]/70">This profile may have been removed or is unavailable.</p>
        <Button onClick={() => navigate('/search')} className="bg-primary text-white">
          Back to Search
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background relative min-h-screen pb-24">
      <div className="bg-secondary absolute top-0 right-0 left-0 -z-10 h-72 overflow-hidden rounded-b-[3rem]">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
        <div className="bg-primary/5 absolute top-12 -left-12 h-64 w-64 rounded-full blur-2xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6">
        <PhysioProfileCard physio={physio} />

        <PhysioBookingSection
          availability={availability}
          slotsLoading={slotsLoading}
          activeDate={activeDate}
          selectedSlot={selectedSlot}
          slots={slots}
          onDateSelect={handleDateSelect}
          onSlotSelect={setSelectedSlot}
        />

        <PhysioInfoTabs physio={physio} reviews={reviews} articles={articles} faqs={faqs} />
      </div>

      <PhysioStickyFooter
        physio={physio}
        discountPercentage={discountPercentage}
        selectedSlot={selectedSlot}
        onBook={handleBook}
        isBooking={isBooking}
      />
    </div>
  );
}
