import { motion } from 'framer-motion';
import { CheckCircle2, Copy, Gift } from 'lucide-react';
import { useState } from 'react';

interface BannerCard2Props {
  mainHeading?: string;
  subHeading?: string;
  coupon?: string;
}

export default function BannerCard2({
  mainHeading = 'Book 3, Get 1 Free',
  subHeading = 'Full recovery package with 1 complimentary session.',
  coupon = 'RECLAIM1',
}: BannerCard2Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div whileHover={{ y: -5 }} className="h-full p-1">
      <div className="border-secondary/50 relative flex h-48 flex-col justify-between overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#013a63]/10 px-3 py-1 text-xs font-bold tracking-wider text-[#013a63] uppercase">
              <Gift className="h-3 w-3" />
              {mainHeading}
            </span>
            <h3 className="mt-2 max-w-45 text-sm leading-tight font-semibold text-[#012a4a]">
              {subHeading}
            </h3>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="px-1 text-[10px] font-bold tracking-widest text-[#012a4a]/40 uppercase">
              Apply at checkout
            </span>
            <div
              onClick={handleCopy}
              className="group border-primary/30 bg-secondary/10 hover:bg-secondary/20 flex cursor-pointer items-center gap-2 rounded-xl border-2 border-dashed px-4 py-2 transition-colors"
            >
              <span className="text-primary font-mono font-bold tracking-tighter">
                {coupon.toUpperCase()}
              </span>
              {copied ? (
                <CheckCircle2 className="text-success h-4 w-4" />
              ) : (
                <Copy className="text-primary/40 group-hover:text-primary h-4 w-4 transition-colors" />
              )}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="border-secondary/20 flex h-12 w-12 items-center justify-center rounded-full border-4">
              <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
