'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Filter, Search } from 'lucide-react';

import PageHeader from '@/components/custom/page-header/page-header';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTherapistBookingList } from './hooks/useTherapistBookingList';
import { TherapistBookingCard } from './components/TherapistBookingCard';

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

export default function TherapistBookingListPage() {
  const {
    navigate,
    isLoading,
    filteredBookings,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    modeFilter,
    setModeFilter,
  } = useTherapistBookingList();

  return (
    <div className="bg-background min-h-screen pb-24 font-sans">
      <PageHeader
        heading={
          <span>
            Treatment Session <span className="text-[#a9d6e5]">Manager</span>
          </span>
        }
        subheading="Track patient sessions, monitor progress, or review past therapy sessions."
      />

      <div className="relative z-20 mx-auto -mt-12 max-w-5xl px-4 sm:px-6">
        <Card className="border-border mb-8 bg-white py-0 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <Tabs
                defaultValue="ALL"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full md:w-auto"
              >
                <TabsList className="bg-secondary/50 grid h-auto w-full grid-cols-4 rounded-lg p-0 md:flex md:w-auto">
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

        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-border p-6 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <Skeleton className="h-12 w-48" />
                    <Skeleton className="h-12 w-40" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredBookings.length > 0 ? (
            <motion.div
              key={activeTab + modeFilter + searchQuery}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {filteredBookings.map((booking) => (
                <motion.div key={booking.id} variants={itemVariants}>
                  <TherapistBookingCard
                    booking={booking}
                    onNavigate={(id) => navigate(`/therapist/my-booking/${id}`)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
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
