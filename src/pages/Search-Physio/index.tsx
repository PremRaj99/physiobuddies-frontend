import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, SlidersHorizontal, Stethoscope } from 'lucide-react';

import ClinicCard from './components/clinic-card';
import SearchSection from './components/search-section';
import Sidebar from './components/side-bar';
import TherapistCard from './components/therapist-card';
import { useSearchPhysio, initialFilterState, type Filters } from './hooks/useSearchPhysio';

const LoadingSkeleton = () => (
  <>
    {[1, 2, 3, 4].map((_, index) => (
      <div
        key={index}
        className="border-border flex h-100 flex-col overflow-hidden rounded-2xl border bg-white shadow-sm md:h-64 md:flex-row"
      >
        <Skeleton className="h-48 w-full rounded-none md:h-full md:w-1/3" />
        <div className="flex w-full flex-col gap-4 p-6 md:w-2/3">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <div className="mt-4 flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="mt-auto flex justify-between">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    ))}
  </>
);

const NoResults = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-secondary/10 border-secondary/30 col-span-1 flex flex-col items-center justify-center rounded-3xl border px-4 py-20 text-center md:col-span-2"
  >
    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
      <Stethoscope className="text-primary/40 h-10 w-10" />
    </div>
    <h3 className="mb-2 text-2xl font-bold text-[#012a4a]">Expanding Our Network</h3>
    <p className="max-w-md text-[#012a4a]/70">
      We currently don't have verified specialists matching exactly these filters in this area. Try
      adjusting your search or explore online consultations.
    </p>
  </motion.div>
);

const clinicData = [
  {
    name: 'Olive Physiotherapy',
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop',
    ],
    desc: 'Advanced rehab center.',
    rating: 4.9,
    amount: 1199,
    finalAmount: 799,
  },
];

export default function TherapistList() {
  const { filters, setFilters, therapists, isLoading } = useSearchPhysio();

  const handleFilterChange = (name: keyof Filters, value: unknown) => {
    setFilters((prev: Filters) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => setFilters(initialFilterState);

  return (
    <div className="min-h-body bg-white font-sans">
      <SearchSection filters={filters} onFilterChange={handleFilterChange} />

      <div className="mx-auto flex max-w-350 flex-col gap-8 px-4 py-8 md:flex-row md:px-8">
        <aside className="hidden w-72 shrink-0 md:block">
          <div className="sticky top-24">
            <Sidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>
        </aside>

        <main className="flex-1 space-y-12">
          <div className="flex justify-end md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="border-border h-12 rounded-xl px-6 text-[#012a4a] shadow-sm"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] border-r-0 bg-white p-0 sm:w-100">
                <div className="h-full overflow-y-auto">
                  <Sidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <section>
            <div className="mb-6 flex items-center gap-3">
              <Stethoscope className="text-primary h-8 w-8" />
              <h2 className="text-3xl font-bold tracking-tight text-[#012a4a]">
                Clinical Specialists
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <LoadingSkeleton />
                ) : therapists.length > 0 ? (
                  therapists.map((therapist) => (
                    <motion.div
                      key={therapist.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TherapistCard {...therapist} />
                    </motion.div>
                  ))
                ) : (
                  <NoResults />
                )}
              </AnimatePresence>
            </div>
          </section>

          <section className="border-secondary/50 border-t pt-8">
            <div className="mb-6 flex items-center gap-3">
              <Building2 className="h-8 w-8 text-[#013a63]" />
              <h2 className="text-3xl font-bold tracking-tight text-[#012a4a]">Verified Clinics</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {clinicData.map((clinic, idx) => (
                <ClinicCard key={idx} {...clinic} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
