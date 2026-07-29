import { motion, type Variants } from 'framer-motion';
import { Activity, ArrowRight, Globe2, ShieldCheck, Star, Video } from 'lucide-react';
import Footer from '@/components/custom/footer/footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useOnlineNetwork } from './hooks/useOnlineNetwork';
import { OnlineNetworkBenefits } from './components/OnlineNetworkBenefits';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function OnlineNetwork() {
  const { benefits, steps, faqs } = useOnlineNetwork();

  return (
    <div className="bg-background flex min-h-screen flex-col font-sans">
      <section className="relative overflow-hidden bg-[#013a63] px-4 py-20 md:py-28 lg:px-8">
        <div className="pointer-events-none absolute top-0 left-0 h-125 w-125 -translate-x-1/4 -translate-y-1/4 rounded-full bg-[#014f86] opacity-40 blur-[120px]" />
        <div className="bg-primary pointer-events-none absolute right-0 bottom-0 h-100 w-100 translate-x-1/3 translate-y-1/3 rounded-full opacity-30 blur-[100px]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold tracking-widest text-[#a9d6e5] uppercase backdrop-blur-sm">
            <Video className="h-4 w-4" />
            Telehealth & Online Consultations
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Deliver High-Impact <span className="text-[#a9d6e5]">Online Care</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light text-white/80 md:text-xl">
            Connect with patients anywhere. Provide digital exercise programs, virtual assessments,
            and tele-rehab sessions on your schedule.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="bg-primary shadow-primary/20 h-14 w-full rounded-xl px-8 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#012a4a] active:scale-95 sm:w-auto">
              Join Online Network
            </Button>
          </div>
        </motion.div>
      </section>

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
              <h4 className="text-2xl font-bold text-[#012a4a]">Nationwide</h4>
              <p className="text-muted-foreground mt-1 text-sm">Patient Reach</p>
            </div>
            <div className="border-secondary/50 flex flex-col items-center justify-center border-b p-6 text-center md:border-r md:border-b-0">
              <ShieldCheck className="text-success mb-3 h-8 w-8" />
              <h4 className="text-2xl font-bold text-[#012a4a]">Encrypted</h4>
              <p className="text-muted-foreground mt-1 text-sm">HD Video Calls</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Activity className="text-primary mb-3 h-8 w-8" />
              <h4 className="text-2xl font-bold text-[#012a4a]">Smart Tools</h4>
              <p className="text-muted-foreground mt-1 text-sm">Digital Prescriptions</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mt-8 bg-white px-4 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-[#012a4a] md:text-4xl">How Tele-Rehab Works</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Four simple steps to start consulting online.
            </p>
          </div>

          <div className="relative">
            <div className="bg-secondary/40 absolute top-12 left-0 hidden h-0.5 w-full lg:block" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8"
            >
              {steps.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUpVariant}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="bg-secondary/30 shadow-primary/5 mb-6 flex h-24 w-24 items-center justify-center rounded-full border-8 border-white text-[#013a63] shadow-xl">
                    <Video className="h-8 w-8" />
                  </div>
                  <div className="text-primary mb-2 text-sm font-bold tracking-widest uppercase">
                    Step {item.step}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-[#012a4a]">{item.title}</h3>
                  <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <OnlineNetworkBenefits
        benefits={benefits}
        staggerContainer={staggerContainer}
        fadeUpVariant={fadeUpVariant}
      />

      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[2.5rem] bg-[#012a4a] p-1 shadow-2xl"
          >
            <div className="flex flex-col items-center gap-10 rounded-[2.25rem] bg-white p-8 md:flex-row md:p-12">
              <div className="bg-secondary/20 border-border relative h-64 w-full shrink-0 overflow-hidden rounded-2xl border md:h-80 md:w-2/5">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                  alt="Online Therapist"
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#012a4a]/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-bold">Dr. Rohan Verma</p>
                  <p className="text-secondary text-xs font-medium">Sports Rehab Specialist</p>
                </div>
              </div>

              <div className="w-full space-y-6 md:w-3/5">
                <div className="flex gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <h3 className="text-2xl leading-tight font-bold text-[#012a4a] md:text-3xl">
                  "Online consultations allowed me to expand my patient base nationwide."
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed italic">
                  "The HD video interface and integrated exercise prescription builder make remote
                  physiotherapy feel just as effective as in-person visits."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/5 border-border border-t px-4 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#012a4a] md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Clear answers about online consulting.
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

      <section className="bg-white px-4 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#013a63] shadow-2xl"
        >
          <div className="bg-primary absolute -top-24 -left-24 h-64 w-64 rounded-full opacity-40 blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 p-12 text-center md:flex-row md:p-16 md:text-left">
            <div className="max-w-xl">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Ready to start tele-rehab consulting?
              </h2>
              <p className="text-secondary/90 text-lg">
                Join our online network today and deliver expert physical care to patients anywhere.
              </p>
            </div>
            <div className="w-full shrink-0 md:w-auto">
              <Button className="hover:bg-secondary h-16 w-full rounded-xl bg-white px-10 text-lg font-bold text-[#012a4a] shadow-xl transition-colors md:w-auto">
                Join Network Now
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
