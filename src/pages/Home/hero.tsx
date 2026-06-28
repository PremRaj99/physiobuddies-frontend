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
    <section className="min-h-body relative flex w-full items-center justify-center overflow-hidden bg-white px-4 py-6 md:px-8 lg:min-h-max lg:px-16 lg:py-8">
      {/* Background Decor */}
      <div className="bg-secondary/10 pointer-events-none absolute top-0 right-0 h-full w-1/4 translate-x-1/4 -skew-x-6" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-12">
        {/* --- AUTO-SCROLL GALLERY SECTION --- */}
        {/* Removed 'order' classes so it defaults to top on mobile. Used 'vh' to restrict height on mobile. */}
        <div className="flex h-[42vh] w-full justify-center gap-3 overflow-hidden mask-y-from-90% md:h-[45vh] lg:h-128 lg:justify-start">
          {[0, 1, 2].map((column) => (
            <div key={column} className="relative w-20 shrink-0 md:w-24 lg:w-28">
              <motion.div
                className="flex flex-col gap-3 lg:gap-4"
                animate={{
                  // Changed from fixed pixels (-1000) to precise percentages (-50%)
                  y: column % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'],
                }}
                transition={{
                  duration: 25 + column * 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {infiniteImages.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    className="border-secondary/20 bg-secondary/10 aspect-3/4 overflow-hidden rounded-xl border-2 shadow-md lg:rounded-2xl"
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
        <div className="z-10 flex flex-col items-center justify-center space-y-4 pb-2 lg:items-start lg:space-y-8 lg:pb-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-secondary/40 border-secondary hidden w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs text-[#013a63] lg:inline-flex lg:px-4 lg:py-2 lg:text-sm"
          >
            <Activity className="text-primary h-3 w-3 animate-pulse lg:h-4 lg:w-4" />
            Trust-Based Clinical Recovery
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:space-y-4"
          >
            <h1 className="text-center text-3xl leading-tight font-bold tracking-tight text-[#012a4a] md:text-start md:text-4xl lg:text-5xl">
              Relieve Pain, <br />
              Restore Movement, <br />
              <span className="text-primary italic">Revive Your Life</span>
            </h1>
            <p className="hidden max-w-[45ch] text-sm leading-relaxed text-[#012a4a]/70 lg:block lg:text-base">
              Specialized physiotherapy treatments designed to help you regain strength,
              flexibility, and freedom through clinical expertise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4 lg:w-auto"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary shadow-primary/20 group px-6 text-white shadow-lg transition-all hover:bg-[#013a63] lg:h-14 lg:px-8"
            >
              <Link to="/search" className="flex items-center justify-center gap-2 font-semibold">
                Book Appointment
                <motion.span whileHover={{ x: 5 }}>
                  <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
                </motion.span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="hover:bg-secondary/30 flex items-center justify-center border-[#013a63] px-6 text-[#013a63] transition-all lg:h-14 lg:px-8"
            >
              <Link to="/network/online">Join Our Network</Link>
            </Button>
          </motion.div>

          {/* Verification Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 pt-1 text-xs font-medium text-[#012a4a]/60 lg:pt-2 lg:text-sm"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-secondary flex h-6 w-6 items-center justify-center rounded-full border-2 border-white lg:h-8 lg:w-8"
                >
                  <ShieldCheck className="h-3 w-3 text-[#013a63] lg:h-4 lg:w-4" />
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
