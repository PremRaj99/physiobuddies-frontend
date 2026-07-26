import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, ArrowRight, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StarRating from '@/components/custom/star-rating/star-rating';

type Therapist = {
  id: string;
  name: string;
  specializations: string[] | undefined;
  experience: number | undefined;
  rating: number | null;
  totalReviews: number;
  originalPrice: number | null;
  discountedPrice: number;
  displayAddress: string;
  image: string | null;
  distance: number | undefined; // Now utilized in the UI
};

export default function TherapistCard({
  id,
  image,
  name,
  specializations = [],
  rating = null,
  totalReviews = 0,
  experience = 0,
  originalPrice = 0,
  discountedPrice = 0,
  displayAddress,
  distance,
}: Therapist) {
  const navigate = useNavigate();
  const specs = specializations.map((s: string) => s.split(' ')[0]);
  const discount =
    originalPrice && discountedPrice && originalPrice > discountedPrice
      ? Math.round(100 - (discountedPrice / originalPrice) * 100)
      : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/physio/${id}`)}
      className="group border-border hover:shadow-primary/5 hover:border-primary/30 flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl sm:flex-row"
    >
      {/* --- Image Section --- */}
      <div className="bg-secondary/10 relative h-64 shrink-0 overflow-hidden sm:h-auto sm:w-2/5">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#012a4a]/90 via-[#012a4a]/20 to-transparent" />
        <img
          src={image || '/placeholder.jpg'}
          alt={`Dr. ${name}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle gradient to ensure the image doesn't wash out the badge */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#012a4a]/20 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-1.5 shadow-sm backdrop-blur-md">
          <ShieldCheck className="text-success h-4 w-4" />
          <span className="text-[10px] font-bold tracking-wider text-[#012a4a] uppercase">
            Verified
          </span>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="flex w-full grow flex-col p-5 sm:p-6">
        {/* Header */}
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="group-hover:text-primary text-xl font-bold text-[#012a4a] transition-colors">
              Dr. {name} <span className="text-sm font-medium text-[#012a4a]/50">(PT)</span>
            </h3>
            <p className="text-primary mt-1 text-sm font-semibold">{experience} Years Experience</p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3 mb-4 flex flex-wrap gap-2">
          {specs.slice(0, 3).map((spec, i) => (
            <span
              key={i}
              className="bg-secondary/30 border-secondary/50 rounded-md border px-2.5 py-1 text-xs font-semibold text-[#013a63]"
            >
              {spec}
            </span>
          ))}
          {specs.length > 3 && (
            <span className="bg-muted border-border rounded-md border px-2.5 py-1 text-xs font-semibold text-[#012a4a]/70">
              +{specs.length - 3}
            </span>
          )}
        </div>

        {/* Stats Row (Now includes Distance) */}
        <div className="border-secondary/50 mt-auto flex flex-wrap items-center gap-3 border-b pb-4 text-sm">
          <div className="flex items-center gap-1.5 text-[#012a4a]/70" title={displayAddress}>
            <MapPin className="text-primary/60 h-4 w-4 shrink-0" />
            <span className="max-w-30 truncate font-medium">{displayAddress}</span>
          </div>

          {distance !== undefined && (
            <>
              <div className="bg-border h-1 w-1 shrink-0 rounded-full" />
              <div className="flex items-center gap-1.5 text-[#012a4a]/70">
                <Navigation className="text-primary/60 h-3.5 w-3.5 shrink-0" />
                <span className="font-medium">{distance.toFixed(1)} km</span>
              </div>
            </>
          )}

          {rating !== null && (
            <>
              <div className="bg-border h-1 w-1 shrink-0 rounded-full" />
              <div className="flex items-center gap-1.5">
                <StarRating rating={rating} />
                <span className="text-xs font-medium text-[#012a4a]/50">({totalReviews})</span>
              </div>
            </>
          )}
        </div>

        {/* Action Row */}
        <div className="flex items-end justify-between pt-4">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#012a4a]">₹{discountedPrice}</span>
              {discount > 0 && (
                <span className="text-success bg-success/10 rounded px-1.5 py-0.5 text-xs font-bold tracking-wider uppercase">
                  Save {discount}%
                </span>
              )}
            </div>
            {originalPrice && discountedPrice < originalPrice ? (
              <span className="mt-0.5 text-xs font-medium text-[#012a4a]/40 line-through">
                ₹{originalPrice} / session
              </span>
            ) : (
              <span className="mt-0.5 text-xs font-medium text-transparent select-none">
                Spacer
              </span> // Maintains height consistency across cards even if no original price exists
            )}
          </div>

          <Button
            className="bg-primary shadow-primary/20 h-10 rounded-xl px-5 text-white shadow-md transition-all hover:bg-[#013a63] hover:shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/physio/${id}#slots`);
            }}
          >
            Book
            <ArrowRight className="-mr-1 ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
