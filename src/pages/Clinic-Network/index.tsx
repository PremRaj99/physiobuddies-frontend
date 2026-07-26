import { motion, type Variants } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Building2,
  ClipboardList,
  Headset,
  PieChart,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Wallet,
} from 'lucide-react';

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

// --- Data Models ---
const benefits = [
  {
    title: 'Enhance Online Visibility',
    desc: 'Showcase your clinic to thousands of patients actively seeking physiotherapy.',
    icon: TrendingUp,
  },
  {
    title: 'Reduce Admin Burden',
    desc: 'Automated booking and patient management directly through the platform.',
    icon: ClipboardList,
  },
  {
    title: 'Build Patient Trust',
    desc: 'Leverage our verified clinical network badge to increase conversion rates.',
    icon: ShieldCheck,
  },
  {
    title: 'Dedicated Support',
    desc: 'Access a 24/7 dedicated B2B partner support team for your clinic.',
    icon: Headset,
  },
  {
    title: 'Targeted Marketing',
    desc: 'Benefit from our localized digital campaigns driving footfall to your area.',
    icon: Target,
  },
  {
    title: 'Maximize ROI',
    desc: "Fill empty slots and optimize your clinic's daily operational capacity.",
    icon: PieChart,
  },
];

const steps = [
  {
    step: '01',
    title: 'Register Clinic',
    desc: 'Submit your clinic details and credentials through our secure partner portal.',
    icon: Building2,
  },
  {
    step: '02',
    title: 'Get Verified',
    desc: 'Our medical board reviews your facility to ensure clinical standards.',
    icon: ShieldCheck,
  },
  {
    step: '03',
    title: 'Start Treating',
    desc: 'Receive direct patient bookings and footfall to your physical clinic.',
    icon: Activity,
  },
  {
    step: '04',
    title: 'Track Revenue',
    desc: 'Monitor your growth and transparent payouts via the partner dashboard.',
    icon: Wallet,
  },
];

const faqs = [
  {
    q: 'How do I partner my clinic with Physiobuddies?',
    a: "Simply click 'Onboard Your Clinic', fill out the primary facility details, and our onboarding team will contact you within 24 hours to begin the verification process.",
  },
  {
    q: 'Is there any registration fee?',
    a: 'No. Partnering with the Physiobuddies network requires zero upfront registration fees. We operate on a transparent performance-based model.',
  },
  {
    q: 'How does Physiobuddies verify clinics?',
    a: "We conduct a stringent review of your clinic's registrations, practitioner licenses (BPT/MPT), and facility standards to maintain our 'Medical-Trust' guarantee.",
  },
  {
    q: 'Can I customize the services I offer?',
    a: 'Absolutely. You have full control over the specific treatments, availability slots, and specializations your clinic lists on the platform.',
  },
];

export default function ClinicNetwork() {
  return (
    <div className="bg-background flex min-h-screen flex-col font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-[#013a63] px-4 py-20 md:py-28 lg:px-8">
        {/* Calming deep background orbs */}
        <div className="pointer-events-none absolute top-0 left-0 h-125 w-125 -translate-x-1/4 -translate-y-1/4 rounded-full bg-[#014f86] opacity-40 blur-[120px]" />
        <div className="bg-primary pointer-events-none absolute right-0 bottom-0 h-100 w-100 translate-x-1/3 translate-y-1/3 rounded-full opacity-30 blur-[100px]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold tracking-widest text-[#a9d6e5] uppercase backdrop-blur-sm">
            <Building2 className="h-4 w-4" />
            For Clinic Owners
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Boost Your Clinic's <span className="text-[#a9d6e5]">Reach & Revenue</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light text-white/80 md:text-xl">
            Join the elite network of partner clinics. Connect with patients actively seeking
            high-quality physiotherapy in your local area.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="bg-primary shadow-primary/20 h-14 w-full rounded-xl px-8 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#012a4a] active:scale-95 sm:w-auto">
              Onboard Your Clinic
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
              <TrendingUp className="text-primary mb-3 h-8 w-8" />
              <h4 className="text-2xl font-bold text-[#012a4a]">10X Growth</h4>
              <p className="text-muted-foreground mt-1 text-sm">In Patient Footfall</p>
            </div>
            <div className="border-secondary/50 flex flex-col items-center justify-center border-b p-6 text-center md:border-r md:border-b-0">
              <ShieldCheck className="text-success mb-3 h-8 w-8" />
              <h4 className="text-2xl font-bold text-[#012a4a]">Zero Fees</h4>
              <p className="text-muted-foreground mt-1 text-sm">No Registration Costs</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Activity className="text-primary mb-3 h-8 w-8" />
              <h4 className="text-2xl font-bold text-[#012a4a]">Seamless</h4>
              <p className="text-muted-foreground mt-1 text-sm">Automated Booking System</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS (STEPS) --- */}
      <section className="mt-8 bg-white px-4 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-[#012a4a] md:text-4xl">
              How To Partner With Us
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              A transparent, four-step onboarding process for clinical facilities.
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
              Exclusive Benefits For Clinic Partners
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Tools and exposure designed to scale your physical practice.
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
              {/* Featured Image placeholder mimicking the clinic interior/doctor */}
              <div className="bg-secondary/20 border-border relative h-64 w-full shrink-0 overflow-hidden rounded-2xl border md:h-80 md:w-2/5">
                <img
                  src="/placeholder.jpg"
                  alt="Clinic Partner"
                  className="h-full w-full object-cover opacity-90"
                  onError={(e) =>
                    (e.currentTarget.src =
                      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800')
                  }
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#012a4a]/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-bold">Dr. Ananya Sharma</p>
                  <p className="text-secondary text-xs font-medium">Director, Zenith Care</p>
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
                  "Physiobuddies significantly increased our clinic's patient flow."
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed italic">
                  "Before partnering, we struggled with empty slots during mid-day hours. Now, the
                  automated booking system and targeted local visibility have completely transformed
                  our operational capacity. The zero registration fee made it a no-brainer."
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
            <p className="text-muted-foreground mt-4 text-lg">Clear answers for facility owners.</p>
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
                Ready to scale your facility?
              </h2>
              <p className="text-secondary/90 text-lg">
                Onboard your clinic today and join the most trusted network of physiotherapy
                professionals.
              </p>
            </div>
            <div className="w-full shrink-0 md:w-auto">
              <Button className="hover:bg-secondary h-16 w-full rounded-xl bg-white px-10 text-lg font-bold text-[#012a4a] shadow-xl transition-colors md:w-auto">
                Onboard Now
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
