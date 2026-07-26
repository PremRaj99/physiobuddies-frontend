import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, KeyRound, Lock, Mail } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCurrentUser } from '@/hooks/useUser';
import { useForgotPassword, useResetPassword } from '@/hooks/useAuth';

export const SecurityTab = () => {
  // Step: 'request' -> 'verify' -> 'success'
  const [step, setStep] = useState('request');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { data: userData } = useCurrentUser();
  const email = userData?.data?.email ?? '';

  const forgotPassword = useForgotPassword();
  const resetPassword = useResetPassword();

  const isLoading = forgotPassword.isPending || resetPassword.isPending;

  const handleRequestOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Unable to determine your email. Please try again.');
      return;
    }
    forgotPassword.mutate(
      { email },
      {
        onSuccess: () => setStep('verify'),
        onError: (e: unknown) => {
          const err = e as { response?: { data?: { message?: string } } };
          setError(err.response?.data?.message || 'Could not send the OTP. Please try again.')
        },
      },
    );
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    resetPassword.mutate(
      { email, token: otp, newPassword },
      {
        onSuccess: () => setStep('success'),
        onError: () => setError('Invalid or expired OTP. Please try again.'),
      },
    );
  };

  const resetForm = () => {
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setStep('request');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-[#012a4a]">
            <KeyRound className="h-6 w-6 text-[#014f86]" /> Password & Security
          </CardTitle>
          <CardDescription>Update your password using secure email verification.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="max-w-md">
            <AnimatePresence mode="wait">
              {step === 'request' && (
                <motion.form
                  key="request"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleRequestOTP}
                  className="space-y-6"
                >
                  <div className="bg-secondary/20 flex gap-3 rounded-lg border border-[#a9d6e5]/50 p-4 text-[#012a4a]">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#014f86]" />
                    <p className="text-sm leading-relaxed">
                      To change your password, we will send a One-Time Password (OTP) to your
                      registered email address.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#012a4a]">Registered Email</Label>
                    <div className="relative">
                      <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                      <Input
                        value={email}
                        disabled
                        className="border-gray-200 bg-gray-50 pl-9"
                      />
                    </div>
                  </div>
                  {error && <p className="text-destructive text-sm">{error}</p>}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#014f86] text-white hover:bg-[#013a63]"
                  >
                    {isLoading ? 'Sending...' : 'Send OTP to Email'}
                  </Button>
                </motion.form>
              )}

              {step === 'verify' && (
                <motion.form
                  key="verify"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleVerifyOTP}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-[#012a4a]">
                      Enter OTP
                    </Label>
                    <Input
                      id="otp"
                      placeholder="6-digit code"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="font-mono tracking-widest focus-visible:ring-[#014f86]"
                    />
                    <p className="text-muted-foreground text-xs">
                      Check your spam folder if you don't see it.
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-pwd" className="text-[#012a4a]">
                        New Password
                      </Label>
                      <div className="relative">
                        <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                        <Input
                          id="new-pwd"
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pl-9 focus-visible:ring-[#014f86]"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-pwd" className="text-[#012a4a]">
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                        <Input
                          id="confirm-pwd"
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-9 focus-visible:ring-[#014f86]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep('request')}
                      className="w-full"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#014f86] text-white hover:bg-[#013a63]"
                    >
                      {isLoading ? 'Verifying...' : 'Update Password'}
                    </Button>
                  </div>
                  {error && <p className="text-destructive text-sm">{error}</p>}
                </motion.form>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4 py-8 text-center"
                >
                  <div className="bg-success/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <CheckCircle2 className="text-success h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#012a4a]">
                    Password Updated Successfully
                  </h3>
                  <p className="text-muted-foreground">
                    Your account has been secured with your new password.
                  </p>
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="mt-6 border-[#014f86] text-[#014f86]"
                  >
                    Close
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
