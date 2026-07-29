import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { ApiResponse } from '@/services';
import type { SeeMoreSlotsResponse } from '@/services/treatmentSession.service';

interface BookMoreModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  bookMoreDate: string;
  setBookMoreDate: (date: string) => void;
  bookMoreHour: number;
  setBookMoreHour: (hour: number) => void;
  seeMoreSlotsRes?: ApiResponse<SeeMoreSlotsResponse> | null;
  isBookingMore: boolean;
  onSubmit: () => void;
}

export const BookMoreModal = ({
  isOpen,
  onOpenChange,
  bookMoreDate,
  setBookMoreDate,
  bookMoreHour,
  setBookMoreHour,
  seeMoreSlotsRes,
  isBookingMore,
  onSubmit,
}: BookMoreModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#012a4a]">Book Follow-Up Session</DialogTitle>
          <DialogDescription>
            Add a follow-up session to your existing treatment plan according to clinical
            recommendations.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Session Date</Label>
            <Input
              type="date"
              value={bookMoreDate}
              onChange={(e) => setBookMoreDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Start Hour (6 to 21)</Label>
            <Input
              type="number"
              min={6}
              max={21}
              value={bookMoreHour}
              onChange={(e) => setBookMoreHour(Number(e.target.value))}
            />
          </div>
          {seeMoreSlotsRes?.data?.visitFrequency && (
            <div className="rounded-md bg-blue-50 p-3 text-xs text-blue-700">
              Therapist recommendation: {seeMoreSlotsRes.data.visitFrequency}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isBookingMore}
            className="bg-[#014f86] text-white hover:bg-[#013a63]"
          >
            {isBookingMore ? 'Booking...' : 'Book Follow-Up Session'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
