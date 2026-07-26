import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { TherapistDetail } from '@/services/therapist.service';
import type { TimeSlot } from '../types';

interface PhysioStickyFooterProps {
  physio: TherapistDetail;
  discountPercentage: number;
  selectedSlot: TimeSlot | null;
  onBook: () => void;
  isBooking?: boolean;
}

export function PhysioStickyFooter({
  physio,
  discountPercentage,
  selectedSlot,
  onBook,
  isBooking = false,
}: PhysioStickyFooterProps) {
  return (
    <div className="border-border fixed right-0 bottom-0 left-0 z-50 border-t bg-white shadow-[0_-10px_30px_rgba(1,42,74,0.05)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row sm:px-6">
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">
          <div className="flex flex-col">
            {physio.originalPrice && physio.originalPrice > physio.discountedPrice && (
              <span className="text-muted-foreground text-sm font-medium line-through">
                ₹{physio.originalPrice}
              </span>
            )}
            <span className="text-2xl font-bold text-[#012a4a]">₹{physio.discountedPrice}</span>
          </div>
          {discountPercentage > 0 && (
            <Badge variant="default" className="bg-[#10b981] text-white hover:bg-[#10b981]">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>

        <Button
          size="lg"
          disabled={!selectedSlot || isBooking}
          onClick={onBook}
          className={`h-12 w-full text-base font-bold transition-all sm:w-64 ${
            selectedSlot
              ? 'bg-primary text-primary-foreground shadow-primary/25 shadow-lg hover:bg-[#013a63]'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {isBooking
            ? 'Reserving Slot...'
            : selectedSlot
              ? 'Book Appointment'
              : 'Select a Time Slot'}
        </Button>
      </div>
    </div>
  );
}
