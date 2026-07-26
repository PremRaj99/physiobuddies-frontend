'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  BadgeCheck,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogIn,
  MessagesSquare,
  Search,
  Stethoscope,
  UserPlus,
  Wallet,
} from 'lucide-react';

import ActionCTA from '@/components/custom/cta/cta';
import Footer from '@/components/custom/footer/footer';
import PageHeader from '@/components/custom/page-header/page-header';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// --- Types ---
interface FlowStep {
  icon: React.ElementType;
  title: string;
  description: string;
  tip?: string;
}

// --- Step Timeline Sub-Component ---
const StepTimeline = ({ steps }: { steps: FlowStep[] }) => (
  <div className="relative">
    {/* Vertical connector line */}
    <div className="bg-secondary absolute top-2 bottom-2 left-6 w-px md:left-7" />

    <div className="space-y-8">
      {steps.map((step, idx) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="relative flex gap-5 md:gap-6"
          >
            {/* Icon node */}
            <div className="relative z-10 shrink-0">
              <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md md:h-14 md:w-14">
                <Icon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <span className="border-secondary text-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border bg-white text-[10px] font-bold shadow-sm">
                {idx + 1}
              </span>
            </div>

            {/* Content */}
            <div className="border-border flex-1 rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <h3 className="mb-1.5 text-base font-bold text-[#012a4a] md:text-lg">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[#012a4a]/75">{step.description}</p>
              {step.tip && (
                <div className="bg-secondary/20 border-l-primary mt-3 rounded-r-md border-l-2 px-3 py-2">
                  <p className="text-xs leading-relaxed text-[#013a63]">
                    <span className="font-semibold">Tip:</span> {step.tip}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

// --- Flow Data ---
const PATIENT_STEPS: FlowStep[] = [
  {
    icon: UserPlus,
    title: 'Create your account',
    description:
      'Sign up as a patient with your name, email, and mobile number. Verify your email with the one-time code we send you, then set a password.',
    tip: 'Already registered? Just head to Login instead.',
  },
  {
    icon: Search,
    title: 'Find the right physiotherapist',
    description:
      'Use Search to discover verified physios near you. Filter by mode (home visit, online, or clinic), specialization, price, experience, and gender to match your needs.',
    tip: 'Allow location access to sort results by distance from you.',
  },
  {
    icon: Stethoscope,
    title: 'Review the profile',
    description:
      'Open a physiotherapist profile to see their experience, specializations, patient reviews, articles, and real-time availability before you decide.',
  },
  {
    icon: CalendarCheck,
    title: 'Book your slot',
    description:
      'Pick an available time slot. The slot is briefly held for you while you review the booking details and confirm your appointment.',
    tip: 'Add your address for home visits so the therapist can reach you.',
  },
  {
    icon: CreditCard,
    title: 'Make secure payment',
    description:
      'Complete payment through our secure gateway. Your booking is confirmed instantly once payment succeeds, and you receive a confirmation.',
  },
  {
    icon: Activity,
    title: 'Attend your session',
    description:
      'Meet your physio at the clinic, at home, or online at the scheduled time. Follow the personalized treatment plan they prepare for you.',
    tip: 'For home visits, verify the therapist matches their profile photo and ID for your safety.',
  },
  {
    icon: LayoutDashboard,
    title: 'Track everything in one place',
    description:
      'Visit My Bookings to see upcoming and past sessions, treatment progress, and session details. Manage your profile and saved addresses anytime.',
  },
  {
    icon: MessagesSquare,
    title: 'Share feedback & keep learning',
    description:
      'Leave a review after your session to help others, and explore our clinical Blog for expert wellness tips, recovery guides, and healthy habits.',
  },
];

const THERAPIST_STEPS: FlowStep[] = [
  {
    icon: UserPlus,
    title: 'Register as a physiotherapist',
    description:
      'Sign up with your professional details and location. Pay the one-time registration fee to begin your application to the Physiobuddies network.',
  },
  {
    icon: ClipboardList,
    title: 'Complete onboarding',
    description:
      'Fill in your qualifications, experience, specializations, education, languages, and upload your resume and certificates for our verification team.',
    tip: 'Accurate, complete profiles get verified faster.',
  },
  {
    icon: BadgeCheck,
    title: 'Get verified & finish setup',
    description:
      'After the interview and screening, complete final onboarding: bank details for payouts, your subscription plan, service address, and initial availability.',
  },
  {
    icon: CalendarCheck,
    title: 'Set your weekly schedule',
    description:
      'Use Slot Management to define your recurring weekly availability, block specific hours, and mark leave days so patients only book when you are free.',
    tip: 'Keep your calendar current to avoid double-bookings and cancellations.',
  },
  {
    icon: LayoutDashboard,
    title: 'Receive & manage bookings',
    description:
      'New appointments appear on your Dashboard and My Bookings. Open any booking to see the patient, condition, mode, and full session schedule.',
  },
  {
    icon: Stethoscope,
    title: 'Deliver sessions',
    description:
      'Start and complete each session from the booking. Create clinical assessments to record findings and build the patient’s treatment plan over time.',
  },
  {
    icon: Wallet,
    title: 'Track earnings & request payouts',
    description:
      'Every completed session credits your wallet after the platform commission. Review your Commission History and request payouts to your bank account.',
  },
  {
    icon: FileText,
    title: 'Grow your presence',
    description:
      'Publish articles and FAQs on your profile, and collect patient reviews to build trust and attract more bookings across the network.',
  },
];

// --- Main Page ---
export default function GuidePage() {
  return (
    <div className="min-h-screen bg-[#f8fbfa] font-sans">
      <PageHeader
        heading="How Physiobuddies Works"
        subheading="A simple, step-by-step guide to getting the most out of Physiobuddies — whether you are here to recover or to care for others."
      />

      <main className="relative z-20 mx-auto -mt-8 mb-10 max-w-6xl px-4 sm:px-6">
        <Card className="border-border overflow-hidden bg-white py-0 shadow-xl shadow-[#012a4a]/5">
          <Tabs defaultValue="patient" className="flex flex-col md:flex-row!">
            {/* Sidebar Navigation */}
            <div className="bg-secondary/20 border-border w-full shrink-0 border-r p-4! sm:p-6 md:w-56 lg:w-64">
              <p className="ml-2 pb-4 text-xs font-bold tracking-wider text-[#013a63] uppercase">
                Choose your journey
              </p>
              <TabsList className="flex h-auto! w-full flex-col items-stretch space-y-1 bg-transparent p-0">
                <TabsTrigger
                  value="patient"
                  className="text-primary hover:bg-secondary data-[state=active]:bg-primary justify-start rounded-md px-3 py-2 text-sm font-medium transition-colors data-[state=active]:text-white"
                >
                  <LogIn className="mr-3 h-4 w-4 shrink-0" /> For Patients
                </TabsTrigger>
                <TabsTrigger
                  value="therapist"
                  className="text-primary hover:bg-secondary data-[state=active]:bg-primary justify-start rounded-md px-3 py-2 text-sm font-medium transition-colors data-[state=active]:text-white"
                >
                  <Stethoscope className="mr-3 h-4 w-4 shrink-0" /> For Therapists
                </TabsTrigger>
              </TabsList>

              <div className="border-border mt-8 hidden rounded-xl border bg-white p-4 md:block">
                <BadgeCheck className="text-success mb-2 h-6 w-6" />
                <h4 className="mb-1 text-sm font-bold text-[#012a4a]">Verified & Secure</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Every physiotherapist is screened and verified, and all payments are processed
                  securely.
                </p>
              </div>
            </div>

            {/* Content Area */}
            <div className="min-w-0 flex-1">
              <ScrollArea className="h-[70vh] w-full md:h-200">
                <div className="p-6 md:p-10">
                  <AnimatePresence mode="wait">
                    <TabsContent value="patient" className="mt-0 outline-none">
                      <div className="mb-8">
                        <h1 className="mb-2 text-2xl font-bold text-[#012a4a] md:text-3xl">
                          Your recovery journey
                        </h1>
                        <p className="text-muted-foreground text-sm">
                          From finding the right expert to tracking your progress — here is how it
                          works for patients.
                        </p>
                      </div>
                      <StepTimeline steps={PATIENT_STEPS} />
                    </TabsContent>

                    <TabsContent value="therapist" className="mt-0 outline-none">
                      <div className="mb-8">
                        <h1 className="mb-2 text-2xl font-bold text-[#012a4a] md:text-3xl">
                          Grow your practice
                        </h1>
                        <p className="text-muted-foreground text-sm">
                          From registration to payouts — here is how physiotherapists work with
                          Physiobuddies.
                        </p>
                      </div>
                      <StepTimeline steps={THERAPIST_STEPS} />
                    </TabsContent>
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </div>
          </Tabs>
        </Card>
      </main>

      <ActionCTA />
      <Footer />
    </div>
  );
}
