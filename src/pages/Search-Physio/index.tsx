import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, SlidersHorizontal, Stethoscope } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import ClinicCard from './clinic-card';
import SearchSection from './search-section';
import Sidebar from './side-bar';
import TherapistCard from './therapist-card';

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

export type Filters = {
  lng: number;
  lat: number;
  radius: number;
  mode: 'clinic' | 'home-visit' | 'online';
  price: number[];
  experience: number[];
  gender: 'male' | 'female' | 'other' | 'any';
  specialization: string[];
  sort: 'price' | 'rating' | 'experience' | 'distance';
  page: number;
  limit: number;
};
const initialFilterState: Filters = {
  lng: 77.1025,
  lat: 28.7041,
  radius: 10,
  mode: 'home-visit',
  price: [0, 5000],
  gender: 'any',
  specialization: [],
  experience: [0, 10],
  sort: 'rating',
  page: 1,
  limit: 10,
};

export type Therapist = {
  id: string;
  name: string;
  specializations: string[] | undefined;
  experience: number | undefined;
  rating: number | null;
  totalReviews: number;
  originalPrice: number | null;
  discountedPrice: number;
  displayAddress: string;
  image: string | null;
  distance: number | undefined;
};
// Mock Therapist Data
const therapistData: Therapist[] = [
  {
    id: '1',
    name: 'Aisha Sharma',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop',
    specializations: ['Sports Physio', 'Ortho'],
    rating: 4.8,
    totalReviews: 3,
    experience: 8,
    originalPrice: 1500,
    discountedPrice: 999,
    displayAddress: 'Delhi',
    distance: 5.2,
  },
  {
    id: '2',

    name: 'Rajiv Kapoor',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop',

    specializations: ['Neuro Physio'],
    rating: 4.9,
    totalReviews: 4,
    experience: 12,
    originalPrice: 2000,
    discountedPrice: 1499,
    displayAddress: 'Gurugram',
    distance: 8.5,
  },
  {
    id: '3',

    name: 'Aisha Sharma',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop',

    specializations: ['Sports Physio', 'Ortho'],
    rating: 2.5,
    totalReviews: 3,
    experience: 8,
    originalPrice: 1500,
    discountedPrice: 999,
    displayAddress: 'Delhi',
    distance: 2.5,
  },
  {
    id: '4',

    name: 'Rajiv Kapoor',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop',

    specializations: ['Neuro Physio'],
    rating: 4.9,
    totalReviews: 4,
    experience: 12,
    originalPrice: 2000,
    discountedPrice: 1499,
    displayAddress: 'Gurugram',
    distance: 8.5,
  },
];

// Mock Clinic Data
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
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(false);
  const [clinicLoading] = useState(false);

  const [filters, setFilters] = useState<Filters>(initialFilterState);

  const handleFilterChange = (name: string, value: unknown) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => setFilters(initialFilterState);

  // MOCK API CALL - Replace with your actual fetching logic
  const fetchTherapistData = useCallback(async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setTherapists(therapistData);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTherapistData();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchTherapistData]);

  return (
    <div className="min-h-body bg-white font-sans">
      <SearchSection filters={filters} onFilterChange={handleFilterChange} />

      <div className="mx-auto flex max-w-350 flex-col gap-8 px-4 py-8 md:flex-row md:px-8">
        {/* Desktop Sidebar */}
        <aside className="hidden w-72 shrink-0 md:block">
          <div className="sticky top-24">
            <Sidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-12">
          {/* Mobile Filter Trigger */}
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

          {/* Therapists Section */}
          <section>
            <div className="mb-6 flex items-center gap-3">
              <Stethoscope className="text-primary h-8 w-8" />
              <h2 className="text-3xl font-bold tracking-tight text-[#012a4a]">
                Clinical Specialists
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {loading ? (
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

          {/* Clinics Section */}
          <section className="border-secondary/50 border-t pt-8">
            <div className="mb-6 flex items-center gap-3">
              <Building2 className="h-8 w-8 text-[#013a63]" />
              <h2 className="text-3xl font-bold tracking-tight text-[#012a4a]">Verified Clinics</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {clinicLoading ? (
                <LoadingSkeleton />
              ) : (
                clinicData.map((clinic, idx) => <ClinicCard key={idx} {...clinic} />)
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
