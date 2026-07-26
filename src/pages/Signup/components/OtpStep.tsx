import React from 'react';
import { KeyRound, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

interface OtpStepProps {
  otp: string[];
  otpRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  registeredEmail: string | null;
  isFormSubmitting: boolean;
  isOtpVerifying: boolean;
  handleOtpChange: (index: number, value: string) => void;
  handleOtpKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOtpVerify: () => void;
  handleResendOtp: () => void;
  setStep: (step: 'form' | 'otp') => void;
}

export const OtpStep: React.FC<OtpStepProps> = ({
  otp,
  otpRefs,
  registeredEmail,
  isFormSubmitting,
  isOtpVerifying,
  handleOtpChange,
  handleOtpKeyDown,
  handleOtpVerify,
  handleResendOtp,
  setStep,
}) => {
  return (
    <div className="mx-auto flex h-full w-full max-w-sm flex-col justify-center">
      <div className="mb-8 space-y-4 text-center">
        <div className="bg-secondary/50 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <KeyRound className="text-primary h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#012a4a]">Secure Verification</h2>
        <p className="text-muted-foreground text-sm">
          We've sent a 6-digit clinical access code to <br />
          <span className="font-semibold text-[#014f86]">{registeredEmail || 'your email'}</span>.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
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

        <Button
          onClick={handleOtpVerify}
          disabled={isOtpVerifying}
          className="bg-primary h-11 w-full text-white shadow-md transition-all hover:bg-[#013a63]"
        >
          {isOtpVerifying ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner className="h-4 w-4 animate-spin" /> Verifying...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Verify & Access Dashboard <ShieldCheck className="h-4 w-4" />
            </span>
          )}
        </Button>

        <div className="flex flex-col space-y-2 pt-2 text-center">
          <p className="text-muted-foreground text-xs">
            Didn't receive the code?{' '}
            <Button
              variant="link"
              onClick={handleResendOtp}
              disabled={isFormSubmitting}
              className="text-primary h-auto p-0 font-semibold hover:text-[#013a63]"
            >
              {isFormSubmitting ? 'Resending...' : 'Resend Code'}
            </Button>
          </p>
          <Button
            variant="ghost"
            onClick={() => setStep('form')}
            className="text-muted-foreground mx-auto flex h-8 items-center text-xs hover:text-[#012a4a]"
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            Back to Registration
          </Button>
        </div>
      </div>
    </div>
  );
};
