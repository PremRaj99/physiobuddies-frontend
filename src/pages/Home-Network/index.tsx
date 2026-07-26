import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  Headset,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  UserPlus,
  Wallet,
} from 'lucide-react';

// Shadcn UI Imports
import Footer from '@/components/custom/footer/footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// --- Animation Variants ---
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// Fallback target icon since I didn't import it above, replacing with Award for safety
const refinedBenefits = [
  {
    title: 'Pre-Screened Patients',
    desc: 'Receive verified patient requests directly in your app.',
    icon: ShieldCheck,
  },
  {
    title: 'Zero Upfront Investment',
    desc: 'No hidden costs or platform fees to start your practice.',
    icon: Wallet,
  },
  {
    title: 'Total Calendar Control',
    desc: 'Set your own availability and accept visits on your terms.',
    icon: Clock,
  },
  {
    title: 'Dedicated Support',
    desc: 'Our administrative team handles the backend so you can focus on care.',
    icon: Headset,
  },
];

const steps = [
  {
    step: '01',
    title: 'Sign Up',
    desc: 'Register your professional details through our secure portal.',
    icon: UserPlus,
  },
  {
    step: '02',
    title: 'Get Verified',
    desc: 'Our clinical team reviews your credentials and clinical experience.',
    icon: ShieldCheck,
  },
  {
    step: '03',
    title: 'Accept Leads',
    desc: 'Receive notifications for home visit requests in your selected zones.',
    icon: Smartphone,
  },
  {
    step: '04',
    title: 'Treat & Earn',
    desc: 'Provide exceptional care and track your earnings on the dashboard.',
    icon: Stethoscope,
  },
];

const faqs = [
  {
    q: 'How do I get paid for my visits?',
    a: 'Payments are processed securely and transferred directly to your registered bank account on a weekly cycle.',
  },
  {
    q: 'Is there a registration fee to join?',
    a: 'No, joining the Physiobuddies Home Visit Network is completely free for qualified physiotherapists.',
  },
  {
    q: 'Do I have to accept every patient request?',
    a: 'Not at all. You have full autonomy to accept or decline requests based on your schedule and travel radius.',
  },
  {
    q: 'What qualifications are required?',
    a: 'You must hold a valid degree in Physiotherapy (BPT/MPT) and be registered with the relevant state or national council.',
  },
];

export default function HomeVisitNetwork() {
  return (
    <div className="bg-background flex min-h-screen flex-col font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-[#013a63] px-4 py-20 md:py-32 lg:px-8">
        <div className="pointer-events-none absolute top-0 right-0 h-125 w-125 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#014f86] opacity-40 blur-[120px]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold tracking-widest text-[#a9d6e5] uppercase backdrop-blur-sm">
            <Stethoscope className="h-4 w-4" />
            For Physiotherapists
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Join Our Elite <span className="text-[#a9d6e5]">Home Visit</span> Network
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light text-white/80 md:text-xl">
            Expand your private practice, increase your earnings, and deliver expert clinical care
            directly to patients' homes with full administrative support.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="bg-primary shadow-primary/20 h-14 w-full rounded-xl px-8 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#012a4a] active:scale-95 sm:w-auto">
              Apply to Join Network
            </Button>
            <Button
              variant="outline"
              className="h-14 w-full rounded-xl border-white/20 bg-white/5 px-8 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white sm:w-auto"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* --- WHY JOIN SECTION (BENEFITS) --- */}
      <section className="bg-secondary/10 px-4 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-[#012a4a] md:text-4xl">
              Exclusive Network Benefits
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Everything you need to run a successful mobile clinic.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {refinedBenefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={idx} variants={fadeUpVariant} whileHover={{ y: -5 }}>
                  <Card className="border-border hover:shadow-primary/5 h-full bg-white shadow-sm transition-shadow hover:shadow-lg">
                    <CardContent className="flex flex-col items-start p-8">
                      <div className="bg-secondary/30 text-primary mb-6 rounded-2xl p-4">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-[#012a4a]">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS (STEPS) --- */}
      <section className="bg-white px-4 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-[#012a4a] md:text-4xl">How the Network Works</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              A streamlined process to get you treating patients faster.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="bg-secondary/40 absolute top-12 left-0 hidden h-0.5 w-full lg:block" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8"
            >
              {steps.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={fadeUpVariant}
                    className="relative z-10 flex flex-col items-center text-center"
                  >
                    <div className="bg-secondary/30 shadow-primary/5 mb-6 flex h-24 w-24 items-center justify-center rounded-full border-8 border-white text-[#013a63] shadow-xl">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="text-primary mb-2 text-sm font-bold tracking-widest uppercase">
                      Step {item.step}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-[#012a4a]">{item.title}</h3>
                    <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="bg-secondary/10 border-border border-t px-4 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#012a4a] md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Clear answers for clinical professionals.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border-border data-[state=open]:border-primary/30 rounded-2xl border bg-white px-6 py-2 shadow-sm transition-colors"
              >
                <AccordionTrigger className="hover:text-primary text-left text-base font-bold text-[#012a4a] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2 pb-4 text-sm leading-relaxed md:text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#012a4a] shadow-2xl"
        >
          {/* Decor */}
          <div className="bg-primary absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-50 blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 p-12 text-center md:flex-row md:p-16 md:text-left">
            <div className="max-w-xl">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Ready to transform your practice?
              </h2>
              <p className="text-secondary/90 text-lg">
                Join hundreds of clinical professionals who are delivering premium care and growing
                their income through Physiobuddies.
              </p>
            </div>
            <div className="w-full shrink-0 md:w-auto">
              <Button className="hover:bg-secondary h-16 w-full rounded-2xl bg-white px-10 text-lg font-bold text-[#012a4a] shadow-xl transition-colors md:w-auto">
                Start Your Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
