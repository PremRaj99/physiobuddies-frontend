'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  CalendarDays,
  ChevronRight,
  Clock,
  Filter,
  Home,
  Search,
  Video,
} from 'lucide-react';
import { useState } from 'react';

import PageHeader from '@/components/custom/page-header/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router';

// --- Types ---
type TreatmentMode = 'home_visit' | 'online' | 'clinic';
type TreatmentStatus = 'UPCOMING' | 'COMPLETED' | 'CANCELLED' | 'PENDING';
type Gender = 'MALE' | 'FEMALE' | 'OTHER';

interface BookingRecord {
  id: string;
  patientID: string;
  patientName: string;
  patientGender: Gender;
  patientAge: number | null;
  treatmentMode: TreatmentMode;
  status: TreatmentStatus;
  lastSessionDate: string; // ISO or formatted string
  lastSessionTime: string;
}

// --- Mock Data ---
const MOCK_BOOKINGS: BookingRecord[] = [
  {
    id: 'BKG-001',
    patientID: 'PAT-101',
    patientName: 'John Doe',
    patientGender: 'MALE',
    patientAge: 30,
    treatmentMode: 'home_visit',
    status: 'UPCOMING',
    lastSessionDate: 'June 05, 2026',
    lastSessionTime: '10:00 AM - 11:00 AM',
  },
  {
    id: 'BKG-002',
    patientID: 'PAT-102',
    patientName: 'Jane Smith',
    patientGender: 'FEMALE',
    patientAge: 25,
    treatmentMode: 'online',
    status: 'COMPLETED',
    lastSessionDate: 'May 10, 2026',
    lastSessionTime: '02:30 PM - 03:15 PM',
  },
  {
    id: 'BKG-003',
    patientID: 'PAT-103',
    patientName: 'Dr. Emily Roberts',
    patientGender: 'FEMALE',
    patientAge: 35,
    treatmentMode: 'online',
    status: 'PENDING',
    lastSessionDate: 'May 28, 2026',
    lastSessionTime: '11:15 AM - 12:00 PM',
  },
  {
    id: 'BKG-004',
    patientID: 'PAT-101',
    patientName: 'Dr. Sarah Jenkins',
    patientGender: 'FEMALE',
    patientAge: 40,
    treatmentMode: 'home_visit',
    status: 'COMPLETED',
    lastSessionDate: 'April 15, 2026',
    lastSessionTime: '10:00 AM - 11:00 AM',
  },
  {
    id: 'BKG-005',
    patientID: 'PAT-104',
    patientName: 'Dr. Alan Turing',
    patientGender: 'MALE',
    patientAge: 50,
    treatmentMode: 'clinic',
    status: 'CANCELLED',
    lastSessionDate: 'March 02, 2026',
    lastSessionTime: '04:00 PM - 05:00 PM',
  },
];

// --- Helper Functions ---
const getStatusColor = (status: TreatmentStatus) => {
  switch (status) {
    case 'UPCOMING':
      return 'bg-[#014f86] text-white hover:bg-[#013a63]';
    case 'COMPLETED':
      return 'bg-success text-white hover:bg-emerald-600';
    case 'PENDING':
      return 'bg-amber-500 text-white hover:bg-amber-600';
    case 'CANCELLED':
      return 'bg-muted text-muted-foreground hover:bg-muted';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

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
      return 'Clinic';
  }
};

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
} as const;

// --- Main Component ---
export default function TherapistBookingListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [modeFilter, setModeFilter] = useState<string>('ALL');

  const navigate = useNavigate();

  // Filtering Logic
  const filteredBookings = MOCK_BOOKINGS.filter((booking) => {
    // 1. Tab Filter (Status)
    const matchesTab =
      activeTab === 'ALL' ||
      (activeTab === 'TODAY' &&
        booking.lastSessionDate ===
          new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
          })) ||
      (activeTab === 'UPCOMING' &&
        (booking.status === 'UPCOMING' || booking.status === 'PENDING')) ||
      (activeTab === 'PAST' && (booking.status === 'COMPLETED' || booking.status === 'CANCELLED'));

    // 2. Mode Filter
    const matchesMode = modeFilter === 'ALL' || booking.treatmentMode === modeFilter;

    // 3. Search Filter
    const matchesSearch = booking.patientName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesMode && matchesSearch;
  });

  return (
    <div className="bg-background min-h-screen pb-24 font-sans">
      {/* Header & Decorator */}
      <PageHeader
        heading={
          <>
            Treatment Session <span className="text-[#a9d6e5]">Manager</span>
          </>
        }
        subheading="Track patient sessions, monitor progress, or review past therapy sessions."
      />

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto -mt-12 max-w-5xl px-4 sm:px-6">
        {/* Controls Card */}
        <Card className="border-border mb-8 bg-white py-0 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              {/* Tabs */}
              <Tabs
                defaultValue="ALL"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full md:w-auto"
              >
                <TabsList className="bg-secondary/50 grid h-auto w-full grid-cols-3 rounded-lg p-0 md:flex md:w-auto">
                  <TabsTrigger
                    value="ALL"
                    className="text-muted-foreground rounded-md px-4 py-2.5 transition-all data-[state=active]:bg-white data-[state=active]:text-[#014f86]"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="TODAY"
                    className="text-muted-foreground rounded-md px-4 py-2.5 transition-all data-[state=active]:bg-white data-[state=active]:text-[#014f86]"
                  >
                    Today
                  </TabsTrigger>
                  <TabsTrigger
                    value="UPCOMING"
                    className="text-muted-foreground rounded-md px-4 py-2.5 transition-all data-[state=active]:bg-white data-[state=active]:text-[#014f86]"
                  >
                    Upcoming
                  </TabsTrigger>
                  <TabsTrigger
                    value="PAST"
                    className="text-muted-foreground rounded-md px-4 py-2.5 transition-all data-[state=active]:bg-white data-[state=active]:text-[#014f86]"
                  >
                    Past
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Search & Filter */}
              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    placeholder="Search patient name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-border bg-white pl-9 text-[#012a4a] focus-visible:ring-[#014f86]"
                  />
                </div>

                <Select value={modeFilter} onValueChange={setModeFilter}>
                  <SelectTrigger className="border-border w-full bg-white text-[#012a4a] sm:w-40">
                    <Filter className="text-muted-foreground mr-2 h-4 w-4" />
                    <SelectValue placeholder="Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Modes</SelectItem>
                    <SelectItem value="clinic">Clinic Visit</SelectItem>
                    <SelectItem value="home_visit">Home Visit</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* List Area */}
        <AnimatePresence mode="wait">
          {filteredBookings.length > 0 ? (
            <motion.div
              key={activeTab + modeFilter + searchQuery} // Re-trigger animation on filter change
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {filteredBookings.map((booking) => (
                <motion.div key={booking.id} variants={itemVariants}>
                  <Card
                    onClick={() => navigate(`/therapist/my-booking/${booking.id}`)}
                    className="border-border group overflow-hidden py-0 transition-all duration-300 hover:border-[#a9d6e5] hover:shadow-md"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Therapist Info Section (Left) */}
                        <div className="border-border/50 bg-secondary/10 flex items-center gap-4 border-b p-5 md:w-2/5 md:border-r md:border-b-0">
                          <div>
                            <h3 className="text-lg leading-tight font-bold text-[#012a4a] transition-colors group-hover:text-[#014f86]">
                              {booking.patientName}
                            </h3>
                            <p className="text-muted-foreground mt-0.5 text-sm capitalize">
                              <Badge className="rounded-md" variant="outline">
                                {booking.patientID}
                              </Badge>{' '}
                              • {booking.patientGender.toLowerCase()} •{' '}
                              {booking.patientAge && `${booking.patientAge} yrs`}
                            </p>
                          </div>
                        </div>

                        {/* Session Details Section (Middle) */}
                        <div className="flex flex-col justify-center space-y-3 p-5 md:w-2/5">
                          <div className="flex items-center gap-3 text-[#012a4a]">
                            <div className="bg-secondary/50 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                              <CalendarDays className="h-4 w-4 text-[#014f86]" />
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                                Date
                              </p>
                              <p className="font-semibold">{booking.lastSessionDate}</p>
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
                              <p className="font-semibold">{booking.lastSessionTime}</p>
                            </div>
                          </div>
                        </div>

                        {/* Status & Action Section (Right) */}
                        <div className="border-border/50 flex flex-row items-center justify-between border-t bg-gray-50/50 p-5 md:w-1/5 md:flex-col md:items-end md:justify-center md:border-t-0">
                          <div className="flex flex-col items-start gap-2 md:items-end">
                            <Badge
                              className={`${getStatusColor(booking.status)} border-transparent px-3 py-1 font-semibold`}
                            >
                              {booking.status}
                            </Badge>

                            <Badge
                              variant="outline"
                              className="border-border flex items-center gap-1.5 bg-white text-[#013a63] shadow-sm"
                            >
                              {getModeIcon(booking.treatmentMode)}
                              {getModeLabel(booking.treatmentMode)}
                            </Badge>
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
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-border rounded-xl border border-dashed bg-white py-24 text-center"
            >
              <div className="mb-4 inline-flex rounded-full bg-[#a9d6e5]/30 p-4">
                <CalendarDays className="h-8 w-8 text-[#014f86]" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#012a4a]">No sessions found</h3>
              <p className="text-muted-foreground mx-auto mb-6 max-w-sm">
                We couldn't find any treatment sessions matching your current filters.
              </p>
              <Button
                variant="outline"
                className="border-[#014f86] text-[#014f86] transition-colors hover:bg-[#014f86] hover:text-white"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('ALL');
                  setModeFilter('ALL');
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
