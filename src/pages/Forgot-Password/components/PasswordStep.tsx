import React from 'react';
import { Lock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

interface PasswordStepProps {
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  handlePasswordSubmit: (e: React.FormEvent) => void;
  isPasswordUpdating: boolean;
}

export const PasswordStep: React.FC<PasswordStepProps> = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handlePasswordSubmit,
  isPasswordUpdating,
}) => {
  return (
    <form
      onSubmit={handlePasswordSubmit}
      className="mx-auto flex h-full w-full max-w-sm flex-col justify-center space-y-6"
    >
      <div className="mb-2 space-y-2 text-center lg:text-left">
        <div className="bg-secondary/50 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full lg:mx-0">
          <Lock className="text-primary h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#012a4a]">Reset Password</h2>
        <p className="text-muted-foreground text-sm">
          Please create a new, strong password for your clinical account.
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="new-password" className="text-xs font-medium text-[#012a4a]">
            New Password
          </Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
            <Input
              id="new-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="focus-visible:ring-primary h-10 pl-9"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm-password" className="text-xs font-medium text-[#012a4a]">
            Confirm New Password
          </Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
            <Input
              id="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="focus-visible:ring-primary h-10 pl-9"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPasswordUpdating}
        className="h-10 w-full bg-[#013a63] text-white shadow-md transition-all hover:bg-[#012a4a]"
      >
        {isPasswordUpdating ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner className="h-4 w-4 animate-spin" /> Updating...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Update Password <RefreshCw className="ml-2 h-3.5 w-3.5" />
          </span>
        )}
      </Button>
    </form>
  );
};
