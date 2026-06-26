'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Banknote,
  CalendarDays,
  Camera,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Gift,
  Info,
  MapPin,
  Navigation,
  ShieldCheck,
  Sun,
  Sunrise,
  Sunset,
} from 'lucide-react';
import { useState } from 'react';

import AnimatedSuccess from '@/components/custom/animated-success/AnimatedSuccess';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

/* STREAMING_CHUNK:Defining Data Structures and Constants... */

const STEPS = [
  { id: 1, title: 'Profile & Location', icon: MapPin },
  { id: 2, title: 'Financials', icon: Banknote },
  { id: 3, title: 'Subscription', icon: CreditCard },
  { id: 4, title: 'Availability', icon: CalendarDays },
  { id: 5, title: 'Review', icon: ShieldCheck },
];

const SUBSCRIPTION_PLANS = [
  { id: '3m', months: 3, price: 449, popular: false },
  { id: '6m', months: 6, price: 749, popular: true },
  { id: '12m', months: 12, price: 1199, popular: false },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const PERIODS = [
  { id: 'morning', label: 'Morning', icon: Sunrise },
  { id: 'noon', label: 'Noon', icon: Sun },
  { id: 'evening', label: 'Evening', icon: Sunset },
];

type FormData = {
  about: string;
  address: string;
  lat: string;
  lng: string;
  accountName: string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  ifsc: string;
  upiId: string;
  planId: string;
  slots: Record<string, string[]>;
};

// --- Main Page Component ---
export default function TherapistFinalOnboarding() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const navigate = useNavigate();

  /* STREAMING_CHUNK:Initializing Form State... */
  const [formData, setFormData] = useState<FormData>({
    // Step 1: Profile & Location
    about: '',
    address: '',
    lat: '',
    lng: '',

    // Step 2: Financials
    accountName: '',
    bankName: '',
    branchName: '',
    accountNumber: '',
    ifsc: '',
    upiId: '',

    // Step 3: Subscription
    planId: '6m', // Default selection

    // Step 4: Slots
    slots: {} as Record<string, string[]>, // e.g., { "Mon": ["morning", "evening"] }
  });

  /* STREAMING_CHUNK:Helper Functions... */
  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const detectLocation = () => {
    setIsDetectingLocation(true);
    setTimeout(() => {
      updateField('address', 'Greater Noida, Uttar Pradesh, India');
      updateField('lat', '28.4744');
      updateField('lng', '77.5040');
      setIsDetectingLocation(false);
    }, 1500);
  };

  const toggleSlot = (day: string, period: string) => {
    setFormData((prev) => {
      const currentDaySlots = prev.slots[day] || [];
      const newDaySlots = currentDaySlots.includes(period)
        ? currentDaySlots.filter((p) => p !== period)
        : [...currentDaySlots, period];
      return { ...prev, slots: { ...prev.slots, [day]: newDaySlots } };
    });
  };

  const handleNext = () => setStep((p) => Math.min(5, p + 1));
  const handleBack = () => setStep((p) => Math.max(1, p - 1));

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  /* STREAMING_CHUNK:Rendering Success Screen... */
  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbfa] p-4 pt-12 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-border gap-0 bg-white px-6 text-center shadow-xl shadow-[#012a4a]/5">
            <div className="bg-success/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <AnimatedSuccess />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-[#012a4a]">Saved Successfully!</h1>
            <p className="mb-8 leading-relaxed text-[#013a63]">
              Congratulations! Your profile has been successfully updated. You can now access your
              dashboard and manage your account.
            </p>
            <Button
              className="w-full bg-[#014f86] text-white hover:bg-[#013a63]"
              onClick={() => navigate('/')}
            >
              Go to Dashboard
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  /* STREAMING_CHUNK:Rendering Wizard Header... */
  return (
    <div className="min-h-body bg-background pb-24 font-sans">
      <main className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        <Card className="border-border gap-0 overflow-hidden py-0 shadow-xl shadow-[#012a4a]/5">
          {/* Stepper Header */}
          <div className="bg-secondary/20 border-border border-b p-6">
            <div className="relative flex items-center justify-between">
              <div className="bg-border absolute top-1/2 left-0 -z-10 h-1 w-full -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-8 -z-10 h-1 -translate-y-1/2 bg-[#014f86] transition-all duration-500"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
              {STEPS.map((s) => {
                const isActive = s.id === step;
                const isPassed = s.id < step;
                return (
                  <div key={s.id} className="flex flex-col items-center px-2">
                    <div
                      className={cn(
                        `flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors`,
                        isActive
                          ? 'border-[#014f86] bg-[#014f86] text-white'
                          : isPassed
                            ? 'text-success border-transparent bg-[#ffffff]'
                            : 'border-border text-muted-foreground bg-gray-50',
                      )}
                    >
                      {isPassed ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <s.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        `mt-2 hidden text-xs font-bold sm:block`,
                        isActive || isPassed ? 'text-[#012a4a]' : 'text-muted-foreground',
                      )}
                    >
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <CardContent className="min-h-112.5 p-6 md:p-10">
            <AnimatePresence mode="wait">
              {/* STEP 1: PROFILE & LOCATION */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-[#012a4a]">Profile & Location</h2>
                    <p className="text-muted-foreground mb-6">
                      Ensure your practice area is accurately mapped.
                    </p>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      <div className="space-y-3 md:col-span-2">
                        <div className="flex items-center justify-between">
                          <Label className="font-bold text-[#012a4a]">Profile Image</Label>
                          <span className="bg-secondary/50 flex items-center gap-1 rounded px-2 py-0.5 text-[10px] text-[#014f86]">
                            <Info className="h-3 w-3" /> Can update later
                          </span>
                        </div>
                        <div className="hover:bg-secondary/10 cursor-pointer rounded-xl border-2 border-dashed border-[#a9d6e5] bg-[#f8fbfa] p-8 text-center transition-colors">
                          <Camera className="mx-auto mb-2 h-8 w-8 text-[#014f86]" />
                          <p className="text-sm font-medium text-[#013a63]">
                            Upload Professional Photo
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 md:col-span-2">
                        <div className="flex items-center justify-between">
                          <Label className="font-bold text-[#012a4a]">About Me</Label>
                          <span className="bg-secondary/50 flex items-center gap-1 rounded px-2 py-0.5 text-[10px] text-[#014f86]">
                            <Info className="h-3 w-3" /> Can update later
                          </span>
                        </div>
                        <Textarea
                          placeholder="Write a brief introduction for your patients..."
                          value={formData.about}
                          onChange={(e) => updateField('about', e.target.value)}
                          className="min-h-36.25 focus-visible:ring-[#014f86]"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <Label className="text-lg font-bold text-[#012a4a]">
                      Verify Treatment Area Coordinates
                    </Label>
                    {formData.lat && formData.lng ? (
                      <Alert variant="default" className="text-success border-transparent p-0">
                        <MapPin className="mr-1 size-4" />
                        <span className="text-sm">
                          {formData.address} | {formData.lat}, {formData.lng}
                        </span>
                      </Alert>
                    ) : null}
                    <div className="flex flex-col items-end gap-4 sm:flex-row">
                      <div className="flex w-full items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={detectLocation}
                          disabled={isDetectingLocation}
                          className="hover:bg-secondary/20 h-10 flex-1 border-[#014f86] text-[#014f86]"
                        >
                          <Navigation className="mr-1 h-4 w-4" />
                          {isDetectingLocation ? 'Detecting...' : 'My Location'}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            updateField('lat', '28.4744');
                            updateField('lng', '77.5040');
                          }}
                          className="h-10 flex-1"
                        >
                          <MapPin className="mr-1 h-4 w-4" />
                          Choose Map
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
                      <MapPin className="h-3 w-3" /> Exact coordinates are required to dispatch home
                      visit requests efficiently.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: FINANCIALS */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="mb-2 text-2xl font-bold text-[#012a4a]">Account Details</h2>
                  <p className="text-muted-foreground mb-6">
                    Where should we send your session payouts? Provide Bank Details OR a UPI ID.
                  </p>

                  <div className="bg-secondary/10 border-border space-y-6 rounded-xl border p-6">
                    <h3 className="border-border flex items-center gap-2 border-b pb-2 font-bold text-[#013a63]">
                      <Banknote className="h-4 w-4" /> Option 1: Direct Bank Transfer
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-[#012a4a]">Account Holder Name</Label>
                        <Input
                          value={formData.accountName}
                          onChange={(e) => updateField('accountName', e.target.value)}
                          className="focus-visible:ring-[#014f86]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#012a4a]">Bank Name</Label>
                        <Input
                          value={formData.bankName}
                          onChange={(e) => updateField('bankName', e.target.value)}
                          className="focus-visible:ring-[#014f86]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#012a4a]">Branch Name</Label>
                        <Input
                          value={formData.branchName}
                          onChange={(e) => updateField('branchName', e.target.value)}
                          className="focus-visible:ring-[#014f86]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#012a4a]">Account Number</Label>
                        <Input
                          type="password"
                          value={formData.accountNumber}
                          onChange={(e) => updateField('accountNumber', e.target.value)}
                          className="focus-visible:ring-[#014f86]"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-[#012a4a]">IFSC Code</Label>
                        <Input
                          value={formData.ifsc}
                          onChange={(e) => updateField('ifsc', e.target.value)}
                          className="uppercase focus-visible:ring-[#014f86]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="my-6 flex items-center gap-4">
                    <Separator className="flex-1" />
                    <span className="text-muted-foreground text-sm font-bold">OR</span>
                    <Separator className="flex-1" />
                  </div>

                  <div className="bg-secondary/10 border-border space-y-4 rounded-xl border p-6">
                    <h3 className="border-border flex items-center gap-2 border-b pb-2 font-bold text-[#013a63]">
                      <CreditCard className="h-4 w-4" /> Option 2: UPI Transfer
                    </h3>
                    <div className="space-y-2">
                      <Label className="text-[#012a4a]">UPI ID</Label>
                      <Input
                        placeholder="e.g. name@bank"
                        value={formData.upiId}
                        onChange={(e) => updateField('upiId', e.target.value)}
                        className="max-w-md focus-visible:ring-[#014f86]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: SUBSCRIPTION */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="relative mb-8 overflow-hidden rounded-xl bg-linear-to-r from-[#014f86] to-[#012a4a] p-6 text-center text-white">
                    <Gift className="absolute top-1/2 left-4 h-24 w-24 -translate-y-1/2 text-white/10" />
                    <Gift className="absolute top-1/2 right-4 h-24 w-24 -translate-y-1/2 text-white/10" />
                    <h2 className="mb-2 text-2xl font-bold">Welcome to Medical-Trust!</h2>
                    <p className="text-lg font-medium text-[#a9d6e5]">
                      Get your 1st month of subscription completely FREE.
                    </p>
                  </div>

                  <h3 className="mb-4 text-center text-xl font-bold text-[#012a4a]">
                    Select your plan after the trial period
                  </h3>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {SUBSCRIPTION_PLANS.map((plan) => (
                      <Card
                        key={plan.id}
                        onClick={() => updateField('planId', plan.id)}
                        className={cn(
                          `relative cursor-pointer overflow-hidden border-2 transition-all`,
                          formData.planId === plan.id
                            ? 'scale-[1.02] border-[#014f86] bg-[#f8fbfa] shadow-lg'
                            : 'border-border bg-white hover:border-[#a9d6e5]',
                        )}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 right-0 rounded-bl-lg bg-[#014f86] px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                            Most Popular
                          </div>
                        )}
                        <CardContent className="p-6 text-center">
                          <h4 className="mb-2 text-xl font-bold text-[#013a63]">
                            {plan.months} Months
                          </h4>
                          <div className="mb-4 text-3xl font-black text-[#012a4a]">
                            ₹{plan.price}
                          </div>
                          <Separator className="mb-4" />
                          <div className="text-muted-foreground space-y-2 text-sm">
                            <p>Full platform access</p>
                            <p>Priority listing</p>
                            <p>24/7 Support</p>
                          </div>
                          <div
                            className={cn(
                              `mt-6 w-full rounded-lg py-2 font-bold transition-colors`,
                              formData.planId === plan.id
                                ? 'bg-[#014f86] text-white'
                                : 'bg-secondary/30 text-[#014f86]',
                            )}
                          >
                            {formData.planId === plan.id ? 'Selected' : 'Select Plan'}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: AVAILABILITY SLOTS */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="mb-2 text-2xl font-bold text-[#012a4a]">Weekly Availability</h2>
                  <p className="text-muted-foreground mb-6">
                    Select the general time periods you are available for bookings each day.
                  </p>

                  <div className="border-border overflow-hidden rounded-xl border bg-white">
                    <div className="grid grid-cols-4 bg-[#012a4a] p-4 text-sm font-bold text-white">
                      <div>Day</div>
                      <div className="text-center">Morning</div>
                      <div className="text-center">Afternoon</div>
                      <div className="text-center">Evening</div>
                    </div>
                    <div className="divide-border divide-y">
                      {DAYS.map((day) => (
                        <div
                          key={day}
                          className="grid grid-cols-4 items-center p-2 transition-colors hover:bg-gray-50"
                        >
                          <div className="pl-2 font-bold text-[#013a63]">{day}</div>
                          {PERIODS.map((period) => {
                            const isSelected = formData.slots[day]?.includes(period.id);
                            return (
                              <div key={period.id} className="flex justify-center">
                                <button
                                  type="button"
                                  onClick={() => toggleSlot(day, period.id)}
                                  className={cn(
                                    `flex h-10 w-10 items-center justify-center rounded-full transition-all`,
                                    isSelected
                                      ? 'scale-110 bg-[#014f86] text-white shadow-md'
                                      : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/60 border-border border',
                                  )}
                                >
                                  <period.icon className="h-5 w-5" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4 text-center text-xs">
                    You can fine-tune specific 30-minute slots in your Dashboard later.
                  </p>
                </motion.div>
              )}

              {/* STEP 5: REVIEW */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="mb-2 text-2xl font-bold text-[#012a4a]">Review & Submit</h2>
                  <p className="text-muted-foreground mb-6">
                    Please verify your details before final submission.
                  </p>

                  <div className="space-y-6">
                    <div className="bg-secondary/10 border-border rounded-xl border p-5">
                      <h4 className="border-border mb-3 border-b pb-2 font-bold text-[#013a63]">
                        Location Details
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground block">Address:</span>{' '}
                          <span className="font-semibold text-[#012a4a]">
                            {formData.address} | {formData.lat || 'Not provided'},{' '}
                            {formData.lng || 'Not provided'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary/10 border-border rounded-xl border p-5">
                      <h4 className="border-border mb-3 border-b pb-2 font-bold text-[#013a63]">
                        Financials
                      </h4>
                      <div className="space-y-2 text-sm">
                        {formData.upiId ? (
                          <div>
                            <span className="text-muted-foreground">UPI ID:</span>{' '}
                            <span className="font-semibold text-[#012a4a]">{formData.upiId}</span>
                          </div>
                        ) : (
                          <>
                            <div>
                              <span className="text-muted-foreground">Bank:</span>{' '}
                              <span className="font-semibold text-[#012a4a]">
                                {formData.bankName || 'Not provided'}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Account:</span>{' '}
                              <span className="font-semibold text-[#012a4a]">
                                {formData.accountNumber
                                  ? '••••' + formData.accountNumber.slice(-4)
                                  : 'Not provided'}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">IFSC:</span>{' '}
                              <span className="font-semibold text-[#012a4a]">
                                {formData.ifsc || 'Not provided'}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-[#014f86] p-5 text-white shadow-md">
                      <div>
                        <h4 className="text-lg font-bold">Selected Subscription</h4>
                        <p className="text-sm text-[#a9d6e5]">Includes 1 Month Free Trial</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black">
                          {SUBSCRIPTION_PLANS.find((p) => p.id === formData.planId)?.months} Months
                        </span>
                        <p className="text-sm font-medium">
                          ₹{SUBSCRIPTION_PLANS.find((p) => p.id === formData.planId)?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <div className="border-border flex items-center justify-between border-t bg-gray-50 p-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1 || isSubmitting}
              className="text-[#013a63]"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {step < 5 ? (
              <Button
                onClick={handleNext}
                className="bg-[#014f86] px-8 text-white hover:bg-[#013a63]"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-success px-8 font-bold text-white hover:bg-emerald-600"
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
              </Button>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
