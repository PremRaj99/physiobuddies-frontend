import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Stethoscope, User, ShieldCheck } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSignup } from './hooks/useSignup';
import { PatientForm } from './components/PatientForm';
import { TherapistForm } from './components/TherapistForm';
import { OtpStep } from './components/OtpStep';

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    role,
    setRole,
    step,
    setStep,
    otp,
    otpRefs,
    patientForm,
    therapistForm,
    registeredEmail,
    isFormSubmitting,
    isOtpVerifying,
    handlePinMap,
    onPatientSubmit,
    onTherapistSubmit,
    handleOtpChange,
    handleOtpKeyDown,
    handleResendOtp,
    handleOtpVerify,
  } = useSignup();

  // Animation variants
  const containerVariants: Variants = {
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
    <div className="bg-background min-h-body flex w-full items-center justify-center px-4 py-4">
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
              Join Our Network of <br /> Clinical Excellence.
            </h2>
            <p className="max-w-md text-sm text-[#014f86]">
              Whether seeking recovery or providing expert care, your journey begins here.
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
              <span className="text-xs font-medium">HIPAA Compliant Security</span>
            </div>
            <div className="flex items-center gap-3 text-[#012a4a]">
              <div className="rounded-lg bg-white p-2 shadow-sm">
                <Stethoscope className="text-primary h-4 w-4" />
              </div>
              <span className="text-xs font-medium">Verified Clinical Specialists</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Dynamic Form Area */}
        <div className="relative flex w-full flex-col justify-center overflow-hidden bg-white p-6 lg:w-7/12 lg:p-8">
          <AnimatePresence mode="wait">
            {/* ================= REGISTRATION STEP ================= */}
            {step === 'form' && (
              <motion.div
                key="form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mx-auto w-full max-w-lg"
              >
                <div className="mb-4 flex justify-center lg:hidden">
                  <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                </div>

                <div className="mb-4 space-y-1 text-center lg:text-left">
                  <h1 className="text-xl font-bold text-[#012a4a]">Create an Account</h1>
                  <p className="text-muted-foreground text-xs">
                    Select your account type to get started
                  </p>
                </div>

                <Tabs
                  value={role}
                  onValueChange={(val) => setRole(val as 'patient' | 'therapist')}
                  className="w-full"
                >
                  <TabsList className="bg-muted mb-5 grid h-9 w-full grid-cols-2">
                    <TabsTrigger
                      value="patient"
                      className="data-[state=active]:text-primary text-xs data-[state=active]:bg-white"
                    >
                      <User className="mr-2 h-3.5 w-3.5" /> Patient
                    </TabsTrigger>
                    <TabsTrigger
                      value="therapist"
                      className="data-[state=active]:text-primary text-xs data-[state=active]:bg-white"
                    >
                      <Stethoscope className="mr-2 h-3.5 w-3.5" /> Therapist
                    </TabsTrigger>
                  </TabsList>

                  {/* Patient Form */}
                  <TabsContent value="patient" className="mt-0 space-y-3">
                    <PatientForm
                      patientForm={patientForm}
                      onPatientSubmit={onPatientSubmit}
                      isFormSubmitting={isFormSubmitting}
                    />
                  </TabsContent>

                  {/* Therapist Form */}
                  <TabsContent value="therapist" className="mt-0 space-y-3">
                    <TherapistForm
                      therapistForm={therapistForm}
                      onTherapistSubmit={onTherapistSubmit}
                      isFormSubmitting={isFormSubmitting}
                      handlePinMap={handlePinMap}
                    />
                  </TabsContent>
                </Tabs>

                <div className="pt-4 text-center">
                  <p className="text-muted-foreground text-xs">
                    Already have an account?{' '}
                    <Button
                      variant="link"
                      onClick={() => navigate('/login')}
                      className="text-primary h-auto p-0 font-semibold hover:text-[#013a63]"
                    >
                      Sign in instead
                    </Button>
                  </p>
                </div>
              </motion.div>
            )}

            {/* ================= OTP VERIFICATION STEP ================= */}
            {step === 'otp' && (
              <motion.div
                key="otp"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mx-auto flex h-full w-full max-w-sm flex-col justify-center"
              >
                <OtpStep
                  otp={otp}
                  otpRefs={otpRefs}
                  registeredEmail={registeredEmail}
                  isFormSubmitting={isFormSubmitting}
                  isOtpVerifying={isOtpVerifying}
                  handleOtpChange={handleOtpChange}
                  handleOtpKeyDown={handleOtpKeyDown}
                  handleOtpVerify={handleOtpVerify}
                  handleResendOtp={handleResendOtp}
                  setStep={setStep}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
