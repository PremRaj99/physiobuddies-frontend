'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Stethoscope, ArrowRight } from 'lucide-react';

interface ConditionProps {
  condition: {
    name: string;
    image: string;
    description: { name: string; description: string }[];
  };
}

export default function OurExpertiseCard({ condition }: ConditionProps) {
  const navigate = useNavigate();
  const { name, image, description } = condition;
  const [isOpen, setIsOpen] = useState(false);

  const handleConsultation = (item?: { name: string; description: string }) => {
    if (item) {
      sessionStorage.setItem('conditionName', item.name);
      sessionStorage.setItem('conditionDes', item.description);
    }
    navigate('/physio');
  };

  // Subdued, elegant animation variants for the compact card
  const cardVariants: Variants = {
    initial: { y: 0, boxShadow: '0 2px 4px -2px rgb(0 0 0 / 0.05)' },
    hover: {
      y: -2,
      boxShadow: '0 10px 15px -3px rgb(1 79 134 / 0.08), 0 4px 6px -4px rgb(1 79 134 / 0.04)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const imageVariants: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.08, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const arrowVariants: Variants = {
    initial: { x: 0, color: 'var(--muted-foreground)' },
    hover: { x: 3, color: 'var(--primary)', transition: { duration: 0.2 } },
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial="initial"
          whileHover="hover"
          variants={cardVariants}
          className="group border-border flex h-28 w-full cursor-pointer flex-row items-center rounded-[20px] border bg-white p-2"
        >
          {/* Left Side: Compact Framed Image */}
          <div className="relative h-full w-24 shrink-0 overflow-hidden rounded-[14px]">
            <motion.img
              variants={imageVariants}
              src={image}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            {/* Subtle inner shadow to frame the clinical image */}
            <div className="absolute inset-0 rounded-[14px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]" />
          </div>

          {/* Right Side: Content Area */}
          <div className="flex h-full grow flex-col justify-between overflow-hidden py-1 pl-3">
            <div>
              <h3 className="truncate text-sm leading-tight font-bold text-[#012a4a]">{name}</h3>

              {/* Compact Clinical Tags (Limited to 2 for space) */}
              <div className="mt-1.5 flex h-5 flex-wrap gap-1.5 overflow-hidden">
                {description.slice(0, 2).map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-secondary/30 max-w-full truncate rounded-full border border-[#a9d6e5]/40 px-2 py-0.5 text-[10px] font-medium text-[#014f86]"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="mt-auto flex items-center justify-between pr-1">
              <span className="text-muted-foreground text-[9px] font-bold tracking-widest uppercase">
                +{description.length - 2} Treatments
              </span>
              <motion.div
                variants={arrowVariants}
                className="bg-secondary/20 group-hover:bg-primary/10 rounded-full p-1.5 transition-colors"
              >
                <ArrowRight className="h-3 w-3" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </DialogTrigger>

      {/* Elegant Modal Content (Remains Spacious & Detailed) */}
      <DialogContent className="border-border max-w-md overflow-hidden rounded-3xl bg-white p-0 shadow-2xl">
        <div className="flex max-h-[85vh] flex-col">
          {/* Header Area */}
          <div className="relative h-48 w-full shrink-0">
            <img src={image} alt={name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent" />

            <div className="absolute bottom-4 left-6">
              <div className="flex items-center gap-2">
                <div className="bg-primary rounded-lg p-1.5 text-white shadow-sm">
                  <Stethoscope className="h-4 w-4" />
                </div>
                <DialogTitle className="text-2xl font-bold text-[#012a4a]">{name}</DialogTitle>
              </div>
            </div>
          </div>

          {/* Treatment List Section */}
          <div className="custom-scrollbar grow overflow-y-auto p-6">
            <p className="mb-4 text-[11px] font-bold tracking-widest text-[#012a4a]/60 uppercase">
              Clinical Conditions Treated
            </p>

            <div className="space-y-2.5">
              {description.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleConsultation(item)}
                  className="border-border hover:border-primary/40 hover:bg-secondary/10 group flex cursor-pointer items-center justify-between rounded-xl border bg-white p-3.5 transition-all duration-200 hover:shadow-sm"
                >
                  <div className="space-y-1 pr-4">
                    <h4 className="group-hover:text-primary text-sm font-bold text-[#012a4a] transition-colors">
                      {item.name}
                    </h4>
                    <p className="line-clamp-2 text-xs leading-relaxed text-[#012a4a]/70">
                      {item.description}
                    </p>
                  </div>
                  <div className="bg-secondary/30 group-hover:bg-primary rounded-full p-2 transition-colors group-hover:text-white">
                    <ArrowRight className="text-primary h-3.5 w-3.5 group-hover:text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compact Footer */}
          <div className="border-border shrink-0 border-t bg-gray-50/50 p-5">
            <Button
              onClick={() => handleConsultation()}
              className="bg-primary h-12 w-full rounded-xl text-sm font-bold shadow-md transition-all hover:bg-[#013a63] active:scale-[0.98]"
            >
              Book General Consultation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
