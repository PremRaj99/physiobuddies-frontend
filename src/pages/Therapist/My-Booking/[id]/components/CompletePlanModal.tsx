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

interface CompletePlanModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  beforeImg: string;
  setBeforeImg: (val: string) => void;
  afterImg: string;
  setAfterImg: (val: string) => void;
  finalNotes: string;
  setFinalNotes: (val: string) => void;
  isCompletingPlan: boolean;
  onSubmit: () => void;
}

export const CompletePlanModal = ({
  isOpen,
  onOpenChange,
  beforeImg,
  setBeforeImg,
  afterImg,
  setAfterImg,
  finalNotes,
  setFinalNotes,
  isCompletingPlan,
  onSubmit,
}: CompletePlanModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#012a4a]">Complete Treatment Plan</DialogTitle>
          <DialogDescription>
            Provide before/after therapy records and final recovery notes to close out this plan.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Before Therapy Image URL</Label>
            <Input
              value={beforeImg}
              onChange={(e) => setBeforeImg(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <Label>After Therapy Image URL</Label>
            <Input
              value={afterImg}
              onChange={(e) => setAfterImg(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <Label>Final Improvement & Recovery Summary</Label>
            <Textarea
              value={finalNotes}
              onChange={(e) => setFinalNotes(e.target.value)}
              placeholder="Patient achieved 90% flexibility in left knee with zero pain during weight-bearing..."
              className="min-h-24"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isCompletingPlan}
            className="bg-[#014f86] text-white hover:bg-[#013a63]"
          >
            {isCompletingPlan ? 'Submitting...' : 'Submit & Close Plan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
