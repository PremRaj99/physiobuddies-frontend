import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import physio from '@/assets/contact-images/Physio.gif';

const floatVariant: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
};

interface ContactInfoCardProps {
  fadeUpVariant: Variants;
}

export const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ fadeUpVariant }) => {
  return (
    <motion.div variants={fadeUpVariant} className="flex flex-col space-y-6">
      <div className="space-y-3">
        <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
          Physiobuddies
        </span>
        <h2 className="text-2xl leading-tight font-bold text-[#012a4a] md:text-3xl">
          Relieve Pain, Restore Movement.
        </h2>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
          Get expert physiotherapy to reduce pain and improve mobility. Reach out to our specialists
          today.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 pt-2">
        <div className="flex items-center gap-3">
          <div className="bg-secondary/30 text-primary rounded-lg p-2">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Location
            </p>
            <p className="text-sm font-semibold text-[#012a4a]">Dehradun, UK</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-secondary/30 text-primary rounded-lg p-2">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Support
            </p>
            <p className="text-sm font-semibold text-[#012a4a]">24/7 Assistance</p>
          </div>
        </div>
      </div>

      <motion.div variants={floatVariant} animate="animate" className="hidden pt-4 lg:block">
        <img
          src={physio}
          alt="Physiotherapy"
          className="h-auto w-full max-w-xs rounded-3xl object-cover shadow-xl shadow-[#014f86]/5"
        />
      </motion.div>
    </motion.div>
  );
};
