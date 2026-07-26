import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
import { Building2, ArrowRight, Image as ImageIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import StarRating from '@/components/custom/star-rating/star-rating';
import { toast } from 'sonner';

interface ClinicCardProps {
  images?: string[];
  name?: string;
  desc?: string;
  rating?: number;
  amount?: number;
  finalAmount?: number;
}

export default function ClinicCard({
  images = [],
  name = '',
  desc = '',
  rating = 0,
  amount = 0,
  finalAmount = 0,
}: ClinicCardProps) {
  //   const navigate = useNavigate();

  const discount = useMemo(() => {
    if (!amount || !finalAmount || amount <= finalAmount) return 0;
    return Math.round(100 - (finalAmount / amount) * 100);
  }, [amount, finalAmount]);

  const handleNavigate = (e?: React.MouseEvent) => {
    e?.preventDefault();
    toast.info('Clinic services are coming soon! Stay tuned for updates.');
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleNavigate();
  };

  if (!images || images.length === 0) {
    return (
      <div className="bg-secondary/10 border-border flex h-full min-h-75 flex-col items-center justify-center rounded-3xl border p-8 text-center">
        <ImageIcon className="text-primary/30 mb-3 h-12 w-12" />
        <p className="font-medium text-[#012a4a]/60">No clinic imagery available</p>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group border-border hover:shadow-primary/5 flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      {/* Shadcn Image Carousel Section */}
      <div className="bg-secondary/20 relative h-56 w-full shrink-0 sm:h-64">
        <Carousel className="h-full w-full" opts={{ loop: true }}>
          <CarouselContent className="ml-0 h-full">
            {images.map((img, index) => (
              <CarouselItem key={index} className="relative h-full pl-0">
                <img
                  src={img}
                  alt={`${name} facility view ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                  }}
                />
                {/* Subtle gradient overlay to ensure UI elements on top remain visible */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#012a4a]/40 to-transparent" />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom positioned Carousel Controls */}
          {images.length > 1 && (
            <>
              <CarouselPrevious className="hover:text-primary left-3 h-8 w-8 border-none bg-white/80 text-[#012a4a] backdrop-blur-md transition-colors hover:bg-white" />
              <CarouselNext className="hover:text-primary right-3 h-8 w-8 border-none bg-white/80 text-[#012a4a] backdrop-blur-md transition-colors hover:bg-white" />
            </>
          )}
        </Carousel>

        {/* Clinic Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-lg bg-white/90 px-2.5 py-1.5 shadow-sm backdrop-blur-sm">
          <Building2 className="h-3.5 w-3.5 text-[#013a63]" />
          <span className="text-[10px] font-bold tracking-wider text-[#012a4a] uppercase">
            Verified Clinic
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex grow flex-col p-5 sm:p-6">
        <div
          className="mb-2 flex cursor-pointer items-start justify-between"
          onClick={handleNavigate}
        >
          <div>
            <h3 className="group-hover:text-primary line-clamp-1 text-xl font-bold text-[#012a4a] transition-colors">
              {name}
            </h3>
            <p
              className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#012a4a]/70"
              title={desc}
            >
              {desc}
            </p>
          </div>
        </div>

        <div className="border-secondary/50 mt-auto border-b py-3">
          <StarRating rating={rating} />
        </div>

        {/* Pricing & Actions */}
        <div className="flex flex-col justify-between gap-4 pt-4 sm:flex-row sm:items-end">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#012a4a]">
                ₹{finalAmount.toLocaleString('en-IN')}
              </span>
              {discount > 0 && (
                <span className="text-success bg-success/10 rounded px-1.5 py-0.5 text-xs font-bold tracking-wider uppercase">
                  {discount}% OFF
                </span>
              )}
            </div>
            {amount > finalAmount && (
              <span className="mt-0.5 text-xs font-medium text-[#012a4a]/40 line-through">
                ₹{amount.toLocaleString('en-IN')} / consultation
              </span>
            )}
          </div>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            <Button
              variant="outline"
              className="border-border hover:bg-secondary/20 hover:text-primary h-10 w-full rounded-xl text-[#013a63] transition-colors sm:w-auto"
              onClick={handleNavigate}
            >
              Details
            </Button>
            <Button
              className="bg-primary shadow-primary/20 h-10 w-full rounded-xl text-white shadow-md transition-all hover:bg-[#013a63] sm:w-auto"
              onClick={handleBookNow}
            >
              Book
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
