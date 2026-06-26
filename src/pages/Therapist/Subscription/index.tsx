import { motion, type Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2, CreditCard, ShieldCheck, Stethoscope } from 'lucide-react';
import { useState } from 'react';

import PageHeader from '@/components/custom/page-header/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

/* STREAMING_CHUNK:Defining Subscription Plans... */

const PLANS = [
  {
    id: '3m',
    name: 'Quarterly',
    months: 3,
    price: 449,
    monthlyEquivalent: Math.round(449 / 3),
    savings: '',
    popular: false,
    description: 'Perfect for getting started and experiencing the platform.',
    features: [
      'Verified Therapist Profile',
      'Real-time Appointment Booking',
      'Basic Patient Management',
      'Standard Email Support',
    ],
    buttonText: 'Start 3 Months',
  },
  {
    id: '6m',
    name: 'Half-Yearly',
    months: 6,
    price: 749,
    monthlyEquivalent: Math.round(749 / 6),
    savings: 'Save 16%',
    popular: true,
    description: 'Our most popular plan for committed professionals.',
    features: [
      'Everything in Quarterly',
      'Featured Profile Placement',
      'Advanced Analytics Dashboard',
      'Priority Chat Support',
    ],
    buttonText: 'Choose Popular Plan',
  },
  {
    id: '12m',
    name: 'Annually',
    months: 12,
    price: 1199,
    monthlyEquivalent: Math.round(1199 / 12),
    savings: 'Save 33%',
    popular: false,
    description: 'Maximum value for long-term growth and practice expansion.',
    features: [
      'Everything in Half-Yearly',
      'Top-tier Search Ranking',
      'Custom Article Publishing',
      '24/7 Dedicated Phone Support',
    ],
    buttonText: 'Lock in Best Value',
  },
];

/* STREAMING_CHUNK:Framer Motion Variants... */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// --- Main Page Component ---
export default function TherapistSubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setIsProcessing(true);

    // Simulate navigation/payment gateway routing
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Routing to payment gateway for plan: ${planId}`);
    }, 1500);
  };

  /* STREAMING_CHUNK:Rendering the UI... */
  return (
    <div className="min-h-body relative overflow-hidden bg-[#f8fbfa] pb-8 font-sans">
      {/* Background Decorators */}
      <PageHeader
        heading={
          <span className="text-white">
            <span className="text-[#a9d6e5]">Subscription</span> Plan
          </span>
        }
        subheading="Choose a plan that fits your practice."
      />
      <main className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <Card className="border-border mb-4 overflow-hidden bg-white py-0 shadow-sm">
          <div className="border-border bg-secondary/20 flex items-center justify-between border-b px-6 py-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-[#012a4a]">
              <ShieldCheck className="h-5 w-5 text-[#014f86]" /> Current Subscription
            </h2>
            <Badge className="bg-success hover:bg-success text-white">Active</Badge>
          </div>
          <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-muted-foreground mb-1 text-sm">Plan Name</p>
              <h3 className="text-2xl font-bold text-[#014f86]">Half-Yearly Plan</h3>
            </div>
            <div className="sm:text-right">
              <p className="text-muted-foreground mb-1 text-sm">Valid Until</p>
              <p className="flex items-center gap-2 text-lg font-bold text-[#012a4a]">
                December 27, 2026
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto p-4 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {PLANS.map((plan) => {
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className="h-full w-[90%] shrink-0 snap-center sm:w-72 md:w-auto md:shrink"
              >
                <Card
                  className={`relative flex h-full flex-col gap-0 overflow-visible py-0 transition-all duration-300 ${
                    isPopular
                      ? 'z-10 scale-100 border-2 border-[#014f86] bg-white shadow-xl md:scale-105 md:shadow-2xl'
                      : 'border-border bg-white/95 shadow-md hover:bg-white'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 right-0 left-0 z-20 flex justify-center">
                      <span className="rounded-full bg-[#014f86] px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase shadow-md">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <CardHeader className={`${isPopular ? 'pt-8' : 'pt-6'} pb-4 text-center`}>
                    <CardTitle className="mb-2 text-xl font-bold text-[#013a63]">
                      {plan.name}
                    </CardTitle>
                    <p className="text-muted-foreground min-h-10 text-sm">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="flex-1 px-6 pb-6">
                    <div className="mb-6 text-center">
                      <div className="flex items-start justify-center gap-1">
                        <span className="mt-2 text-2xl font-bold text-[#012a4a]">₹</span>
                        <span className="text-5xl font-black tracking-tight text-[#012a4a]">
                          {plan.price}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-[#014f86]">
                        Just ₹{plan.monthlyEquivalent} / month
                      </p>

                      <div className="mt-2 h-6">
                        {plan.savings && (
                          <Badge
                            variant="secondary"
                            className="bg-success/10 text-success border-success/20"
                          >
                            {plan.savings}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2
                            className={`mt-0.5 h-5 w-5 shrink-0 ${isPopular ? 'text-[#014f86]' : 'text-[#a9d6e5]'}`}
                          />
                          <span className="text-sm font-medium text-[#012a4a]/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="mt-auto p-6 pt-0">
                    <Button
                      size="lg"
                      onClick={() => handleSelectPlan(plan.id)}
                      disabled={isProcessing && selectedPlan !== plan.id}
                      className={`h-12 w-full text-base font-bold transition-all ${
                        isPopular
                          ? 'bg-[#014f86] text-white shadow-lg shadow-[#014f86]/20 hover:bg-[#013a63]'
                          : 'bg-secondary hover:bg-secondary/80 text-[#013a63]'
                      }`}
                    >
                      {isProcessing && selectedPlan === plan.id ? (
                        'Processing...'
                      ) : (
                        <>
                          {plan.buttonText}
                          {isPopular && <ArrowRight className="ml-2 h-4 w-4" />}
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border-border/60 mt-16 border-t pt-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 md:gap-16">
            <div className="flex items-center gap-2 font-semibold text-[#012a4a]">
              <ShieldCheck className="h-5 w-5 text-[#014f86]" /> 100% Secure Checkout
            </div>
            <div className="flex items-center gap-2 font-semibold text-[#012a4a]">
              <Stethoscope className="h-5 w-5 text-[#014f86]" /> Verified Professional Network
            </div>
            <div className="flex items-center gap-2 font-semibold text-[#012a4a]">
              <CreditCard className="h-5 w-5 text-[#014f86]" /> Easy UPI & Card Payments
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
