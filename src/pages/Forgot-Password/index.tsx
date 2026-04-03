import { AnimatePresence, motion, type Variants } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import React, { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Step = 'email' | 'otp' | 'password' | 'success';

const ForgotPasswordPage = () => {
  // Navigation State
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');

  // OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handlers
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) setStep('password');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirmPassword) {
      setStep('success');
    }
  };

  // Animation Variants
  const slideVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  } as const;

  return (
    <div className="bg-background flex min-h-[calc(100vh-80px)] w-full items-center justify-center px-4 py-4">
      <div className="border-border flex w-full max-w-5xl overflow-hidden bg-white md:rounded-2xl md:border md:shadow-lg">
        {/* Left Side: Decorative Panel */}
        <div className="bg-secondary relative hidden w-5/12 flex-col justify-between overflow-hidden p-8 lg:flex">
          <div className="absolute top-[-10%] right-[-10%] h-64 w-64 rounded-full bg-[#014f86]/5 blur-3xl" />
          <div className="absolute bottom-[-5%] left-[-5%] h-48 w-48 rounded-full bg-[#013a63]/10 blur-2xl" />

          <motion.div {...fadeIn} className="relative z-10">
            <div className="mb-6 flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            </div>
            <h2 className="mb-2 text-2xl leading-tight font-bold text-[#012a4a]">
              Secure Password <br /> Recovery.
            </h2>
            <p className="max-w-md text-sm text-[#014f86]">
              Regain access to your clinical dashboard and personalized wellness plans safely and
              securely.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3 text-[#012a4a]">
              <div className="rounded-lg bg-white p-2 shadow-sm">
                <ShieldCheck className="text-primary h-4 w-4" />
              </div>
              <span className="text-xs font-medium">Encrypted Data Protection</span>
            </div>
            <div className="flex items-center gap-3 text-[#012a4a]">
              <div className="rounded-lg bg-white p-2 shadow-sm">
                <KeyRound className="text-primary h-4 w-4" />
              </div>
              <span className="text-xs font-medium">Multi-Factor Verification</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Dynamic Multi-Step Form */}
        <div className="relative flex w-full flex-col justify-center overflow-hidden bg-white p-6 lg:w-7/12 lg:p-8">
          <AnimatePresence mode="wait">
            {/* ================= STEP 1: EMAIL ================= */}
            {step === 'email' && (
              <motion.form
                key="email"
                onSubmit={handleEmailSubmit}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
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
                    className="bg-primary h-10 w-full text-sm text-white shadow-md transition-all hover:bg-[#013a63]"
                  >
                    Send Recovery Code <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    className="text-muted-foreground h-8 w-full text-xs hover:text-[#012a4a]"
                  >
                    <ArrowLeft className="mr-1 h-3 w-3" /> Back to Login
                  </Button>
                </div>
              </motion.form>
            )}

            {/* ================= STEP 2: OTP ================= */}
            {step === 'otp' && (
              <motion.form
                key="otp"
                onSubmit={handleOtpSubmit}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
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
                    className="bg-primary h-10 w-full text-white shadow-md transition-all hover:bg-[#013a63]"
                  >
                    Verify Code
                  </Button>

                  <div className="flex flex-col space-y-1 text-center">
                    <Button
                      type="button"
                      variant="link"
                      className="text-primary h-auto p-0 text-xs font-semibold hover:text-[#013a63]"
                    >
                      Resend Code
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
              </motion.form>
            )}

            {/* ================= STEP 3: NEW PASSWORD ================= */}
            {step === 'password' && (
              <motion.form
                key="password"
                onSubmit={handlePasswordSubmit}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
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
                    <Label
                      htmlFor="confirm-password"
                      className="text-xs font-medium text-[#012a4a]"
                    >
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
                  className="h-10 w-full bg-[#013a63] text-white shadow-md transition-all hover:bg-[#012a4a]"
                >
                  Update Password <RefreshCw className="ml-2 h-3.5 w-3.5" />
                </Button>
              </motion.form>
            )}

            {/* ================= STEP 4: SUCCESS ================= */}
            {step === 'success' && (
              <motion.div
                key="success"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mx-auto flex h-full w-full max-w-sm flex-col items-center justify-center space-y-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="bg-success/10 mb-2 flex h-20 w-20 items-center justify-center rounded-full"
                >
                  <CheckCircle2 className="text-success h-10 w-10" />
                </motion.div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-[#012a4a]">Password Updated!</h2>
                  <p className="text-muted-foreground text-sm">
                    Your account has been secured with your new password. You can now log in.
                  </p>
                </div>

                <Button className="bg-primary mt-4 h-10 w-full text-white shadow-md transition-all hover:bg-[#013a63]">
                  Return to Login
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
