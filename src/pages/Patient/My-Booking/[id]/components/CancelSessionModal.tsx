import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CancelSessionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cancelReason: string;
  setCancelReason: (reason: string) => void;
  isCancelling: boolean;
  onSubmit: () => void;
}

export const CancelSessionModal = ({
  isOpen,
  onOpenChange,
  cancelReason,
  setCancelReason,
  isCancelling,
  onSubmit,
}: CancelSessionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-700">Cancel Therapy Session</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this scheduled session? Please provide a reason.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-3">
          <div className="space-y-2">
            <Label>Reason for Cancellation</Label>
            <Textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="e.g. Personal emergency / Feeling unwell"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Keep Session
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isCancelling}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isCancelling ? 'Cancelling...' : 'Confirm Cancel'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
