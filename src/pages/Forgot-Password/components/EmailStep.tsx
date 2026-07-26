import React from 'react';
import { ArrowLeft, ArrowRight, KeyRound, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

interface EmailStepProps {
  email: string;
  setEmail: (val: string) => void;
  handleEmailSubmit: (e: React.FormEvent) => void;
  isEmailSending: boolean;
  navigate: (path: string) => void;
}

export const EmailStep: React.FC<EmailStepProps> = ({
  email,
  setEmail,
  handleEmailSubmit,
  isEmailSending,
  navigate,
}) => {
  return (
    <form
      onSubmit={handleEmailSubmit}
      className="mx-auto flex h-full w-full max-w-sm flex-col justify-center space-y-6"
    >
      <div className="mb-4 flex justify-center lg:hidden">
        <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
      </div>

      <div className="mb-2 space-y-2 text-center lg:text-left">
        <div className="bg-secondary/50 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full lg:mx-0">
          <KeyRound className="text-primary h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-[#012a4a]">Forgot Password?</h1>
        <p className="text-muted-foreground text-sm">
          Enter your registered email address and we'll send you a 6-digit recovery code.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reset-email" className="text-xs font-medium text-[#012a4a]">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
          <Input
            id="reset-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="akash@example.com"
            className="focus-visible:ring-primary h-10 pl-9"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          disabled={isEmailSending}
          className="bg-primary h-10 w-full text-sm text-white shadow-md transition-all hover:bg-[#013a63]"
        >
          {isEmailSending ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner className="h-4 w-4" /> Sending Code...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Send Recovery Code <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/login')}
          className="text-muted-foreground h-8 w-full text-xs hover:text-[#012a4a]"
        >
          <ArrowLeft className="mr-1 h-3 w-3" /> Back to Login
        </Button>
      </div>
    </form>
  );
};
