import React from 'react';
import { ChevronRight, Clock } from 'lucide-react';
import { getModeIcon } from '@/components/my-booking';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SessionRecord, SessionStatus } from '../hooks/useTherapistDashboard';

interface UpcomingSessionsProps {
  sessions: SessionRecord[];
  onNavigate: (path: string) => void;
}

const getStatusBadge = (status: SessionStatus) => {
  switch (status) {
    case 'COMPLETED':
      return <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">Completed</Badge>;
    case 'UPCOMING':
      return <Badge className="bg-[#014f86] text-white">Upcoming</Badge>;
    case 'PENDING':
      return <Badge className="border-amber-200 bg-amber-50 text-amber-700">Pending OTP</Badge>;
    case 'CANCELLED':
      return <Badge className="border-rose-200 bg-rose-50 text-rose-700">Cancelled</Badge>;
  }
};

export const UpcomingSessions: React.FC<UpcomingSessionsProps> = ({ sessions, onNavigate }) => {
  return (
    <Card className="border-border bg-white py-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-6 pb-4">
        <div>
          <CardTitle className="text-xl font-bold text-[#012a4a]">Today's Sessions</CardTitle>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Manage schedule and start consultations.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('/therapist/my-bookings')}
          className="text-[#014f86] hover:bg-[#014f86]/10"
        >
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => onNavigate(`/therapist/my-bookings/${session.id}`)}
              className="border-border/60 flex cursor-pointer flex-col items-start justify-between gap-4 rounded-xl border bg-slate-50/50 p-4 transition-all hover:border-[#014f86] hover:bg-white sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="bg-secondary/40 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#013a63]">
                  {getModeIcon(session.mode)}
                </div>
                <div>
                  <h4 className="font-bold text-[#012a4a]">{session.patientName}</h4>
                  <div className="text-muted-foreground mt-0.5 flex items-center gap-2 text-xs">
                    <span>
                      {session.patientAge} yrs • {session.patientGender}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono font-medium text-[#013a63]">
                      <Clock className="h-3 w-3" /> {session.timeSlot}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
                {getStatusBadge(session.status)}
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-[#014f86]">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
