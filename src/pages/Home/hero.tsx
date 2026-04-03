import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Image imports
import newScroll1 from '@/assets/scroll-images/new-scroll-1.png';
import newScroll2 from '@/assets/scroll-images/new-scroll-2.png';
import newScroll3 from '@/assets/scroll-images/new-scroll-3.png';
import newScroll4 from '@/assets/scroll-images/new-scroll-4.png';

const scrollImages = [newScroll1, newScroll2, newScroll3, newScroll4];

export default function Hero() {
  // Duplicating images for a seamless infinite loop
  const infiniteImages = [...scrollImages, ...scrollImages];

  return (
    <section className="relative flex w-full items-center overflow-hidden bg-white px-4 py-8 md:px-8 lg:px-16">
      {/* Background Decor */}
      <div className="bg-secondary/10 pointer-events-none absolute top-0 right-0 h-full w-1/4 translate-x-1/4 -skew-x-6" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* --- AUTO-SCROLL GALLERY SECTION --- */}
        <div className="mask-fade-edges order-2 flex h-112.5 justify-center gap-4 overflow-hidden lg:order-1 lg:justify-start">
          {[0, 1, 2].map((column) => (
            <div key={column} className="relative w-24 shrink-0 md:w-28">
              <motion.div
                className="flex flex-col gap-4"
                animate={{
                  y: column % 2 === 0 ? [0, -1000] : [-1000, 0],
                }}
                transition={{
                  duration: 25 + column * 5, // Varied speeds for organic feel
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {infiniteImages.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    className="border-secondary/20 bg-secondary/10 aspect-3/4 overflow-hidden rounded-2xl border-2 shadow-md"
                  >
                    <img
                      src={img}
                      alt="Clinic"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="order-1 space-y-8 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-secondary/40 border-secondary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-[#013a63]"
          >
            <Activity className="text-primary h-4 w-4 animate-pulse" />
            Trust-Based Clinical Recovery
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl leading-tight font-bold tracking-tight text-[#012a4a] md:text-5xl">
              Relieve Pain, <br />
              Restore Movement, <br />
              <span className="text-primary italic">Revive Your Life</span>
            </h1>
            <p className="max-w-[45ch] text-base text-[#012a4a]/70">
              Specialized physiotherapy treatments designed to help you regain strength,
              flexibility, and freedom through clinical expertise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary shadow-primary/20 group h-14 rounded-full px-8 text-white shadow-lg transition-all hover:bg-[#013a63]"
            >
              <Link to="/physio" className="flex items-center gap-2 font-semibold">
                Book Appointment
                <motion.span whileHover={{ x: 5 }}>
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="hover:bg-secondary/30 h-14 rounded-full border-[#013a63] px-8 text-[#013a63] transition-all"
            >
              <Link to="/physio-registration">Join Our Network</Link>
            </Button>
          </motion.div>

          {/* Verification Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 pt-2 text-sm font-medium text-[#012a4a]/60"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-secondary flex h-8 w-8 items-center justify-center rounded-full border-2 border-white"
                >
                  <ShieldCheck className="h-4 w-4 text-[#013a63]" />
                </div>
              ))}
            </div>
            <span>Verified Medical Specialists</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
