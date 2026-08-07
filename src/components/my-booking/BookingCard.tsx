import React from 'react';
import { CalendarDays, ChevronRight, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookingModeBadge, BookingStatusBadge, formatBookingDate } from './booking-utils';
import type { BookingCardItem } from './types';

interface BookingCardProps {
  booking: BookingCardItem;
  onNavigate: (id: string) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onNavigate }) => {
  const hasAvatar = Boolean(booking.avatarUrl || booking.avatarFallback);

  return (
    <Card
      onClick={() => onNavigate(booking.id)}
      className="border-border group cursor-pointer overflow-hidden py-0 transition-all duration-300 hover:border-[#a9d6e5] hover:shadow-md"
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="border-border/50 bg-secondary/10 flex items-center gap-4 border-b p-5 md:w-2/5 md:border-r md:border-b-0">
            {hasAvatar && (
              <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                <AvatarImage src={booking.avatarUrl} className="object-cover" />
                <AvatarFallback className="bg-[#a9d6e5] text-xl font-bold text-[#013a63]">
                  {booking.avatarFallback || 'U'}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <h3 className="text-lg leading-tight font-bold text-[#012a4a] transition-colors group-hover:text-[#014f86]">
                {booking.title}
              </h3>
              {booking.subtitleInfo && (
                <div className="text-muted-foreground mt-0.5 text-sm capitalize">
                  {booking.subtitleInfo}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-3 p-5 md:w-2/5">
            <div className="flex items-center gap-3 text-[#012a4a]">
              <div className="bg-secondary/50 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                <CalendarDays className="h-4 w-4 text-[#014f86]" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Date
                </p>
                <p className="font-semibold">{formatBookingDate(booking.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[#012a4a]">
              <div className="bg-secondary/50 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                <Clock className="h-4 w-4 text-[#014f86]" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Time
                </p>
                <p className="font-semibold">{booking.time}</p>
              </div>
            </div>
          </div>

          <div className="border-border/50 flex flex-row items-center justify-between border-t bg-gray-50/50 p-5 md:w-1/5 md:flex-col md:items-end md:justify-center md:border-t-0">
            <div className="flex flex-col items-start gap-2 md:items-end">
              <BookingStatusBadge status={booking.status} />
              <BookingModeBadge mode={booking.treatmentMode} />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="mt-4 hidden text-[#014f86] group-hover:bg-[#a9d6e5]/30 md:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
