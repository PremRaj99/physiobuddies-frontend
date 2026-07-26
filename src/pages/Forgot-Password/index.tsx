import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { KeyRound, ShieldCheck } from 'lucide-react';
import { EmailStep } from './components/EmailStep';
import { OtpStep } from './components/OtpStep';
import { PasswordStep } from './components/PasswordStep';
import { SuccessStep } from './components/SuccessStep';
import { useForgotPasswordPage } from './hooks/useForgotPasswordPage';

const ForgotPasswordPage = () => {
  const {
    step,
    setStep,
    email,
    setEmail,
    otp,
    otpRefs,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isEmailSending,
    isOtpVerifying,
    isPasswordUpdating,
    handleEmailSubmit,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpSubmit,
    handleResendOtp,
    handlePasswordSubmit,
    navigate,
  } = useForgotPasswordPage();

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
              <motion.div
                key="email"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <EmailStep
                  email={email}
                  setEmail={setEmail}
                  handleEmailSubmit={handleEmailSubmit}
                  isEmailSending={isEmailSending}
                  navigate={navigate}
                />
              </motion.div>
            )}

            {/* ================= STEP 2: OTP ================= */}
            {step === 'otp' && (
              <motion.div
                key="otp"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <OtpStep
                  otp={otp}
                  otpRefs={otpRefs}
                  email={email}
                  isOtpVerifying={isOtpVerifying}
                  isEmailSending={isEmailSending}
                  handleOtpChange={handleOtpChange}
                  handleOtpKeyDown={handleOtpKeyDown}
                  handleOtpSubmit={handleOtpSubmit}
                  handleResendOtp={handleResendOtp}
                  setStep={setStep}
                />
              </motion.div>
            )}

            {/* ================= STEP 3: NEW PASSWORD ================= */}
            {step === 'password' && (
              <motion.div
                key="password"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <PasswordStep
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  handlePasswordSubmit={handlePasswordSubmit}
                  isPasswordUpdating={isPasswordUpdating}
                />
              </motion.div>
            )}

            {/* ================= STEP 4: SUCCESS ================= */}
            {step === 'success' && (
              <motion.div
                key="success"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <SuccessStep navigate={navigate} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
