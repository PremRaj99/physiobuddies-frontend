import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Laptop,
  Globe2,
  Clock,
  ShieldCheck,
  Video,
  Wallet,
  Headset,
  CalendarRange,
  ArrowRight,
  Star,
  UserPlus,
  Activity,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Footer from '@/components/custom/footer/footer';

// --- Animation Variants ---
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// --- Data Models ---
const benefits = [
  {
    title: 'HD Telehealth Platform',
    desc: 'Conduct seamless, high-definition video consultations with built-in clinical tools.',
    icon: Video,
  },
  {
    title: 'Global Patient Access',
    desc: 'Break geographical barriers and treat patients from across the country and worldwide.',
    icon: Globe2,
  },
  {
    title: 'Complete Flexibility',
    desc: 'Set your own online consultation hours. Work from your clinic or home office.',
    icon: CalendarRange,
  },
  {
    title: 'Secure Payments',
    desc: 'Automated, secure payment collection before the session begins. Zero follow-ups needed.',
    icon: Wallet,
  },
  {
    title: 'Pre-Screened Leads',
    desc: 'Connect with patients actively seeking virtual musculoskeletal and rehab care.',
    icon: ShieldCheck,
  },
  {
    title: 'Dedicated Tech Support',
    desc: '24/7 technical and administrative support to ensure your sessions run smoothly.',
    icon: Headset,
  },
];

const steps = [
  {
    step: '01',
    title: 'Create Profile',
    desc: 'Sign up and submit your professional credentials for our telehealth roster.',
    icon: UserPlus,
  },
  {
    step: '02',
    title: 'Verification',
    desc: 'Our medical board reviews your licenses to ensure clinical excellence.',
    icon: ShieldCheck,
  },
  {
    step: '03',
    title: 'Consult Virtually',
    desc: 'Log in, manage your calendar, and conduct secure video sessions.',
    icon: Laptop,
  },
  {
    step: '04',
    title: 'Earn Securely',
    desc: 'Receive automated payouts directly to your bank account every week.',
    icon: Activity,
  },
];

const faqs = [
  {
    q: 'Do I need special software for video consultations?',
    a: 'No. Physiobuddies provides a fully integrated, HIPAA-compliant telehealth platform accessible directly through your web browser or mobile app.',
  },
  {
    q: 'Is there a registration fee to join the online network?',
    a: 'No, joining our online network is completely free for verified physiotherapists. We operate on a transparent revenue-share model per consultation.',
  },
  {
    q: 'How do I manage my availability?',
    a: 'You have complete control via your provider dashboard. You can open specific blocks of time exclusively for online consultations.',
  },
  {
    q: 'What happens if a patient misses their online appointment?',
    a: 'We have a strict cancellation and no-show policy that protects your time, ensuring you are compensated for booked slots.',
  },
];

export default function OnlineNetwork() {
  return (
    <div className="bg-background flex min-h-screen flex-col font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-[#013a63] px-4 py-20 md:py-28 lg:px-8">
        {/* Calming deep background orbs */}
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#014f86] opacity-50 blur-[130px]" />
        <div className="bg-secondary pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/3 rounded-full opacity-20 blur-[100px]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold tracking-widest text-[#a9d6e5] uppercase backdrop-blur-sm">
            <Laptop className="h-4 w-4" />
            For Telehealth Providers
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Join Our Global <span className="text-[#a9d6e5]">Online Network</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light text-white/80 md:text-xl">
            Expand your practice beyond borders. Deliver premium telehealth physiotherapy to
            patients anywhere, on your own schedule.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="bg-primary shadow-primary/20 h-14 w-full rounded-xl px-8 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#012a4a] active:scale-95 sm:w-auto">
              Onboard as an Online Expert
            </Button>
          </div>
        </motion.div>
      </section>

      {/* --- KEY HIGHLIGHTS (Overlapping Stats) --- */}
      <section className="relative z-20 -mt-12 px-4 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-border grid grid-cols-1 gap-4 rounded-3xl border bg-white p-4 shadow-xl md:grid-cols-3"
          >
            <div className="border-secondary/50 flex flex-col items-center justify-center border-b p-6 text-center md:border-r md:border-b-0">
              <Globe2 className="text-primary mb-3 h-8 w-8" />
              <h4 className="text-2xl font-bold text-[#012a4a]">Global Reach</h4>
              <p className="text-muted-foreground mt-1 text-sm">Treat Patients Worldwide</p>
            </div>
            <div className="border-secondary/50 flex flex-col items-center justify-center border-b p-6 text-center md:border-r md:border-b-0">
              <Wallet className="text-success mb-3 h-8 w-8" />
              <h4 className="text-2xl font-bold text-[#012a4a]">Zero Setup Cost</h4>
              <p className="text-muted-foreground mt-1 text-sm">No Platform Registration Fees</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Clock className="text-primary mb-3 h-8 w-8" />
              <h4 className="text-2xl font-bold text-[#012a4a]">100% Flexible</h4>
              <p className="text-muted-foreground mt-1 text-sm">Work From Anywhere</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS (STEPS) --- */}
      <section className="mt-8 bg-white px-4 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-[#012a4a] md:text-4xl">How Telehealth Works</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              A frictionless onboarding process to get you consulting online.
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
                    <div className="bg-secondary/30 shadow-primary/5 mb-6 flex h-24 w-24 items-center justify-center rounded-full border-8 border-white text-[#013a63] shadow-xl transition-transform hover:scale-105">
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

      {/* --- EXCLUSIVE BENEFITS SECTION --- */}
      <section className="bg-secondary/10 border-border border-y px-4 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-[#012a4a] md:text-4xl">
              Exclusive Online Network Benefits
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Everything you need to deliver world-class virtual care.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {benefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={idx} variants={fadeUpVariant} whileHover={{ y: -5 }}>
                  <Card className="border-border hover:shadow-primary/5 hover:border-primary/20 h-full bg-white shadow-sm transition-shadow hover:shadow-lg">
                    <CardContent className="flex flex-col items-start p-8">
                      <div className="bg-secondary/30 text-primary mb-6 rounded-2xl p-3.5">
                        <Icon className="h-7 w-7" />
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

      {/* --- TESTIMONIAL SECTION --- */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[2.5rem] bg-[#012a4a] p-1 shadow-2xl"
          >
            <div className="flex flex-col items-center gap-10 rounded-[2.25rem] bg-white p-8 md:flex-row md:p-12">
              {/* Featured Image placeholder mimicking the doctor on a video call */}
              <div className="bg-secondary/20 border-border relative h-64 w-full shrink-0 overflow-hidden rounded-2xl border md:h-80 md:w-2/5">
                <img
                  src="/placeholder.jpg"
                  alt="Telehealth Partner"
                  className="h-full w-full object-cover opacity-90"
                  onError={(e) =>
                    (e.currentTarget.src =
                      'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=800')
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#012a4a]/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-bold">Dr. Sameer Verma</p>
                  <p className="text-secondary text-xs font-medium">
                    Virtual Sports Rehab Specialist
                  </p>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="w-full space-y-6 md:w-3/5">
                <div className="flex gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <h3 className="text-2xl leading-tight font-bold text-[#012a4a] md:text-3xl">
                  "Consulting online gave me the ultimate work-life balance."
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed italic">
                  "Joining the online network allowed me to treat patients from different cities
                  without leaving my desk. The video infrastructure is seamless, and not having to
                  worry about payment collection lets me focus 100% on patient recovery."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="bg-secondary/5 border-border border-t px-4 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#012a4a] md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Clear answers for telehealth providers.
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
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#013a63] shadow-2xl"
        >
          {/* Decor */}
          <div className="bg-primary absolute -top-24 -left-24 h-64 w-64 rounded-full opacity-40 blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 p-12 text-center md:flex-row md:p-16 md:text-left">
            <div className="max-w-xl">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Ready to expand your digital practice?
              </h2>
              <p className="text-secondary/90 text-lg">
                Onboard as a telehealth provider today and start treating patients globally with
                zero setup costs.
              </p>
            </div>
            <div className="w-full shrink-0 md:w-auto">
              <Button className="hover:bg-secondary h-16 w-full rounded-xl bg-white px-10 text-lg font-bold text-[#012a4a] shadow-xl transition-colors md:w-auto">
                Join Online Network
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
