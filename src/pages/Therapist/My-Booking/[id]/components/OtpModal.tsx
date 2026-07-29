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

interface OtpModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  otpInput: string;
  setOtpInput: (val: string) => void;
  devOtpCode: string | null;
  otpError: string | null;
  isVerifyingOtp: boolean;
  onVerify: () => void;
}

export const OtpModal = ({
  isOpen,
  onOpenChange,
  otpInput,
  setOtpInput,
  devOtpCode,
  otpError,
  isVerifyingOtp,
  onVerify,
}: OtpModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#012a4a]">Enter Patient Session OTP</DialogTitle>
          <DialogDescription>
            Ask the patient for the 6-digit verification code sent to their phone/app.
          </DialogDescription>
        </DialogHeader>

        {devOtpCode && (
          <div className="rounded-lg bg-blue-50 p-3 text-xs font-semibold text-blue-700">
            Dev OTP Code: <span className="font-mono text-base">{devOtpCode}</span>
          </div>
        )}

        {otpError && (
          <div className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-600">
            {otpError}
          </div>
        )}

        <div className="space-y-4 py-3">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-[#012a4a]">6-Digit OTP</Label>
            <Input
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              maxLength={6}
              placeholder="e.g. 123456"
              className="text-center font-mono text-xl tracking-widest"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onVerify}
            disabled={isVerifyingOtp || otpInput.length < 6}
            className="bg-[#014f86] text-white hover:bg-[#013a63]"
          >
            {isVerifyingOtp ? 'Verifying...' : 'Verify & Start Session'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
