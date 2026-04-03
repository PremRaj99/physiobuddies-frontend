import { AnimatePresence, motion, type Variants } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Globe,
  Home as HomeIcon,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  User,
} from 'lucide-react';
import React, { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SignupPage = () => {
  // State to manage the current view
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [registeredEmail, setRegisteredEmail] = useState('akash@example.com');

  // OTP State & Logic
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Auto-revert to previous input on backspace
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate and trigger the API call here
    setStep('otp');
  };

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

                <Tabs defaultValue="patient" className="w-full">
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
                    <form onSubmit={handleRegistrationSubmit}>
                      <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="space-y-1">
                          <Label
                            htmlFor="patient-name"
                            className="text-xs font-medium text-[#012a4a]"
                          >
                            Full Name
                          </Label>
                          <div className="relative">
                            <User className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                            <Input
                              id="patient-name"
                              required
                              placeholder="Akash Yadav"
                              className="focus-visible:ring-primary h-9 pl-9"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label
                            htmlFor="patient-phone"
                            className="text-xs font-medium text-[#012a4a]"
                          >
                            Phone Number
                          </Label>
                          <div className="relative">
                            <Phone className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                            <Input
                              id="patient-phone"
                              type="tel"
                              required
                              placeholder="+91 98765 43210"
                              className="focus-visible:ring-primary h-9 pl-9"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 space-y-1">
                        <Label
                          htmlFor="patient-email"
                          className="text-xs font-medium text-[#012a4a]"
                        >
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                          <Input
                            id="patient-email"
                            type="email"
                            required
                            onChange={(e) => setRegisteredEmail(e.target.value)}
                            placeholder="akash@example.com"
                            className="focus-visible:ring-primary h-9 pl-9"
                          />
                        </div>
                      </div>

                      <div className="mb-3 space-y-1">
                        <Label
                          htmlFor="patient-password"
                          className="text-xs font-medium text-[#012a4a]"
                        >
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                          <Input
                            id="patient-password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="focus-visible:ring-primary h-9 pl-9"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="bg-primary mt-4 h-10 w-full text-sm text-white shadow-md transition-all hover:bg-[#013a63]"
                      >
                        Create Patient Account <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Therapist Form */}
                  <TabsContent value="therapist" className="mt-0 space-y-3">
                    <form onSubmit={handleRegistrationSubmit}>
                      <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="space-y-1">
                          <Label
                            htmlFor="therapist-name"
                            className="text-xs font-medium text-[#012a4a]"
                          >
                            Full Name
                          </Label>
                          <div className="relative">
                            <Stethoscope className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                            <Input
                              id="therapist-name"
                              required
                              placeholder="Dr. John Doe"
                              className="focus-visible:ring-primary h-9 pl-9"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label
                            htmlFor="therapist-mobile"
                            className="text-xs font-medium text-[#012a4a]"
                          >
                            Mobile Number
                          </Label>
                          <div className="relative">
                            <Phone className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                            <Input
                              id="therapist-mobile"
                              type="tel"
                              required
                              placeholder="+91 98765 43210"
                              className="focus-visible:ring-primary h-9 pl-9"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-1">
                        <div className="space-y-1">
                          <Label
                            htmlFor="therapist-email"
                            className="text-xs font-medium text-[#012a4a]"
                          >
                            Email Address
                          </Label>
                          <div className="relative">
                            <Mail className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                            <Input
                              id="therapist-email"
                              type="email"
                              required
                              onChange={(e) => setRegisteredEmail(e.target.value)}
                              placeholder="doctor@clinic.com"
                              className="focus-visible:ring-primary h-9 pl-9"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="space-y-1">
                          <Label className="text-xs font-medium text-[#012a4a]">Gender</Label>
                          <Select required>
                            <SelectTrigger className="focus:ring-primary h-9 w-full">
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs font-medium text-[#012a4a]">
                            Primary Practice
                          </Label>
                          <Select required>
                            <SelectTrigger className="focus:ring-primary h-9 w-full">
                              <SelectValue placeholder="Select Mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="clinic">
                                <span className="flex items-center gap-2">
                                  <Building2 className="h-3.5 w-3.5" /> Clinic
                                </span>
                              </SelectItem>
                              <SelectItem value="home_visit">
                                <span className="flex items-center gap-2">
                                  <HomeIcon className="h-3.5 w-3.5" /> Home Visit
                                </span>
                              </SelectItem>
                              <SelectItem value="online">
                                <span className="flex items-center gap-2">
                                  <Globe className="h-3.5 w-3.5" /> Online
                                </span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="bg-secondary/30 border-border mb-3 space-y-1.5 rounded-lg border p-3">
                        <Label
                          htmlFor="display-address"
                          className="text-xs font-medium text-[#012a4a]"
                        >
                          Base Location
                        </Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <MapPin className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                            <Input
                              id="display-address"
                              required
                              placeholder="123 Wellness Ave, City"
                              className="focus-visible:ring-primary h-9 bg-white pl-9 text-sm"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-primary text-primary hover:bg-primary/10 h-9 shrink-0"
                          >
                            <MapPin className="mr-1.5 h-3.5 w-3.5" /> Pin Map
                          </Button>
                        </div>
                      </div>

                      <div className="mb-3 space-y-1">
                        <Label
                          htmlFor="therapist-password"
                          className="text-xs font-medium text-[#012a4a]"
                        >
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                          <Input
                            id="therapist-password"
                            required
                            type="password"
                            placeholder="••••••••"
                            className="focus-visible:ring-primary h-9 pl-9"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="mt-4 h-10 w-full bg-[#013a63] text-sm text-white shadow-md transition-all hover:bg-[#012a4a]"
                      >
                        Register as Therapist <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="pt-4 text-center">
                  <p className="text-muted-foreground text-xs">
                    Already have an account?{' '}
                    <Button
                      variant="link"
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
                <div className="mb-8 space-y-4 text-center">
                  <div className="bg-secondary/50 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <KeyRound className="text-primary h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#012a4a]">Secure Verification</h2>
                  <p className="text-muted-foreground text-sm">
                    We've sent a 6-digit clinical access code to <br />
                    <span className="font-semibold text-[#014f86]">
                      {registeredEmail || 'your email'}
                    </span>
                    .
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

                  <Button className="bg-primary h-11 w-full text-white shadow-md transition-all hover:bg-[#013a63]">
                    Verify & Access Dashboard
                    <ShieldCheck className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="flex flex-col space-y-2 pt-2 text-center">
                    <p className="text-muted-foreground text-xs">
                      Didn't receive the code?{' '}
                      <Button
                        variant="link"
                        className="text-primary h-auto p-0 font-semibold hover:text-[#013a63]"
                      >
                        Resend Code
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
