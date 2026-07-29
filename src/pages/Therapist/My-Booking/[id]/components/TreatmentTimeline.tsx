import { CalendarClock, CalendarDays, Clock, FilePlus, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SessionItem {
  id: string;
  date: string;
  scheduledTime: string;
  status: string;
}

interface TreatmentTimelineProps {
  overallStatus: string;
  sessions: SessionItem[];
  sessionActive: boolean;
  isAccepting: boolean;
  isGeneratingOtp: boolean;
  handleAccept: () => void;
  handleStartSessionOtp: () => void;
  handleEndSessionAction: (sessionId: string) => void;
  openAddDocsModal: (sessionId: string) => void;
  openRescheduleModal: (sessionId: string) => void;
}

export const TreatmentTimeline = ({
  overallStatus,
  sessions,
  sessionActive,
  isAccepting,
  isGeneratingOtp,
  handleAccept,
  handleStartSessionOtp,
  handleEndSessionAction,
  openAddDocsModal,
  openRescheduleModal,
}: TreatmentTimelineProps) => {
  return (
    <Card className="border-border gap-0 py-0 shadow-sm">
      <CardHeader className="border-border flex flex-row items-center justify-between rounded-t-xl border-b bg-white pt-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl text-[#012a4a]">
            <CalendarDays className="h-5 w-5 text-[#014f86]" /> Treatment Timeline
          </CardTitle>
        </div>
        <Badge variant="secondary" className="bg-[#a9d6e5]/30 text-[#013a63]">
          {sessions.length} Sessions Total
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-border/60 divide-y">
          {sessions.map((session, idx) => (
            <div
              key={session.id}
              className="flex flex-col gap-6 p-6 transition-colors hover:bg-gray-50/50"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="flex gap-4">
                  <div className="bg-secondary/30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#a9d6e5] font-bold text-[#014f86]">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#012a4a]">{session.date}</p>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                      <Clock className="h-4 w-4" /> {session.scheduledTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <Badge
                    variant="outline"
                    className="border-blue-200 bg-blue-50 text-blue-600 capitalize"
                  >
                    {session.status}
                  </Badge>
                </div>
              </div>

              {/* Therapist Actions Area */}
              <div className="flex flex-wrap items-center gap-3">
                {overallStatus === 'PENDING' && (
                  <Button
                    onClick={handleAccept}
                    disabled={isAccepting}
                    className="bg-emerald-600 font-bold text-white hover:bg-emerald-700"
                  >
                    {isAccepting ? 'Accepting...' : 'Accept Session'}
                  </Button>
                )}

                {session.status !== 'completed' && session.status !== 'active' && !sessionActive && (
                  <Button
                    onClick={handleStartSessionOtp}
                    disabled={isGeneratingOtp}
                    className="bg-success h-10 animate-pulse px-6 font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-600"
                  >
                    <PlayCircle className="mr-2 h-4 w-4" />
                    {isGeneratingOtp ? 'Sending OTP...' : 'Start Session Now'}
                  </Button>
                )}

                {(session.status === 'active' || sessionActive) && (
                  <Button
                    onClick={() => handleEndSessionAction(session.id)}
                    className="h-10 bg-amber-600 px-6 font-bold text-white hover:bg-amber-700"
                  >
                    <Clock className="mr-2 h-4 w-4" /> End Session
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={() => openAddDocsModal(session.id)}
                  className="hover:bg-secondary/20 h-10 border-[#014f86] text-[#014f86]"
                >
                  <FilePlus className="mr-2 h-4 w-4" /> Add Document
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => openRescheduleModal(session.id)}
                  className="hover:bg-secondary/40 h-10 text-[#013a63]"
                >
                  <CalendarClock className="mr-2 h-4 w-4" /> Reschedule
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
