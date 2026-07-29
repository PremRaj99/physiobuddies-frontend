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
import { Textarea } from '@/components/ui/textarea';

interface RescheduleModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  rescheduleDate: string;
  setRescheduleDate: (date: string) => void;
  rescheduleHour: number;
  setRescheduleHour: (hour: number) => void;
  rescheduleReason: string;
  setRescheduleReason: (reason: string) => void;
  isRescheduling: boolean;
  onSubmit: () => void;
}

export const RescheduleModal = ({
  isOpen,
  onOpenChange,
  rescheduleDate,
  setRescheduleDate,
  rescheduleHour,
  setRescheduleHour,
  rescheduleReason,
  setRescheduleReason,
  isRescheduling,
  onSubmit,
}: RescheduleModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reschedule Time Slot</DialogTitle>
          <DialogDescription>
            Select a new date and hour for this session. A trail log will be stored.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>New Date</Label>
            <Input
              type="date"
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Start Hour (6 to 21)</Label>
            <Input
              type="number"
              min={6}
              max={21}
              value={rescheduleHour}
              onChange={(e) => setRescheduleHour(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Reason for Reschedule</Label>
            <Textarea
              value={rescheduleReason}
              onChange={(e) => setRescheduleReason(e.target.value)}
              placeholder="Optional note explaining the reschedule..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isRescheduling} className="bg-[#014f86] text-white">
            {isRescheduling ? 'Rescheduling...' : 'Confirm Reschedule'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
