import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AuraMedicalCTA = () => {
  const messages = ['Relieve Pain', 'Restore Movement', 'Revive Your Life'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-24">
      {/* Background Decor - Subtle Clinical Blurs */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-full w-full -translate-x-1/2">
        <div className="bg-secondary/30 absolute top-[-10%] left-[10%] h-96 w-96 rounded-full blur-[120px]" />
        <div className="bg-primary/5 absolute right-[10%] bottom-[-10%] h-96 w-96 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary/40 border-secondary mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium text-[#013a63]"
        >
          <span className="relative flex h-2 w-2">
            <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
            <span className="bg-success relative inline-flex h-2 w-2 rounded-full"></span>
          </span>
          Clinical Excellence in Wellness
        </motion.div>

        {/* The Typed Headline */}
        <div className="mb-4 flex min-h-35 flex-col items-center justify-center">
          <h2 className="mb-2 text-5xl font-bold tracking-tight text-[#012a4a] md:text-5xl">
            We help you
          </h2>
          <div className="flex h-20 items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={messages[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-primary text-5xl font-bold tracking-tight md:text-5xl"
              >
                {messages[index]}.
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-[#012a4a]/70">
          Expert-led physiotherapy designed to bridge the gap between clinical precision and
          holistic recovery.
        </p>

        {/* Floating Interaction Zone */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Button
              size="lg"
              className="bg-primary shadow-primary/20 group h-14 rounded-2xl px-8 text-lg text-white shadow-xl transition-all hover:bg-[#013a63]"
            >
              <Search className="mr-2 h-5 w-5" />
              Find Your Physio
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:bg-secondary/20 h-14 rounded-2xl bg-white/50 px-8 text-lg text-[#012a4a] backdrop-blur-sm transition-all"
            >
              <MessageCircle className="mr-2 h-5 w-5 text-[#013a63]" />
              Talk to an Expert
            </Button>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex items-center justify-center gap-8 opacity-50 grayscale transition-all duration-700 hover:grayscale-0">
          {/* Replace with actual partner/accreditation logos */}
          <span className="text-xs font-bold tracking-widest text-[#012a4a]">
            ACCREDITED CLINIC
          </span>
          <span className="text-xs font-bold tracking-widest text-[#012a4a]">
            ISO 9001 CERTIFIED
          </span>
          <span className="text-xs font-bold tracking-widest text-[#012a4a]">HCPC REGISTERED</span>
        </div>
      </div>
    </section>
  );
};

export default AuraMedicalCTA;
