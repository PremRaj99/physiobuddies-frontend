import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OfferedServiceProps {
  title: string;
  subheading: string;
  img: string;
  p: string;
}

export default function OfferedServiceCard({ title, subheading, img, p }: OfferedServiceProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="group border-border/50 grid items-center gap-10 border-b py-10 md:grid-cols-[1.1fr_1fr]"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden rounded-xl md:h-64">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      {/* Content */}
      <div className="flex h-full flex-col justify-between">
        {/* Top Content */}
        <div>
          {/* Accent + Label Row */}
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-primary h-0.5 w-8" />
            <span className="text-primary/70 text-[11px] font-semibold tracking-widest uppercase">
              Service
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-2 text-[22px] leading-snug font-semibold text-[#012a4a] md:text-2xl">
            {title}
          </h2>

          {/* Subheading */}
          <p className="mb-4 text-sm font-medium text-[#014f86]">{subheading}</p>

          {/* Description */}
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">{p}</p>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Link to="/physio">
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary h-10 px-5 transition-all hover:text-white"
            >
              <span className="font-medium">Book Consultation</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
