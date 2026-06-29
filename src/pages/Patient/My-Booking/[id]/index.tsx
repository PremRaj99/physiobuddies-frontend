'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileText,
  Home,
  MapPin,
  MoreVertical,
  Phone,
  PlayCircle,
  ShieldCheck,
  Stethoscope,
  User,
  Video,
  XCircle,
} from 'lucide-react';

// Shadcn UI Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
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

interface Therapist {
  id: string; // Public Business ID
  name: string;
  image: string;
  gender: Gender;
  mode: TreatmentMode;
}

interface Patient {
  name: string;
  dob: string;
  gender: Gender;
  phone: string;
}

interface Location {
  address: string;
  landmark: string | null;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coords: { lat: number; lng: number };
}

interface TreatmentSession {
  id: string;
  date: string;
  scheduledTime: string; // "10:00 AM - 11:00 AM"
  actualStartTime?: string; // "10:05 AM"
  actualEndTime?: string; // "11:02 AM"
  status: SessionStatus;
}

interface Document {
  id: string;
  title: string;
  type: string;
  date: string;
}

interface BookingDetails {
  bookingId: string;
  overallStatus: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  therapist: Therapist;
  patient: Patient;
  location: Location;
  sessions: TreatmentSession[];
  condition: { title: string };
  problemDescription: string;
  documents: Document[];
}

// --- Mock Data ---
const MOCK_DATA: BookingDetails = {
  bookingId: 'BKG-2026-9823',
  overallStatus: 'IN_PROGRESS',
  therapist: {
    id: 'TH-PT-1042',
    name: 'Dr. Sarah Jenkins',
    image:
      'https://images.unsplash.com/photo-1594824436998-d7037b52479e?auto=format&fit=crop&q=80&w=200',
    gender: 'FEMALE',
    mode: 'home_visit',
  },
  patient: {
    name: 'Robert Fox',
    dob: '1985-06-15',
    gender: 'MALE',
    phone: '+1 (555) 123-4567',
  },
  condition: {
    title: 'Post Surgical',
  },
  problemDescription:
    'Experiencing severe stiffness and limited range of motion in the left knee after ACL reconstruction surgery 3 weeks ago.',
  location: {
    address: '123 Wellness Ave, Apt 4B',
    landmark: 'Near Central Park',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    postalCode: '10001',
    coords: { lat: 40.7128, lng: -74.006 },
  },
  sessions: [
    {
      id: 's1',
      date: 'May 10, 2026',
      scheduledTime: '10:00 AM - 11:00 AM',
      actualStartTime: '10:02 AM',
      actualEndTime: '11:05 AM',
      status: 'settled',
    },
    {
      id: 's2',
      date: 'May 12, 2026',
      scheduledTime: '10:00 AM - 11:00 AM',
      actualStartTime: '10:05 AM',
      actualEndTime: '11:00 AM',
      status: 'completed',
    },
    { id: 's3', date: 'May 15, 2026', scheduledTime: '10:00 AM - 11:00 AM', status: 'cancelled' },
    { id: 's4', date: 'May 18, 2026', scheduledTime: '10:00 AM - 11:00 AM', status: 'confirmed' },
    { id: 's5', date: 'May 21, 2026', scheduledTime: '10:00 AM - 11:00 AM', status: 'pending' },
  ],
  documents: [
    {
      id: 'doc1',
      title: 'Initial Physical Assessment',
      type: 'Assessment Report',
      date: 'May 10, 2026',
    },
    { id: 'doc2', title: 'Pain Management Plan', type: 'Prescription', date: 'May 12, 2026' },
  ],
};

// --- Helpers ---
const getModeIcon = (mode: TreatmentMode) => {
  switch (mode) {
    case 'home_visit':
      return <Home className="h-4 w-4" />;
    case 'online':
      return <Video className="h-4 w-4" />;
    case 'clinic':
      return <Building2 className="h-4 w-4" />;
  }
};

const getModeLabel = (mode: TreatmentMode) => {
  switch (mode) {
    case 'home_visit':
      return 'Home Visit';
    case 'online':
      return 'Online';
    case 'clinic':
      return 'Clinic Visit';
  }
};

const getSessionStatusBadge = (status: SessionStatus) => {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-600">
          <Clock className="mr-1 h-3 w-3" /> Pending
        </Badge>
      );
    case 'confirmed':
      return (
        <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600">
          <CheckCircle className="mr-1 h-3 w-3" /> Confirmed
        </Badge>
      );
    case 'active':
      return (
        <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-600">
          <PlayCircle className="mr-1 h-3 w-3" /> Active
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="default" className="bg-success hover:bg-success text-white">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
        </Badge>
      );
    case 'settled':
      return (
        <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-600">
          <ShieldCheck className="mr-1 h-3 w-3" /> Settled
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge
          variant="outline"
          className="bg-destructive/10 text-destructive border-destructive/20"
        >
          <XCircle className="mr-1 h-3 w-3" /> Cancelled
        </Badge>
      );
    case 'no_show':
      return (
        <Badge variant="secondary" className="text-muted-foreground">
          <AlertCircle className="mr-1 h-3 w-3" /> No Show
        </Badge>
      );
  }
};

// --- Sub-Components ---

const TherapistCard = ({ therapist }: { therapist: Therapist }) => (
  <Card className="border-border gap-0 overflow-hidden bg-white py-0 shadow-sm">
    <div className="bg-secondary/30 border-border flex items-center justify-between border-b px-6 py-4">
      <h3 className="flex items-center gap-2 font-semibold text-[#013a63]">
        <Stethoscope className="h-4 w-4 text-[#014f86]" /> Primary Therapist
      </h3>
      <Badge
        variant="outline"
        className="flex items-center gap-1.5 border-[#014f86] bg-white text-[#014f86]"
      >
        {getModeIcon(therapist.mode)}
        {getModeLabel(therapist.mode)}
      </Badge>
    </div>
    <CardContent className="p-6">
      <div className="flex items-center gap-5">
        <Avatar className="border-secondary h-20 w-20 border-2 shadow-sm">
          <AvatarImage src={therapist.image} className="object-cover" />
          <AvatarFallback className="bg-[#a9d6e5] text-xl font-bold text-[#013a63]">
            {therapist.name.replace('Dr. ', '').charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl leading-tight font-bold text-[#012a4a]">{therapist.name}</h2>
          <div className="text-muted-foreground mt-1.5 flex items-center gap-3 text-sm">
            <span className="bg-secondary/50 rounded px-2 py-0.5 font-mono text-xs text-[#013a63]">
              ID: {therapist.id}
            </span>
            <span>•</span>
            <span className="capitalize">{therapist.gender.toLowerCase()}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const PatientInfoCard = ({
  patient,
  condition,
  problemDescription,
}: {
  patient: Patient;
  condition?: { title: string };
  problemDescription?: string;
}) => (
  <Card className="border-border gap-0 bg-white pt-0 shadow-sm">
    <CardHeader className="bg-secondary/30 border-border flex items-center justify-between border-b px-6 py-4">
      <CardTitle className="flex items-center gap-2 text-lg text-[#013a63]">
        <User className="h-5 w-5" /> Patient Details
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 pt-6">
      <div>
        <p className="text-muted-foreground mb-1 text-sm">Full Name</p>
        <p className="font-semibold text-[#012a4a]">{patient.name}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-muted-foreground mb-1 text-sm">Date of Birth</p>
          <p className="font-semibold text-[#012a4a]">{patient.dob}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1 text-sm">Gender</p>
          <p className="font-semibold text-[#012a4a] capitalize">{patient.gender.toLowerCase()}</p>
        </div>
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-sm">Phone Number</p>
        <div className="flex items-center gap-2 font-semibold text-[#012a4a]">
          <Phone className="h-4 w-4 text-[#014f86]" /> {patient.phone}
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

const LocationCard = ({ location, mode }: { location: Location; mode: TreatmentMode }) => {
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

// --- Main Page Wrapper ---

export default function BookingDetailPage() {
  const data = MOCK_DATA; // In a real app, this would be fetched via props/hooks
  const navigate = useNavigate();

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-[#f8fbfa] pb-24 font-sans">
      {/* Header Decorator */}
      <div className="relative w-full overflow-hidden border-b border-[#014f86]/10 bg-[#a9d6e5] px-4 pt-8 pb-32 sm:px-6">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-white/20 blur-3xl" />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Button
              onClick={() => navigate('/patient/my-bookings')}
              variant="ghost"
              className="mb-4 pl-0 text-[#013a63] hover:bg-white/40"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bookings
            </Button>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-[#012a4a] md:text-4xl">
              Booking Details
            </h1>
            <p className="mt-2 flex items-center gap-2 font-medium text-[#013a63]">
              <span className="rounded bg-white/50 px-2 py-0.5 font-mono text-sm tracking-wide">
                {data.bookingId}
              </span>
              <Badge className="bg-[#014f86] text-white hover:bg-[#014f86]">
                {data.overallStatus.replace('_', ' ')}
              </Badge>
            </p>
          </div>
        </div>
      </div>

      <main className="relative z-20 mx-auto -mt-20 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT COLUMN: Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8 lg:col-span-2"
          >
            <motion.div variants={itemVariants}>
              <TherapistCard therapist={data.therapist} />
            </motion.div>

            {/* Treatment Sessions Timeline */}
            <motion.div variants={itemVariants}>
              <Card className="border-border gap-0 py-0 shadow-sm">
                <CardHeader className="border-border rounded-t-xl border-b bg-white py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-xl text-[#012a4a]">
                        <CalendarDays className="h-5 w-5 text-[#014f86]" /> Treatment Sessions
                      </CardTitle>
                      <CardDescription>
                        Track the schedule and status of individual therapy sessions.
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-secondary text-[#013a63]">
                      {data.sessions.length} Total
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-border/60 divide-y">
                    {data.sessions.map((session, idx) => (
                      <div
                        key={session.id}
                        className="group flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-gray-50/50 sm:flex-row sm:items-center"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-secondary/30 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#a9d6e5]/50 text-sm font-bold text-[#014f86]">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="text-base font-bold text-[#012a4a]">{session.date}</p>
                            <div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                              <Clock className="h-3.5 w-3.5" /> Scheduled: {session.scheduledTime}
                            </div>

                            {/* Conditionally render Actual Times if completed/settled */}
                            {(session.status === 'completed' || session.status === 'settled') &&
                              session.actualStartTime &&
                              session.actualEndTime && (
                                <div className="text-success bg-success/10 mt-1.5 flex w-fit items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Actual: {session.actualStartTime} - {session.actualEndTime}
                                </div>
                              )}
                          </div>
                        </div>

                        <div className="flex w-full items-center justify-between gap-4 pl-14 sm:w-auto sm:justify-end sm:pl-0">
                          {getSessionStatusBadge(session.status)}

                          {/* Triple Dot Actions Menu */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:bg-secondary/50 hover:text-[#012a4a]"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem className="cursor-pointer text-[#012a4a]">
                                <Download className="mr-2 h-4 w-4" /> Download Bill
                              </DropdownMenuItem>
                              {/* Only allow cancellation on future/pending sessions */}
                              {(session.status === 'pending' || session.status === 'confirmed') && (
                                <>
                                  <Separator className="my-1" />
                                  <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                                    <XCircle className="mr-2 h-4 w-4" /> Request Cancel
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Documents & Assessments */}
            <motion.div variants={itemVariants}>
              <Card className="border-border gap-0 py-0 shadow-sm">
                <CardHeader className="border-border rounded-t-xl border-b bg-white py-4">
                  <CardTitle className="flex items-center gap-2 text-xl text-[#012a4a]">
                    <FileCheck className="h-5 w-5 text-[#014f86]" /> Medical Documents
                  </CardTitle>
                  <CardDescription>
                    Download assessments, prescriptions, and reports.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                  {data.documents.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {data.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="border-border group flex items-start gap-3 rounded-lg border bg-white p-4 transition-all hover:border-[#a9d6e5] hover:shadow-sm"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#eef6f9]">
                            <FileText className="h-5 w-5 text-[#014f86]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate text-sm font-semibold text-[#012a4a]">
                              {doc.title}
                            </h4>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className="bg-secondary/50 px-1.5 py-0 text-[10px] text-[#013a63]"
                              >
                                {doc.type}
                              </Badge>
                              <span className="text-muted-foreground text-xs">{doc.date}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 text-[#014f86] opacity-50 group-hover:opacity-100 hover:bg-[#a9d6e5]/30"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <FileText className="text-muted-foreground/30 mx-auto mb-3 h-10 w-10" />
                      <p className="text-muted-foreground">No documents uploaded yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Info Panels */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <PatientInfoCard
                patient={data.patient}
                condition={data.condition}
                problemDescription={data.problemDescription}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <LocationCard location={data.location} mode={data.therapist.mode} />
            </motion.div>

            {/* Help & Support Card */}
            <motion.div variants={itemVariants}>
              <Card className="border-border bg-[#012a4a] py-2 text-white shadow-sm">
                <CardContent className="p-6">
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
                    <ShieldCheck className="h-5 w-5 text-[#a9d6e5]" /> Need Help?
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-300">
                    If you have questions about your sessions or need to reschedule, our support
                    team is available 24/7.
                  </p>
                  <Button className="w-full bg-[#a9d6e5] text-[#012a4a] transition-colors hover:bg-white">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
