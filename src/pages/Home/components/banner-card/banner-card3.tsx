import { motion } from 'framer-motion';
import { ShieldCheck, Star } from 'lucide-react';

interface BannerCard3Props {
  mainHeading?: string;
  subHeading?: string;
  rating?: number;
}

export default function BannerCard3({
  mainHeading = 'Trusted Network',
  subHeading = '100% Verified Clinical Physiotherapists',
  rating = 4.9,
}: BannerCard3Props) {
  return (
    <motion.div whileHover={{ y: -5 }} className="h-full p-1">
      <div className="border-secondary/50 relative flex h-48 flex-col justify-between overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Background Graphic */}
        <ShieldCheck className="text-success/5 absolute -right-4 -bottom-4 h-24 w-24 -rotate-12" />

        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="bg-success/10 text-success inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="h-3 w-3" />
              {mainHeading}
            </span>
            <h3 className="mt-2 max-w-45 text-sm leading-tight font-semibold text-[#012a4a]">
              {subHeading}
            </h3>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < 4 ? 'fill-primary text-primary' : 'fill-primary/20 text-primary/20'}`}
                />
              ))}
            </div>
            <span className="text-lg font-bold text-[#012a4a]">{rating}</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#012a4a]/50">
            <div className="bg-secondary/40 flex h-5 w-5 items-center justify-center rounded">
              <span className="text-primary text-[10px] font-bold">G</span>
            </div>
            Based on 1,200+ Patient Reviews
          </div>
        </div>
      </div>
    </motion.div>
  );
}
