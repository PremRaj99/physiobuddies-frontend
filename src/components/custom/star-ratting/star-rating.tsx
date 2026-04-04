import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  className?: string;
}

export default function StarRating({ rating, maxStars = 5, className }: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      // Full Star
      stars.push(<Star key={i} className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />);
    } else if (rating >= i - 0.5) {
      // Half Star
      stars.push(<StarHalf key={i} className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />);
    } else {
      // Empty Star (Subtle and clinical)
      stars.push(<Star key={i} className="text-muted-foreground/30 h-4 w-4 shrink-0" />);
    }
  }

  return <div className={cn('flex items-center gap-0.5', className)}>{stars}</div>;
}
