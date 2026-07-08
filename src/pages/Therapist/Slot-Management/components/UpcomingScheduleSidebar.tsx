import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, Home, ShieldCheck, User, Video, Building2 } from 'lucide-react';
import { MOCK_BOOKINGS } from '../utils';

const getModeIcon = (mode: string) => {
  switch (mode) {
    case 'home_visit':
      return <Home className="h-3 w-3" />;
    case 'online':
      return <Video className="h-3 w-3" />;
    case 'clinic':
      return <Building2 className="h-3 w-3" />;
    default:
      return <User className="h-3 w-3" />;
  }
};

export const UpcomingScheduleSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-border sticky top-24 gap-0 bg-white py-0 shadow-sm">
        <CardHeader className="rounded-t-xl bg-[#012a4a] py-5 text-white">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="h-5 w-5 text-[#a9d6e5]" /> Upcoming 3 Days
          </CardTitle>
          <CardDescription className="text-gray-300">
            Review your immediate upcoming schedule to avoid conflicts.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-border/60 divide-y">
            {MOCK_BOOKINGS.map((booking) => (
              <div key={booking.id} className="p-4 transition-colors hover:bg-gray-50">
                <div className="mb-2 flex items-start justify-between">
                  <h4 className="truncate pr-2 font-bold text-[#012a4a]">{booking.patientName}</h4>
                  <Badge
                    variant="outline"
                    className="border-border flex shrink-0 items-center gap-1 bg-white text-[10px] font-bold text-[#014f86] uppercase"
                  >
                    {getModeIcon(booking.mode)}
                    {booking.mode.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="text-muted-foreground flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 text-[#014f86]" /> {booking.date}
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#014f86]" /> {booking.time}
                  </div>
                </div>
              </div>
            ))}
            {MOCK_BOOKINGS.length === 0 && (
              <div className="text-muted-foreground p-6 text-center text-sm">
                No bookings in the next 3 days.
              </div>
            )}
          </div>
        </CardContent>
        <div className="bg-secondary/10 border-border rounded-b-xl border-t p-4">
          <p className="text-muted-foreground flex items-start gap-2 text-xs leading-relaxed">
            <ShieldCheck className="text-success h-4 w-4 shrink-0" />
            Slot modifications will not affect currently booked appointments. To cancel a booked
            appointment, visit the Booking Details page.
          </p>
        </div>
      </Card>
    </div>
  );
};
