import { Button } from '@/components/ui/button';
import { injuriesAndConditions } from '@/data/dummy/injuriesAndConditions';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import OurExpertiseCard from './our-expertise-card';

export default function OurExpertise() {
  const [showAll, setShowAll] = useState(false);

  const displayCards = showAll ? injuriesAndConditions : injuriesAndConditions.slice(0, 6);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Smooth cascade effect
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-secondary/20 min-h-screen px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          variants={headerVariants}
          className="mb-16 space-y-4 text-center"
        >
          <div className="text-primary flex items-center justify-center gap-2 text-sm font-semibold tracking-wide uppercase">
            <Activity className="h-4 w-4" />
            Clinical Excellence
          </div>
          <h2 className="text-4xl font-bold text-[#012a4a] md:text-5xl">
            Our <span className="text-primary italic">Expertise</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#012a4a]/70">
            Comprehensive care for more than{' '}
            <span className="text-success font-bold underline decoration-2 underline-offset-4">
              300+
            </span>{' '}
            musculoskeletal conditions treated by our senior specialists.
          </p>
        </motion.div>

        {/* Grid Section */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayCards.map((condition, index) => (
              <motion.div
                key={condition.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                variants={containerVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <OurExpertiseCard condition={condition} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Action Button */}
        <div className="mt-12 flex justify-center">
          {injuriesAndConditions.length > 6 && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="border-primary text-primary hover:bg-primary h-12 rounded-full px-8 transition-all duration-300 hover:text-white"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Explore More Conditions <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
