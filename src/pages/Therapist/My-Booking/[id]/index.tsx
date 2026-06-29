import {
  Activity,
  ArrowLeft,
  Building2,
  CalendarClock,
  CalendarDays,
  Camera,
  Clock,
  FilePlus,
  Home,
  MapPin,
  MessageSquare,
  Phone,
  PlayCircle,
  ShieldCheck,
  User,
  Video,
} from 'lucide-react';
import { useState } from 'react';

// Shadcn UI Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

// --- Types ---
type TreatmentMode = 'home_visit' | 'online' | 'clinic';
type Gender = 'MALE' | 'FEMALE' | 'OTHER';
type SessionStatus =
  | 'pending'
  | 'confirmed'
  | 'active'
  | 'completed'
  | 'settled'
  | 'cancelled'
  | 'no_show';

interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: Gender;
  phone: string;
  image?: string;
}

// interface Location {
//   address: string;
//   landmark: string | null;
//   city: string;
//   state: string;
//   postalCode: string;
// }

// interface TreatmentSession {
//   id: string;
//   date: string; // Format: "YYYY-MM-DD"
//   scheduledTime: string; // Format: "10:00 AM - 11:00 AM"
//   status: SessionStatus;
// }

// --- Mock Data ---
const MOCK_BOOKING = {
  id: 'BKG-2026-9823',
  mode: 'home_visit' as TreatmentMode,
  overallStatus: 'IN_PROGRESS',
  patient: {
    id: 'PAT-001',
    name: 'Robert Fox',
    dob: 'June 15, 1985',
    gender: 'MALE' as Gender,
    phone: '+91 98765 43210',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  },
  condition: {
    title: 'Post Surgical',
  },
  problemDescription:
    'Experiencing severe stiffness and limited range of motion in the left knee after ACL reconstruction surgery 3 weeks ago.',
  location: {
    address: 'Apt 4B, Wellness Heights, Sector 62',
    landmark: 'Opposite Metro Pillar 12',
    city: 'Noida',
    state: 'Uttar Pradesh',
    postalCode: '201301',
  },
  sessions: [
    {
      id: 's1',
      date: new Date().toISOString().split('T')[0],
      scheduledTime: '10:00 AM - 11:00 AM',
      status: 'confirmed' as SessionStatus,
    },
    {
      id: 's2',
      date: '2026-06-12',
      scheduledTime: '10:00 AM - 11:00 AM',
      status: 'confirmed' as SessionStatus,
    },
  ],
};

// --- Helper: Check if session is startable (+/- 30 mins) ---
const isSessionStartable = (dateStr: string, timeRange: string) => {
  const today = new Date().toISOString().split('T')[0];
  if (dateStr !== today) return false;

  const startTimeStr = timeRange.split(' - ')[0]; // "10:00 AM"
  const [time, modifier] = startTimeStr.split(' ');
  let [hours] = time.split(':').map(Number);
  const minutes = time.split(':').map(Number)[1];
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  const sessionStartTime = new Date();
  sessionStartTime.setHours(hours, minutes, 0, 0);

  const now = new Date();
  const diffInMinutes = (now.getTime() - sessionStartTime.getTime()) / 60000;

  return diffInMinutes >= -30 && diffInMinutes <= 30;
};

// --- Sub-Components ---

const PatientHeader = ({
  patient,
  mode,
  condition,
  problemDescription,
}: {
  patient: Patient;
  mode: TreatmentMode;
  condition?: { title: string };
  problemDescription?: string;
}) => (
  <Card className="border-border mb-8 overflow-hidden bg-white py-0 shadow-sm">
    <div className="bg-secondary/30 border-border flex items-center justify-between border-b px-6 py-6">
      <h3 className="flex items-center gap-2 font-semibold text-[#013a63]">
        <User className="h-4 w-4 text-[#014f86]" /> Patient Context
      </h3>
      <Badge
        variant="outline"
        className="flex items-center gap-1.5 border-[#014f86] bg-white text-[10px] font-bold tracking-wider text-[#014f86] uppercase"
      >
        {mode === 'home_visit' ? (
          <Home className="h-3 w-3" />
        ) : mode === 'online' ? (
          <Video className="h-3 w-3" />
        ) : (
          <Building2 className="h-3 w-3" />
        )}
        {mode.replace('_', ' ')}
      </Badge>
    </div>
    <CardContent className="p-6 pt-0">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <Avatar className="border-secondary h-20 w-20 border-2 shadow-sm">
          <AvatarImage src={patient.image} className="object-cover" />
          <AvatarFallback className="bg-[#a9d6e5] text-xl font-bold text-[#013a63]">
            {patient.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <h2 className="text-2xl font-bold text-[#012a4a]">{patient.name}</h2>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-8 border-[#014f86] text-[#014f86]">
                <MessageSquare className="mr-2 h-4 w-4" /> Chat
              </Button>
              <Button size="sm" className="h-8 bg-[#014f86] text-white hover:bg-[#013a63]">
                <Phone className="mr-2 h-4 w-4" /> Call Patient
              </Button>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div>
              <p className="text-muted-foreground text-xs font-bold uppercase opacity-60">DOB</p>
              <p className="font-semibold text-[#012a4a]">{patient.dob}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-bold uppercase opacity-60">Gender</p>
              <p className="font-semibold text-[#012a4a] capitalize">
                {patient.gender.toLowerCase()}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground text-xs font-bold uppercase opacity-60">
                Patient ID
              </p>
              <p className="font-mono font-bold text-[#014f86]">{patient.id}</p>
            </div>
          </div>
        </div>
      </div>
      {(condition || problemDescription) && (
        <>
          <Separator className="my-6" />
          <div>
            <p className="text-muted-foreground mb-3 flex items-center gap-1.5 text-xs font-bold uppercase opacity-60">
              <Activity className="h-4 w-4 text-[#014f86]" /> Primary Condition & Notes
            </p>
            <div className="flex flex-col gap-4">
              {condition && (
                <Badge className="shrink-0 border-none bg-[#a9d6e5]/30 px-4 py-2 text-sm whitespace-nowrap text-[#013a63] hover:bg-[#a9d6e5]/40">
                  {condition.title}
                </Badge>
              )}
              {problemDescription && (
                <div className="border-border relative flex-1 rounded-lg border bg-gray-50 p-4">
                  <div className="absolute top-0 left-0 h-full w-1 rounded-l-lg bg-[#014f86]" />
                  <p className="pl-2 text-sm leading-relaxed text-[#012a4a] italic">
                    "{problemDescription}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </CardContent>
  </Card>
);

// --- Main Component ---
export default function TherapistBookingDetailPage() {
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fbfa] pb-24 font-sans">
      {/* Header Decorator */}
      <div className="relative w-full overflow-hidden border-b border-[#014f86]/10 bg-[#a9d6e5] px-4 pt-8 pb-32 sm:px-6">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Button variant="ghost" className="mb-4 pl-0 text-[#013a63] hover:bg-white/40">
              <ArrowLeft className="mr-2 h-4 w-4" /> Schedule Overview
            </Button>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-[#012a4a] md:text-4xl">
              Appointment Details
            </h1>
            <p className="mt-2 flex items-center gap-2 font-medium text-[#013a63]">
              <span className="rounded bg-white/50 px-2 py-0.5 font-mono text-sm tracking-wide">
                {MOCK_BOOKING.id}
              </span>
              <Badge className="bg-[#014f86] text-white hover:bg-[#014f86]">
                {MOCK_BOOKING.overallStatus.replace('_', ' ')}
              </Badge>
            </p>
          </div>
        </div>
      </div>

      <main className="relative z-20 mx-auto -mt-20 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT: Session Tracking */}
          <div className="space-y-8 lg:col-span-2">
            <PatientHeader
              patient={MOCK_BOOKING.patient}
              mode={MOCK_BOOKING.mode}
              condition={MOCK_BOOKING.condition}
              problemDescription={MOCK_BOOKING.problemDescription}
            />

            <Card className="border-border gap-0 py-0 shadow-sm">
              <CardHeader className="border-border flex flex-row items-center justify-between rounded-t-xl border-b bg-white pt-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl text-[#012a4a]">
                    <CalendarDays className="h-5 w-5 text-[#014f86]" /> Treatment Timeline
                  </CardTitle>
                </div>
                <Badge variant="secondary" className="bg-[#a9d6e5]/30 text-[#013a63]">
                  {MOCK_BOOKING.sessions.length} Sessions Total
                </Badge>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-border/60 divide-y">
                  {MOCK_BOOKING.sessions.map((session, idx) => {
                    const startable = isSessionStartable(session.date, session.scheduledTime);

                    return (
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
                          {startable && session.status !== 'completed' && (
                            <Button className="bg-success h-10 animate-pulse px-6 font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-600">
                              <PlayCircle className="mr-2 h-4 w-4" /> Start Session Now
                            </Button>
                          )}

                          <Dialog open={isDocsOpen} onOpenChange={setIsDocsOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                onClick={() =>
                                  navigate(
                                    `/therapist/my-booking/${MOCK_BOOKING.id}/create-assessment`,
                                  )
                                }
                                className="hover:bg-secondary/20 h-10 border-[#014f86] text-[#014f86]"
                              >
                                <FilePlus className="mr-2 h-4 w-4" /> Prepare Docs
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Clinical Session Documentation</DialogTitle>
                                <DialogDescription>
                                  Input session progress and upload clinical images.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label>Progress Notes</Label>
                                  <Textarea
                                    placeholder="Describe patient range of motion, pain levels, and exercises performed..."
                                    className="min-h-30"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Primary Symptom</Label>
                                    <Input placeholder="e.g. Lower back stiffness" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Mobility Score (1-10)</Label>
                                    <Input type="number" placeholder="8" />
                                  </div>
                                </div>
                                <div className="border-border cursor-pointer rounded-xl border-2 border-dashed bg-gray-50 p-8 text-center transition-colors hover:bg-gray-100">
                                  <Camera className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                                  <p className="text-muted-foreground text-sm">
                                    Click to upload clinical images/X-rays
                                  </p>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button className="w-full bg-[#014f86] text-white">
                                  Save Clinical Notes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                className="hover:bg-secondary/40 h-10 text-[#013a63]"
                              >
                                <CalendarClock className="mr-2 h-4 w-4" /> Reschedule
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Suggest New Schedule</DialogTitle>
                                <DialogDescription>
                                  The patient will need to confirm the new time slot.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>New Date</Label>
                                  <Input type="date" />
                                </div>
                                <div className="space-y-2">
                                  <Label>Available Time Slot</Label>
                                  <Input placeholder="e.g. 11:30 AM - 12:30 PM" />
                                </div>
                                <div className="space-y-2">
                                  <Label>Reason for Reschedule</Label>
                                  <Textarea placeholder="Optional message to patient..." />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setIsRescheduleOpen(false)}
                                >
                                  Cancel
                                </Button>
                                <Button className="bg-[#014f86] text-white">Send Request</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Logistics & Support */}
          <div className="space-y-8">
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
                  <p className="mt-1 text-sm font-semibold text-[#012a4a]">
                    {MOCK_BOOKING.location.address}
                  </p>
                </div>
                {MOCK_BOOKING.location.landmark && (
                  <div>
                    <Label className="text-muted-foreground text-xs font-bold uppercase opacity-60">
                      Landmark
                    </Label>
                    <p className="text-sm text-[#012a4a]">{MOCK_BOOKING.location.landmark}</p>
                  </div>
                )}
                <div>
                  <Label className="text-muted-foreground text-xs font-bold uppercase opacity-60">
                    City/State
                  </Label>
                  <p className="text-sm text-[#012a4a]">
                    {MOCK_BOOKING.location.city}, {MOCK_BOOKING.location.state} -{' '}
                    {MOCK_BOOKING.location.postalCode}
                  </p>
                </div>
                <Separator />
                <Button variant="outline" className="h-11 w-full border-[#014f86] text-[#014f86]">
                  <MapPin className="mr-2 h-4 w-4" /> Open in Google Maps
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none bg-[#012a4a] py-0 text-white shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-[#a9d6e5]/20 p-2">
                    <ShieldCheck className="h-6 w-6 text-[#a9d6e5]" />
                  </div>
                  <h3 className="text-lg font-bold">Clinical Support</h3>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-gray-300">
                  Facing issues with the session or the patient? Contact the medical administration
                  desk immediately.
                </p>
                <Button
                  onClick={() => navigate('/my-issues')}
                  className="h-11 w-full bg-[#a9d6e5] font-bold text-[#012a4a] transition-colors hover:bg-white"
                >
                  Connect with Admin
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
