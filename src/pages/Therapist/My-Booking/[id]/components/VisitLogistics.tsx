import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface LocationInfo {
  address?: string;
  landmark?: string | null;
  city?: string;
  state?: string;
  postalCode?: string;
}

interface VisitLogisticsProps {
  location?: LocationInfo;
}

export const VisitLogistics = ({ location }: VisitLogisticsProps) => {
  const handleOpenGoogleMaps = () => {
    if (!location) return;
    const query = encodeURIComponent(
      `${location.address || ''}, ${location.city || ''}, ${location.state || ''} ${location.postalCode || ''}`,
    );
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <Card className="border-border bg-white pt-0 shadow-sm">
      <CardHeader className="bg-secondary/20 py-4">
        <CardTitle className="flex items-center gap-2 text-lg text-[#013a63]">
          <MapPin className="h-5 w-5 text-[#014f86]" /> Visit Logistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-muted-foreground text-xs font-bold uppercase opacity-60">
            Full Address
          </Label>
          <p className="mt-1 text-sm font-semibold text-[#012a4a]">{location?.address}</p>
        </div>
        {location?.landmark && (
          <div>
            <Label className="text-muted-foreground text-xs font-bold uppercase opacity-60">
              Landmark
            </Label>
            <p className="text-sm text-[#012a4a]">{location.landmark}</p>
          </div>
        )}
        <div>
          <Label className="text-muted-foreground text-xs font-bold uppercase opacity-60">
            City/State
          </Label>
          <p className="text-sm text-[#012a4a]">
            {location?.city}, {location?.state} - {location?.postalCode}
          </p>
        </div>
        <Separator />
        <Button
          variant="outline"
          onClick={handleOpenGoogleMaps}
          className="h-11 w-full border-[#014f86] text-[#014f86] hover:bg-[#a9d6e5]/20"
        >
          <MapPin className="mr-2 h-4 w-4" /> Open in Google Maps
        </Button>
      </CardContent>
    </Card>
  );
};
