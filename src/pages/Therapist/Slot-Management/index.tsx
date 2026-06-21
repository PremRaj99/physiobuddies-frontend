'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  CalendarDays,
  CalendarSearch,
  CalendarX2,
  Clock,
  Home,
  Moon,
  MoonStar,
  Save,
  Settings2,
  ShieldCheck,
  Sun,
  Sunrise,
  Sunset,
  User,
  Video,
} from 'lucide-react';
import { useState } from 'react';

import PageHeader from '@/components/custom/page-header/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// --- Types & Data Structures ---
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TIME_PERIODS = [
  { id: 'early_morning', label: 'Early Morning', icon: Sunrise, range: [6, 8] },
  { id: 'morning', label: 'Morning', icon: Sun, range: [9, 11] },
  { id: 'noon', label: 'Noon', icon: Sun, range: [12, 14] },
  { id: 'evening', label: 'Evening', icon: Sunset, range: [15, 18] },
  { id: 'night', label: 'Night', icon: Moon, range: [19, 21] },
  { id: 'late_night', label: 'Late Night', icon: MoonStar, range: [22, 23] },
];

interface DaySchedule {
  isOff: boolean;
  disabledSlots: string[]; // List of specific slots that are disabled
}

interface DateOverride {
  isOff: boolean;
  blockedSlots: string[];
}

interface UpcomingBooking {
  id: string;
  patientName: string;
  date: string;
  time: string;
  mode: 'online' | 'clinic' | 'home_visit';
}

// --- Helper Functions ---
const generateSlotsForPeriod = (startHour: number, endHour: number) => {
  const slots = [];
  for (let h = startHour; h <= endHour; h++) {
    for (const m of [0, 30]) {
      const isPM = h >= 12;
      const displayH = h % 12 === 0 ? 12 : h % 12;
      const displayM = m === 0 ? '00' : '30';
      const ampm = isPM ? 'PM' : 'AM';
      slots.push(`${String(displayH).padStart(2, '0')}:${displayM} ${ampm}`);
    }
  }
  return slots;
};

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

// --- Mock Data ---
// Mocking up to 3 days ahead from Jun 21, 2026
const MOCK_BOOKINGS: UpcomingBooking[] = [
  {
    id: 'BKG-01',
    patientName: 'Robert Fox',
    date: 'Jun 22, 2026',
    time: '09:00 AM',
    mode: 'online',
  },
  {
    id: 'BKG-02',
    patientName: 'Eleanor Pena',
    date: 'Jun 22, 2026',
    time: '11:30 AM',
    mode: 'clinic',
  },
  {
    id: 'BKG-03',
    patientName: 'Albert Flores',
    date: 'Jun 23, 2026',
    time: '04:00 PM',
    mode: 'home_visit',
  },
  {
    id: 'BKG-04',
    patientName: 'Jane Cooper',
    date: 'Jun 24, 2026',
    time: '10:00 AM',
    mode: 'online',
  },
];

const INITIAL_SCHEDULE: Record<string, DaySchedule> = DAYS_OF_WEEK.reduce(
  (acc, day) => {
    acc[day] = { isOff: day === 'Sunday', disabledSlots: [] };
    return acc;
  },
  {} as Record<string, DaySchedule>,
);

// --- Main Component ---
export default function TherapistSlotManagementPage() {
  const [activeMainTab, setActiveMainTab] = useState('weekly');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>(INITIAL_SCHEDULE);

  // Specific Date Overrides State
  const [overrideDate, setOverrideDate] = useState('');
  const [overrides, setOverrides] = useState<Record<string, DateOverride>>({
    '2026-06-25': { isOff: true, blockedSlots: [] },
    '2026-06-26': { isOff: false, blockedSlots: ['09:00 AM', '09:30 AM'] },
  });

  const [isSaving, setIsSaving] = useState(false);

  // --- Handlers for Weekly Schedule ---
  const handleToggleDayOff = (checked: boolean) => {
    setSchedule((prev) => ({
      ...prev,
      [selectedDay]: { ...prev[selectedDay], isOff: checked },
    }));
  };

  const handleToggleSlot = (slot: string) => {
    setSchedule((prev) => {
      const dayData = prev[selectedDay];
      const newDisabled = dayData.disabledSlots.includes(slot)
        ? dayData.disabledSlots.filter((s) => s !== slot)
        : [...dayData.disabledSlots, slot];
      return { ...prev, [selectedDay]: { ...dayData, disabledSlots: newDisabled } };
    });
  };

  const handleBulkPeriodAction = (periodSlots: string[], action: 'enable' | 'disable') => {
    setSchedule((prev) => {
      const dayData = prev[selectedDay];
      let newDisabled = [...dayData.disabledSlots];

      if (action === 'disable') {
        // Add all period slots that aren't already disabled
        periodSlots.forEach((slot) => {
          if (!newDisabled.includes(slot)) newDisabled.push(slot);
        });
      } else {
        // Remove all period slots from disabled list
        newDisabled = newDisabled.filter((slot) => !periodSlots.includes(slot));
      }

      return { ...prev, [selectedDay]: { ...dayData, disabledSlots: newDisabled } };
    });
  };

  // --- Handlers for Overrides ---
  const getOverrideData = () => overrides[overrideDate] || { isOff: false, blockedSlots: [] };

  const handleToggleOverrideDayOff = (checked: boolean) => {
    if (!overrideDate) return;
    setOverrides((prev) => ({
      ...prev,
      [overrideDate]: { ...getOverrideData(), isOff: checked },
    }));
  };

  const handleToggleOverrideSlot = (slot: string) => {
    if (!overrideDate) return;
    setOverrides((prev) => {
      const dateData = prev[overrideDate] || { isOff: false, blockedSlots: [] };
      const newBlocked = dateData.blockedSlots.includes(slot)
        ? dateData.blockedSlots.filter((s) => s !== slot)
        : [...dateData.blockedSlots, slot];
      return { ...prev, [overrideDate]: { ...dateData, blockedSlots: newBlocked } };
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // alert or toast here
    }, 1000);
  };

  // --- Sub-components for rendering slots ---
  const renderPeriodCard = (
    period: (typeof TIME_PERIODS)[0],
    disabledSlots: string[],
    onToggle: (slot: string) => void,
  ) => {
    const slots = generateSlotsForPeriod(period.range[0], period.range[1]);
    // const allDisabled = slots.every((s) => disabledSlots.includes(s));

    return (
      <Card key={period.id} className="border-border mb-4 overflow-hidden bg-white py-0 shadow-sm">
        <div className="bg-secondary/20 border-border flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <period.icon className="h-5 w-5 text-[#014f86]" />
            <h4 className="font-bold text-[#012a4a]">{period.label}</h4>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs font-medium text-[#014f86] hover:bg-[#a9d6e5]/30"
              onClick={() => handleBulkPeriodAction(slots, 'enable')}
            >
              Enable All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:bg-destructive/10 h-8 text-xs font-medium"
              onClick={() => handleBulkPeriodAction(slots, 'disable')}
            >
              Disable All
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            {slots.map((slot) => {
              const isDisabled = disabledSlots.includes(slot);
              return (
                <button
                  key={slot}
                  onClick={() => onToggle(slot)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
                    isDisabled
                      ? 'text-muted-foreground border-gray-200 bg-gray-100 line-through opacity-60'
                      : 'border-[#014f86] bg-[#014f86] text-white shadow-sm hover:bg-[#013a63] hover:shadow-md'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-body bg-[#f8fbfa] pb-24 font-sans">
      <PageHeader
        heading={
          <span>
            <span className="text-[#a9d6e5]">Slot</span> Management
          </span>
        }
        subheading="Configure your weekly availability, block specific dates, and review upcoming sessions."
      />

      <main className="relative z-20 mx-auto -mt-8 max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT/MAIN COLUMN: Editor */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-border bg-white py-0 shadow-xl shadow-[#012a4a]/5">
              <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
                <div className="border-border bg-secondary/10 rounded-t-xl border-b p-4">
                  <TabsList className="border-border grid w-full grid-cols-2 border bg-white/50 p-1">
                    <TabsTrigger
                      value="weekly"
                      className="font-medium data-[state=active]:bg-[#014f86] data-[state=active]:text-white"
                    >
                      <Settings2 className="mr-2 h-4 w-4" /> Weekly Defaults
                    </TabsTrigger>
                    <TabsTrigger
                      value="overrides"
                      className="font-medium data-[state=active]:bg-[#014f86] data-[state=active]:text-white"
                    >
                      <CalendarX2 className="mr-2 h-4 w-4" /> Date Overrides
                    </TabsTrigger>
                  </TabsList>
                </div>

                <CardContent className="p-6">
                  {/* TAB 1: WEEKLY DEFAULTS */}
                  <TabsContent value="weekly" className="m-0 space-y-6">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                      <div className="flex flex-wrap gap-2">
                        {DAYS_OF_WEEK.map((day) => (
                          <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                              selectedDay === day
                                ? 'bg-[#012a4a] text-white shadow-md'
                                : 'bg-secondary/30 hover:bg-secondary/60 border-border border text-[#013a63]'
                            }`}
                          >
                            {day.substring(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between rounded-xl border border-[#a9d6e5]/50 bg-[#a9d6e5]/20 p-4">
                      <div>
                        <Label className="text-base font-bold text-[#012a4a]">
                          Mark {selectedDay} as Day Off
                        </Label>
                        <p className="text-muted-foreground text-sm">
                          Disable all bookings for every {selectedDay}.
                        </p>
                      </div>
                      <Switch
                        checked={schedule[selectedDay].isOff}
                        onCheckedChange={handleToggleDayOff}
                        className="data-[state=checked]:bg-destructive"
                      />
                    </div>

                    <AnimatePresence mode="popLayout">
                      {schedule[selectedDay].isOff ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="py-12 text-center"
                        >
                          <MoonStar className="text-muted-foreground/30 mx-auto mb-4 h-12 w-12" />
                          <h3 className="text-lg font-bold text-[#012a4a]">Day Disabled</h3>
                          <p className="text-muted-foreground">
                            You are not accepting appointments on {selectedDay}s.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="space-y-4"
                        >
                          <div className="mb-2 flex items-end justify-between">
                            <h3 className="text-lg font-bold text-[#013a63]">Manage Time Slots</h3>
                            <p className="text-muted-foreground text-xs">
                              Select a slot to toggle availability.
                            </p>
                          </div>
                          {TIME_PERIODS.map((period) =>
                            renderPeriodCard(
                              period,
                              schedule[selectedDay].disabledSlots,
                              handleToggleSlot,
                            ),
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </TabsContent>

                  {/* TAB 2: SPECIFIC DATE OVERRIDES */}
                  <TabsContent value="overrides" className="m-0 space-y-6">
                    <div className="bg-secondary/10 border-border rounded-xl border p-5">
                      <Label className="mb-3 block text-base font-bold text-[#012a4a]">
                        Select a specific date to modify
                      </Label>
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <Input
                          type="date"
                          value={overrideDate}
                          onChange={(e) => setOverrideDate(e.target.value)}
                          className="w-full border-[#a9d6e5] focus-visible:ring-[#014f86] sm:w-64"
                        />
                        {overrideDate && overrides[overrideDate]?.isOff && (
                          <Badge variant="destructive" className="flex items-center justify-center">
                            Currently Marked as Day Off
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mt-2 text-xs">
                        Use this to block out vacation days or adjust slots for a specific holiday
                        without changing your weekly defaults.
                      </p>
                    </div>

                    <AnimatePresence mode="popLayout">
                      {overrideDate ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-6"
                        >
                          <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-4">
                            <div>
                              <Label className="text-base font-bold text-amber-900">
                                Mark entire date as Day Off
                              </Label>
                              <p className="text-sm text-amber-700">
                                Disable all bookings for {overrideDate}.
                              </p>
                            </div>
                            <Switch
                              checked={getOverrideData().isOff}
                              onCheckedChange={handleToggleOverrideDayOff}
                              className="data-[state=checked]:bg-destructive"
                            />
                          </div>

                          {!getOverrideData().isOff && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-bold text-[#013a63]">
                                Block/Unblock Specific Slots
                              </h3>
                              {TIME_PERIODS.map((period) => {
                                const slots = generateSlotsForPeriod(
                                  period.range[0],
                                  period.range[1],
                                );
                                return (
                                  <div
                                    key={period.id}
                                    className="border-border rounded-xl border p-4"
                                  >
                                    <h4 className="mb-3 flex items-center gap-2 font-bold text-[#012a4a]">
                                      <period.icon className="h-4 w-4 text-[#014f86]" />{' '}
                                      {period.label}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {slots.map((slot) => {
                                        const isBlocked =
                                          getOverrideData().blockedSlots.includes(slot);
                                        return (
                                          <button
                                            key={slot}
                                            onClick={() => handleToggleOverrideSlot(slot)}
                                            className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-all ${
                                              isBlocked
                                                ? 'border-red-200 bg-red-50 text-red-600 line-through'
                                                : 'border-border hover:bg-secondary/30 bg-white text-[#014f86]'
                                            }`}
                                          >
                                            {slot}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <div className="py-12 text-center">
                          <CalendarSearch className="text-muted-foreground/30 mx-auto mb-4 h-12 w-12" />
                          <h3 className="text-lg font-bold text-[#012a4a]">No Date Selected</h3>
                          <p className="text-muted-foreground">
                            Select a date above to manage its specific slots.
                          </p>
                        </div>
                      )}
                    </AnimatePresence>
                  </TabsContent>
                </CardContent>

                {/* Global Save Button for the form area */}
                <div className="border-border flex justify-end rounded-b-xl border-t bg-gray-50 p-4">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="min-w-37.5 bg-[#014f86] text-white hover:bg-[#013a63]"
                  >
                    {isSaving ? (
                      'Saving...'
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Schedule Changes
                      </>
                    )}
                  </Button>
                </div>
              </Tabs>
            </Card>
          </div>

          {/* RIGHT COLUMN: Upcoming 3 Days */}
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
                        <h4 className="truncate pr-2 font-bold text-[#012a4a]">
                          {booking.patientName}
                        </h4>
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
                  Slot modifications will not affect currently booked appointments. To cancel a
                  booked appointment, visit the Booking Details page.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
