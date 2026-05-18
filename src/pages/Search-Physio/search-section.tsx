import { motion, type Variants } from 'framer-motion';
import { ChevronDown, Globe, Home, Hospital, Laptop, MapPin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import BackgroundDecor from './healthy-vibe-decorator';
import type { Filters } from '.';

// Compact Location Search
const LocationSearch = () => (
  <input
    placeholder="Enter location..."
    className="h-11 w-full bg-transparent text-sm text-[#012a4a] outline-none placeholder:text-[#012a4a]/40"
  />
);

interface SearchSectionProps {
  filters: Filters;
  onFilterChange: (key: string, value: unknown) => void;
}

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function SearchSection({ filters, onFilterChange }: SearchSectionProps) {
  const modes = [
    { label: 'All Modes', value: [], icon: Globe },
    { label: 'Home Visit', value: ['Home Visit'], icon: Home },
    { label: 'Online Session', value: ['online'], icon: Laptop },
    { label: 'Clinic Visit', value: ['clinic'], icon: Hospital },
  ];

  const currentMode =
    modes.find((m) => JSON.stringify(m.value) === JSON.stringify(filters.mode)) || modes[0];
  const Icon = currentMode.icon;

  return (
    <div className="relative w-full overflow-hidden bg-[#013a63] px-4 py-12 md:py-16">
      {/* --- Healthy Vibes & Canopy Decor --- */}
      <BackgroundDecor />
      {/* --- End Decor --- */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
          Find your recovery partner.
        </h1>
        <p className="mx-auto max-w-xl text-base font-light text-[#a9d6e5]">
          Access verified clinical experts near you.
        </p>

        {/* Compact Search Bar Container */}
        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-1.5 shadow-xl shadow-[#012a4a]/20 md:flex-row md:gap-0 md:rounded-full">
          {/* Mode Dropdown */}
          <div className="border-border relative w-full md:w-1/3 md:border-r">
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:bg-secondary/10 group flex h-11 w-full items-center justify-between rounded-xl bg-transparent px-5 transition-colors outline-none md:rounded-l-full">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#012a4a]">
                  <Icon className="text-primary h-4 w-4" />
                  {currentMode.label}
                </div>
                <ChevronDown className="h-4 w-4 text-[#012a4a]/40 transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-border w-52 rounded-xl bg-white p-1.5 shadow-xl">
                {modes.map((mode, idx) => {
                  const ModeIcon = mode.icon;
                  return (
                    <DropdownMenuItem
                      key={idx}
                      onClick={() => onFilterChange('category', mode.value)}
                      className="hover:bg-secondary/20 focus:bg-secondary/20 flex cursor-pointer items-center gap-2.5 rounded-lg p-2.5 text-sm text-[#012a4a] focus:text-[#012a4a]"
                    >
                      <ModeIcon className="text-primary h-4 w-4" />
                      <span className="font-medium">{mode.label}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Location Input */}
          <div className="flex w-full items-center px-5 md:w-2/3">
            <MapPin className="text-primary mr-2.5 h-4 w-4 shrink-0" />
            <LocationSearch />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
