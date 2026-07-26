'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Award,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  Home,
  LayoutDashboard,
  Plus,
  Star,
  TrendingUp,
  User,
  Users,
  Video,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// --- Types ---
type TreatmentMode = 'home_visit' | 'online' | 'clinic';
type SessionStatus = 'UPCOMING' | 'COMPLETED' | 'CANCELLED' | 'PENDING';

interface SessionRecord {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  timeSlot: string;
  mode: TreatmentMode;
  status: SessionStatus;
}

// --- Mock Data ---
const TODAY_SESSIONS: SessionRecord[] = [
  {
    id: 'BKG-001',
    patientName: 'John Doe',
    patientAge: 30,
    patientGender: 'Male',
    timeSlot: '10:00 AM - 11:00 AM',
    mode: 'home_visit',
    status: 'COMPLETED',
  },
  {
    id: 'BKG-002',
    patientName: 'Jane Smith',
    patientAge: 25,
    patientGender: 'Female',
    timeSlot: '02:30 PM - 03:15 PM',
    mode: 'online',
    status: 'UPCOMING',
  },
  {
    id: 'BKG-003',
    patientName: 'Robert Fox',
    patientAge: 45,
    patientGender: 'Male',
    timeSlot: '04:00 PM - 05:00 PM',
    mode: 'clinic',
    status: 'UPCOMING',
  },
  {
    id: 'BKG-004',
    patientName: 'Esther Howard',
    patientAge: 38,
    patientGender: 'Female',
    timeSlot: '06:00 PM - 07:00 PM',
    mode: 'online',
    status: 'PENDING',
  },
];

const WEEKLY_SESSION_TREND = [
  { day: 'Mon', sessions: 5 },
  { day: 'Tue', sessions: 7 },
  { day: 'Wed', sessions: 6 },
  { day: 'Thu', sessions: 8 },
  { day: 'Fri', sessions: 5 },
  { day: 'Sat', sessions: 9 },
  { day: 'Sun', sessions: 2 },
];

const REVENUE_GROWTH_MOCK = [
  { month: 'Jan', earnings: 45000 },
  { month: 'Feb', earnings: 52000 },
  { month: 'Mar', earnings: 64000 },
  { month: 'Apr', earnings: 58000 },
  { month: 'May', earnings: 72000 },
  { month: 'Jun', earnings: 84500 },
];

const TREATMENT_MODE_DATA = [
  { name: 'Home Visit', value: 45, color: '#014f86' },
  { name: 'Online', value: 30, color: '#a9d6e5' },
  { name: 'Clinic', value: 25, color: '#013a63' },
];

// --- Helper Functions ---
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

const getStatusColor = (status: SessionStatus) => {
  switch (status) {
    case 'UPCOMING':
      return 'bg-[#014f86] text-white hover:bg-[#013a63]';
    case 'COMPLETED':
      return 'bg-success text-white hover:bg-emerald-600';
    case 'PENDING':
      return 'bg-amber-500 text-white hover:bg-amber-600';
    case 'CANCELLED':
      return 'bg-muted text-muted-foreground hover:bg-muted';
  }
};

import { getTherapistDashboard } from '@/services/therapist.service';
import type { TherapistDashboardData } from '@/services/therapist.service';

export default function TherapistDashboard() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('weekly');
  const [dashboardData, setDashboardData] = useState<TherapistDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTherapistDashboard()
      .then((res) => {
        if (res.data) {
          setDashboardData(res.data);
        }
      })
      .catch((err) => {
        console.error('Failed to load therapist dashboard:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const todaySessions = dashboardData?.todaySessions || TODAY_SESSIONS;
  const weeklyTrend = dashboardData?.weeklyTrend || WEEKLY_SESSION_TREND;
  const monthlyTrend = dashboardData?.monthlyTrend || REVENUE_GROWTH_MOCK;
  const treatmentModeData = dashboardData?.treatmentModeData || TREATMENT_MODE_DATA;
  const activePatients = dashboardData?.activePatients ?? 32;
  const monthlyRevenue = dashboardData?.monthlyRevenue ?? 69290;
  const rating = dashboardData?.rating ?? 4.9;
  const totalRatings = dashboardData?.totalRatings ?? 48;

  return (
    <div className="min-h-body bg-[#f8fbfa] pb-24 font-sans">
      {/* Dynamic Header */}

      <main className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        {/* Title and Top Action */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-[#012a4a]">
              <LayoutDashboard className="h-6 w-6 text-[#014f86]" /> Dashboard Overview
            </h1>
            <p className="mt-2 text-sm text-[#013a63]">
              Quick summaries, visual graphs, and live clinic indicators.
            </p>
          </div>

          <Button
            onClick={() => navigate('/therapist/slot-management')}
            className="bg-[#014f86] text-white transition-colors hover:bg-[#013a63]"
          >
            <Plus className="mr-2 h-4 w-4" /> Manage Slots
          </Button>
        </div>

        {/* KPI Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Card 1: Today's Appointments */}
          <Card className="border-border py-0 shadow-sm transition-all hover:border-[#a9d6e5]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
                    Today's Sessions
                  </p>
                  <h3 className="text-3xl font-bold text-[#012a4a]">
                    {todaySessions.filter((s) => s.status !== 'CANCELLED').length}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-xs">
                    {todaySessions.filter((s) => s.status === 'COMPLETED').length} Completed
                  </p>
                </div>
                <div className="bg-secondary/40 flex h-12 w-12 items-center justify-center rounded-full text-[#014f86]">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Active Patients */}
          <Card className="border-border py-0 shadow-sm transition-all hover:border-[#a9d6e5]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
                    Active Patients
                  </p>
                  <h3 className="text-3xl font-bold text-[#012a4a]">{activePatients}</h3>
                  <p className="text-success mt-2 flex items-center gap-1 text-xs font-semibold">
                    <TrendingUp className="h-3 w-3" /> +8% new this week
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#014f86]/10 text-[#014f86]">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Monthly Net Earnings */}
          <Card className="border-border py-0 shadow-sm transition-all hover:border-[#a9d6e5]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
                    Monthly Net Revenue
                  </p>
                  <h3 className="text-3xl font-bold text-[#012a4a]">₹{monthlyRevenue.toLocaleString()}</h3>
                  <p className="text-muted-foreground mt-2 text-xs">Net earnings</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Wallet className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Clinical Rating */}
          <Card className="border-none bg-[#012a4a] py-0 text-white shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-1 text-xs font-bold tracking-wider text-[#a9d6e5] uppercase">
                    Clinical Rating
                  </p>
                  <h3 className="flex items-baseline gap-1 text-3xl font-bold text-white">
                    {rating} <span className="text-sm font-normal text-[#a9d6e5]">/ 5.0</span>
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="ml-1 text-[10px] text-gray-300">({totalRatings} ratings)</span>
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#a9d6e5]">
                  <Award className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts & Graphs Grid */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Chart Card (2/3 width on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="border-border flex h-full flex-col gap-0 bg-white pt-0 shadow-sm">
              <CardHeader className="bg-secondary/10 border-border flex flex-row items-center justify-between border-b py-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg text-[#012a4a]">
                    <Activity className="h-5 w-5 text-[#014f86]" /> Session Load & Volume
                  </CardTitle>
                  <CardDescription>
                    Visualizing treatment sessions handled over time.
                  </CardDescription>
                </div>
                <div className="border-border flex rounded-lg border bg-gray-100 p-0.5">
                  <button
                    onClick={() => setTimeRange('weekly')}
                    className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                      timeRange === 'weekly'
                        ? 'bg-white text-[#014f86] shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setTimeRange('monthly')}
                    className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                      timeRange === 'monthly'
                        ? 'bg-white text-[#014f86] shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </CardHeader>
              <CardContent className="flex grow flex-col justify-between pt-6 pl-0 sm:pl-6">
                <div className="h-72 w-full">
                  {timeRange === 'weekly' ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={weeklyTrend}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#014f86" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#014f86" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#64748b' }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#64748b' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            borderColor: '#e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                          }}
                          labelClassName="font-bold text-[#012a4a]"
                        />
                        <Area
                          type="monotone"
                          dataKey="sessions"
                          stroke="#014f86"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#colorSessions)"
                          name="Sessions Completed"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyTrend}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#64748b' }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#64748b' }}
                          tickFormatter={(v) => `₹${v / 1000}k`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            borderColor: '#e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                          }}
                          labelClassName="font-bold text-[#012a4a]"
                          formatter={(v) => [`₹${Number(v).toLocaleString()}`, 'Net Revenue']}
                        />
                        <Bar
                          dataKey="earnings"
                          fill="#014f86"
                          radius={[4, 4, 0, 0]}
                          name="Monthly Earnings"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#014f86]" />
                    <span className="text-xs font-medium text-[#012a4a]">
                      {timeRange === 'weekly' ? 'Daily Completed Sessions' : 'Monthly Net Revenue'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Patient Distribution Pie Chart (1/3 width on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-border flex h-full flex-col gap-0 bg-white pt-0 shadow-sm">
              <CardHeader className="bg-secondary/10 border-border border-b py-4">
                <CardTitle className="text-lg text-[#012a4a]">Consultation Types</CardTitle>
                <CardDescription>Treatment mode preferred by active patients.</CardDescription>
              </CardHeader>
              <CardContent className="flex grow flex-col items-center justify-between pt-6">
                <div className="flex h-56 w-full items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={treatmentModeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {treatmentModeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Percentage']}
                        contentStyle={{
                          backgroundColor: 'white',
                          borderColor: '#e2e8f0',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Custom Legend */}
                <div className="mt-4 w-full space-y-2">
                  {treatmentModeData.map((mode, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3.5 w-3.5 rounded-md"
                          style={{ backgroundColor: mode.color }}
                        />
                        <span className="font-semibold text-[#012a4a]">{mode.name}</span>
                      </div>
                      <span className="text-muted-foreground font-bold">{mode.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Schedule & Action Shortcuts */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Today's Schedule (2/3 width on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-border gap-0 overflow-hidden bg-white py-0 shadow-sm">
              <CardHeader className="bg-secondary/10 border-border flex flex-row items-center justify-between border-b py-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg text-[#012a4a]">
                    <Clock className="h-5 w-5 text-[#014f86]" /> Today's Schedule
                  </CardTitle>
                  <CardDescription>Appointments scheduled for your shifts today.</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/therapist/my-bookings')}
                  className="flex items-center gap-1 p-0 text-xs font-semibold text-[#014f86] hover:text-[#013a63]"
                >
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {todaySessions.length > 0 ? (
                  <div className="divide-border divide-y">
                    {todaySessions.map((session) => (
                      <div
                        key={session.id}
                        className="hover:bg-secondary/10 flex flex-col items-start justify-between gap-4 p-5 transition-colors sm:flex-row sm:items-center"
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-1 shrink-0 rounded-full bg-slate-100 p-2.5 text-[#013a63] sm:mt-0">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-base leading-tight font-bold text-[#012a4a]">
                              {session.patientName}
                            </h4>
                            <p className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
                              <span>
                                {session.patientGender}, {session.patientAge} yrs
                              </span>
                              <span className="inline-block h-1 w-1 rounded-full bg-slate-300" />
                              <span className="flex items-center gap-1 font-medium text-[#014f86]">
                                {getModeIcon(session.mode)}
                                {getModeLabel(session.mode)}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
                          <div className="text-left sm:text-right">
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-[#012a4a]">
                              <Clock className="text-muted-foreground h-3.5 w-3.5" />
                              {session.timeSlot.split(' - ')[0]}
                            </span>
                            <p className="text-muted-foreground mt-0.5 text-[10px] sm:mt-0">
                              Duration: 45 min
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge
                              className={`px-2.5 py-1 text-xs ${getStatusColor(session.status)}`}
                            >
                              {session.status}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate(`/therapist/my-booking/${session.id}`)}
                              className="border-border hover:bg-secondary/20 h-8 text-xs font-semibold text-[#014f86]"
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Calendar className="text-muted-foreground/30 mx-auto mb-3 h-12 w-12" />
                    <h4 className="text-base font-bold text-[#012a4a]">
                      No sessions scheduled for today
                    </h4>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Check your availability or open new time slots.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions Shortcuts (1/3 width on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-border flex h-full flex-col gap-0 bg-white pt-0 shadow-sm">
              <CardHeader className="bg-secondary/10 border-border border-b py-4">
                <CardTitle className="text-lg text-[#012a4a]">Clinical Shortcuts</CardTitle>
                <CardDescription>Quick links to manage your clinical settings.</CardDescription>
              </CardHeader>
              <CardContent className="flex grow flex-col justify-between gap-4 pt-6">
                <div className="space-y-3.5">
                  <button
                    onClick={() => navigate('/therapist/slot-management')}
                    className="border-border hover:bg-secondary/15 group flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-all hover:border-[#014f86]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary/40 rounded-lg p-2 text-[#014f86] transition-all group-hover:bg-[#014f86] group-hover:text-white">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-[#012a4a]">Slot Management</h5>
                        <p className="text-muted-foreground mt-0.5 text-[10px]">
                          Set availability & working shifts
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="text-muted-foreground h-4 w-4 transition-colors group-hover:text-[#014f86]" />
                  </button>

                  <button
                    onClick={() => navigate('/therapist/commission-history')}
                    className="border-border hover:bg-secondary/15 group flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-all hover:border-[#014f86]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary/40 rounded-lg p-2 text-[#014f86] transition-all group-hover:bg-[#014f86] group-hover:text-white">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-[#012a4a]">Financial Ledger</h5>
                        <p className="text-muted-foreground mt-0.5 text-[10px]">
                          Track payout history & platform commission
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="text-muted-foreground h-4 w-4 transition-colors group-hover:text-[#014f86]" />
                  </button>

                  <button
                    onClick={() => navigate('/therapist/profile')}
                    className="border-border hover:bg-secondary/15 group flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-all hover:border-[#014f86]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary/40 rounded-lg p-2 text-[#014f86] transition-all group-hover:bg-[#014f86] group-hover:text-white">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-[#012a4a]">Clinical Profile</h5>
                        <p className="text-muted-foreground mt-0.5 text-[10px]">
                          Manage bio, services, pricing & details
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="text-muted-foreground h-4 w-4 transition-colors group-hover:text-[#014f86]" />
                  </button>

                  <button
                    onClick={() => navigate('/therapist/subscriptions')}
                    className="border-border hover:bg-secondary/15 group flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-all hover:border-[#014f86]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary/40 rounded-lg p-2 text-[#014f86] transition-all group-hover:bg-[#014f86] group-hover:text-white">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-[#012a4a]">Subscription Plan</h5>
                        <p className="text-muted-foreground mt-0.5 text-[10px]">
                          View limits & premium clinic features
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="text-muted-foreground h-4 w-4 transition-colors group-hover:text-[#014f86]" />
                  </button>
                </div>

                <div className="rounded-xl border border-[#012a4a]/10 bg-[#012a4a]/5 p-4 text-center">
                  <h6 className="text-xs font-semibold text-[#012a4a]">Need assistance?</h6>
                  <p className="text-muted-foreground mt-1 text-[10px]">
                    Contact PhysioBuddies support for help with scheduling, credentials or patient
                    issues.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/contact')}
                    className="hover:bg-secondary/20 mt-3 h-8 w-full border-[#014f86] text-xs font-semibold text-[#014f86]"
                  >
                    Help Center
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
