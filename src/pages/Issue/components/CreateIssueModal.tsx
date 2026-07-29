import React, { type FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CreateIssueModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  topic: string;
  setTopic: (val: string) => void;
  desc: string;
  setDesc: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
}

export const CreateIssueModal: React.FC<CreateIssueModalProps> = ({
  isOpen,
  onOpenChange,
  topic,
  setTopic,
  desc,
  setDesc,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#014f86] text-white hover:bg-[#013a63]">
          <Plus className="mr-2 h-4 w-4" /> Raise New Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg rounded-2xl bg-white p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#012a4a]">
            Submit Support Request
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Describe your issue and our clinical ops team will investigate.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-[#012a4a]">Topic</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger className="border-border bg-slate-50/50">
                <SelectValue placeholder="Select topic category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Booking & Scheduling">Booking & Scheduling</SelectItem>
                <SelectItem value="Payment & Refunds">Payment & Refunds</SelectItem>
                <SelectItem value="Therapist Conduct">Therapist Conduct</SelectItem>
                <SelectItem value="Technical Issue">Technical Issue</SelectItem>
                <SelectItem value="Other Inquiry">Other Inquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-[#012a4a]">Description</Label>
            <Textarea
              placeholder="Provide relevant details, booking IDs, or symptoms..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border-border min-h-28 bg-slate-50/50 text-sm"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !topic.trim() || !desc.trim()}
              className="bg-[#014f86] text-white hover:bg-[#013a63]"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
