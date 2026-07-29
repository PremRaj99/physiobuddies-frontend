import { Building2, Home, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Location, TreatmentMode } from '../hooks/usePatientBookingFlow';

interface LocationCardProps {
  location: Location;
  mode: TreatmentMode;
}

export const LocationCard = ({ location, mode }: LocationCardProps) => {
  if (mode === 'online') return null; // No location needed for purely online

  return (
    <Card className="border-border gap-0 pt-0 shadow-sm">
      <CardHeader className="bg-secondary/20 py-4">
        <CardTitle className="flex items-center gap-2 text-lg text-[#013a63]">
          {mode === 'home_visit' ? <Home className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
          {mode === 'home_visit' ? 'Home Visit Address' : 'Clinic Location'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-6">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#014f86]" />
          <div>
            <p className="font-semibold text-[#012a4a]">{location.address}</p>
            {location.landmark && (
              <p className="text-muted-foreground mt-0.5 text-sm">Landmark: {location.landmark}</p>
            )}
            <p className="mt-1 text-sm text-[#012a4a]/80">
              {location.city}, {location.state} {location.postalCode}
            </p>
            <p className="text-muted-foreground text-sm">{location.country}</p>
          </div>
        </div>
        <div className="pt-3">
          <Button
            variant="outline"
            className="hover:bg-secondary/20 w-full border-[#014f86] text-[#014f86]"
          >
            View on Map
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
