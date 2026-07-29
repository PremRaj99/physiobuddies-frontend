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

interface AddDocumentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  docName: string;
  setDocName: (name: string) => void;
  docUrl: string;
  setDocUrl: (url: string) => void;
  docFileType: string;
  setDocFileType: (type: string) => void;
  isAddingDocs: boolean;
  onSubmit: () => void;
}

export const AddDocumentModal = ({
  isOpen,
  onOpenChange,
  docName,
  setDocName,
  docUrl,
  setDocUrl,
  docFileType,
  setDocFileType,
  isAddingDocs,
  onSubmit,
}: AddDocumentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Clinical Document</DialogTitle>
          <DialogDescription>
            Attach reports, prescriptions, or clinical notes to this treatment plan.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Document Name</Label>
            <Input
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="e.g. Assessment Report / ACL Recovery Plan"
            />
          </div>
          <div className="space-y-2">
            <Label>Document URL</Label>
            <Input
              value={docUrl}
              onChange={(e) => setDocUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <Label>File Type</Label>
            <Input
              value={docFileType}
              onChange={(e) => setDocFileType(e.target.value)}
              placeholder="pdf / image"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isAddingDocs} className="bg-[#014f86] text-white">
            {isAddingDocs ? 'Saving...' : 'Save Document'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
