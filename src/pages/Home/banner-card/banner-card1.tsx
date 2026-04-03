import { motion } from 'framer-motion';
import { Sparkles, Ticket, TrendingDown } from 'lucide-react';

interface BannerProps {
  mainHeading?: string;
  subHeading?: string;
  dummyRate?: number;
  realRate?: number;
}

export default function BannerCard1({
  mainHeading = 'Limited Time Offer',
  subHeading = 'Trusted by 10,000+ patients',
  dummyRate = 1499,
  realRate = 799,
}: BannerProps) {
  const savings = dummyRate - realRate;

  return (
    <motion.div whileHover={{ y: -5 }} className="h-full p-1">
      <div className="border-secondary/50 relative flex h-48 flex-col justify-between overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Decorative Background Icon */}
        <TrendingDown className="text-secondary/10 absolute -right-4 -bottom-4 h-24 w-24 -rotate-12" />

        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="h-3 w-3" />
              {mainHeading}
            </span>
            <h3 className="mt-2 max-w-45 text-sm leading-tight font-semibold text-[#012a4a]">
              {subHeading}
            </h3>
          </div>

          <div className="bg-success/10 text-success flex flex-col items-center rounded-lg px-3 py-1.5 text-xs font-bold">
            <span className="text-[10px] uppercase opacity-70">Save</span>₹{savings}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-[#012a4a]/40 line-through">₹{dummyRate}</span>
            <span className="text-2xl font-bold text-[#013a63]">
              ₹{realRate}
              <span className="ml-1 text-xs font-normal text-[#012a4a]/50">/session</span>
            </span>
          </div>

          <button className="bg-secondary/30 text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-white">
            <Ticket className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
