import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import type { Step } from '../hooks/useForgotPasswordPage';

interface OtpStepProps {
  otp: string[];
  otpRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  email: string;
  isOtpVerifying: boolean;
  isEmailSending: boolean;
  handleOtpChange: (index: number, value: string) => void;
  handleOtpKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOtpSubmit: (e: React.FormEvent) => void;
  handleResendOtp: () => void;
  setStep: (step: Step) => void;
}

export const OtpStep: React.FC<OtpStepProps> = ({
  otp,
  otpRefs,
  email,
  isOtpVerifying,
  isEmailSending,
  handleOtpChange,
  handleOtpKeyDown,
  handleOtpSubmit,
  handleResendOtp,
  setStep,
}) => {
  return (
    <form
      onSubmit={handleOtpSubmit}
      className="mx-auto flex h-full w-full max-w-sm flex-col justify-center space-y-6"
    >
      <div className="mb-2 space-y-2 text-center">
        <div className="bg-secondary/50 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <ShieldCheck className="text-primary h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#012a4a]">Verify Identity</h2>
        <p className="text-muted-foreground text-sm">
          Enter the 6-digit code sent to <br />
          <span className="font-semibold text-[#014f86]">{email || 'your email'}</span>
        </p>
      </div>

      <div className="flex justify-between gap-2">
        {otp.map((digit, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            required
            value={digit}
            ref={(el) => {
              otpRefs.current[index] = el;
            }}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
            className="border-border focus-visible:ring-primary h-14 w-12 rounded-md text-center text-lg font-bold text-[#012a4a] shadow-sm focus-visible:ring-2"
          />
        ))}
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          disabled={isOtpVerifying}
          className="bg-primary h-10 w-full text-white shadow-md transition-all hover:bg-[#013a63]"
        >
          {isOtpVerifying ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner className="h-4 w-4 animate-spin" /> Verifying...
            </span>
          ) : (
            'Verify Code'
          )}
        </Button>

        <div className="flex flex-col space-y-1 text-center">
          <Button
            type="button"
            variant="link"
            onClick={handleResendOtp}
            disabled={isEmailSending}
            className="text-primary h-auto p-0 text-xs font-semibold hover:text-[#013a63]"
          >
            {isEmailSending ? 'Resending...' : 'Resend Code'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep('email')}
            className="text-muted-foreground mx-auto flex h-8 items-center text-xs hover:text-[#012a4a]"
          >
            <ArrowLeft className="mr-1 h-3 w-3" /> Change Email
          </Button>
        </div>
      </div>
    </form>
  );
};
