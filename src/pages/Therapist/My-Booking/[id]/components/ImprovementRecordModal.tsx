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

interface ImprovementRecordModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  painBefore: number;
  setPainBefore: (val: number) => void;
  painAfter: number;
  setPainAfter: (val: number) => void;
  improvementNotes: string;
  setImprovementNotes: (val: string) => void;
  exercisesGiven: string;
  setExercisesGiven: (val: string) => void;
  isSubmittingImprovement: boolean;
  onSubmit: () => void;
}

export const ImprovementRecordModal = ({
  isOpen,
  onOpenChange,
  painBefore,
  setPainBefore,
  painAfter,
  setPainAfter,
  improvementNotes,
  setImprovementNotes,
  exercisesGiven,
  setExercisesGiven,
  isSubmittingImprovement,
  onSubmit,
}: ImprovementRecordModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#012a4a]">Session Improvement Record</DialogTitle>
          <DialogDescription>
            Record patient pain score reduction, clinical notes, and assigned exercises to complete
            this session.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Pain Score Before (0-10)</Label>
              <Input
                type="number"
                min={0}
                max={10}
                value={painBefore}
                onChange={(e) => setPainBefore(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Pain Score After (0-10)</Label>
              <Input
                type="number"
                min={0}
                max={10}
                value={painAfter}
                onChange={(e) => setPainAfter(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Improvement Notes & Summary</Label>
            <Textarea
              value={improvementNotes}
              onChange={(e) => setImprovementNotes(e.target.value)}
              placeholder="Describe patient progress, mobility improvements, or discomfort experienced..."
              className="min-h-24"
            />
          </div>
          <div className="space-y-2">
            <Label>Exercises Assigned (Comma-separated)</Label>
            <Input
              value={exercisesGiven}
              onChange={(e) => setExercisesGiven(e.target.value)}
              placeholder="e.g. Quadriceps Sets, Heel Slides, Straight Leg Raises"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmittingImprovement}
            className="bg-[#014f86] text-white hover:bg-[#013a63]"
          >
            {isSubmittingImprovement ? 'Saving...' : 'Submit & Complete Session'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
