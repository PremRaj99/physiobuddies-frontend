import { Award, Home, MapPin, ShieldCheck, Video } from 'lucide-react';
import StarRating from '@/components/custom/star-rating/star-rating';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { TherapistDetail } from '@/services/therapist.service';

interface PhysioProfileCardProps {
  physio: TherapistDetail;
}

export function PhysioProfileCard({ physio }: PhysioProfileCardProps) {
  return (
    <Card className="bg-background mb-8 overflow-hidden border-none py-0 shadow-xl shadow-[#012a4a]/5">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-2/5">
          <img
            src={physio.image || '/placeholder.jpg'}
            alt={physio.name}
            className="h-75 w-full object-cover object-top md:h-full"
          />
          {physio.distance !== null && (
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-white/90 text-[#012a4a] backdrop-blur-sm">
                {physio.distance.toFixed(1)} km away
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="flex flex-col justify-center p-6 sm:p-8 md:w-3/5">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-3xl font-bold text-[#012a4a]">
                Dr. {physio.name}
                <ShieldCheck className="text-primary h-6 w-6" />
              </h1>
              <p className="mt-1 font-medium text-[#013a63]">Physiotherapist (PT)</p>
            </div>
          </div>

          <div className="mt-4 mb-6 flex flex-wrap gap-2">
            {(physio.specializations ?? []).map((spec, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="bg-secondary/30 border-secondary text-[#013a63]"
              >
                {spec}
              </Badge>
            ))}
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4 text-sm text-[#012a4a]/80">
            <div className="flex items-center gap-2">
              <Award className="text-primary h-4 w-4" />
              {physio.experience ?? 0} Years Experience
            </div>
            <div className="flex items-center gap-2">
              <StarRating rating={physio.rating ?? 0} />
              <span className="font-medium">
                {physio.rating ?? 0} ({physio.totalReviews})
              </span>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <MapPin className="text-primary h-4 w-4 shrink-0" />
              {physio.displayAddress}
            </div>
          </div>

          <Separator className="mb-4" />

          <div className="flex items-center gap-6">
            <div className="text-primary flex items-center gap-2 font-medium">
              <Home className="h-5 w-5" /> Home Visit Available
            </div>
            <div className="text-success flex items-center gap-2 font-medium">
              <Video className="h-5 w-5" /> Online Consultation
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
