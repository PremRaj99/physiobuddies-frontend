import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowDownAZ, IndianRupee, BriefcaseMedical } from 'lucide-react';
import type { Filters } from '.';

interface SidebarProps {
  filters: Filters;
  onFilterChange: (name: keyof Filters, value: unknown) => void;
  onResetFilters: () => void;
}

const FilterSection = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) => (
  <div className="border-secondary/40 border-b py-6 last:border-0">
    <h3 className="mb-4 flex items-center text-sm font-bold tracking-wider text-[#012a4a] uppercase">
      {Icon && <Icon className="text-primary mr-2 h-4 w-4" />}
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

export default function Sidebar({ filters, onFilterChange, onResetFilters }: SidebarProps) {
  const isMobile = useIsMobile();

  const specialities = [
    'Sports Physio',
    'Neuro Physio',
    'Ortho Physio',
    'Elderly Care',
    'Post Surgery',
    'Pediatric Physio',
  ];

  const handleSpecialityChange = (spec: string, checked: boolean) => {
    const currentValues = filters.specialization || [];
    const newValues = checked ? [...currentValues, spec] : currentValues.filter((v) => v !== spec);
    onFilterChange('specialization', newValues);
  };

  return (
    <div
      className={`flex h-full w-full flex-col bg-white ${
        !isMobile ? 'border-border rounded-3xl border p-6 shadow-sm' : 'p-6 pb-2'
      }`}
    >
      {/* Header */}
      <div className="border-border mb-2 flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold text-[#012a4a]">Filters</h2>
        {/* Desktop-only Reset Button (Avoids mobile close button overlap) */}
        {!isMobile && (
          <button
            onClick={onResetFilters}
            className="text-primary text-xs font-bold tracking-wider uppercase transition-colors hover:text-[#013a63]"
          >
            Reset All
          </button>
        )}
      </div>

      <div className="custom-scrollbar grow overflow-y-auto pr-2 pb-4">
        {/* --- Sorting Dropdown --- */}
        <FilterSection title="Sort Results" icon={ArrowDownAZ}>
          <Select value={filters.sort} onValueChange={(value) => onFilterChange('sort', value)}>
            <SelectTrigger className="border-border focus:ring-primary h-11 w-full rounded-xl text-[#012a4a] focus:ring-offset-0">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent className="border-border rounded-xl shadow-lg">
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="experience">Years of Experience</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="distance">Nearest to Me</SelectItem>
            </SelectContent>
          </Select>
        </FilterSection>

        {/* --- Dual Range Price Slider --- */}
        <FilterSection title="Consultation Fee" icon={IndianRupee}>
          <div className="px-2 pt-2">
            <Slider
              min={200}
              max={5000}
              step={100}
              value={filters.price?.length === 2 ? filters.price : [200, 5000]}
              onValueChange={(val) => onFilterChange('price', val)}
              className="w-full"
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm font-semibold text-[#012a4a]">
            <div className="bg-secondary/20 border-secondary min-w-20 rounded-lg border px-3 py-1.5 text-center">
              ₹{filters.price?.[0] || 200}
            </div>
            <span className="text-[#012a4a]/40">-</span>
            <div className="bg-secondary/20 border-secondary min-w-20 rounded-lg border px-3 py-1.5 text-center">
              ₹{filters.price?.[1] || 5000}
            </div>
          </div>
        </FilterSection>

        {/* --- Dual Range Experience Slider --- */}
        <FilterSection title="Years of Experience" icon={BriefcaseMedical}>
          <div className="px-2 pt-2">
            <Slider
              min={0}
              max={30}
              step={1}
              value={filters.experience?.length === 2 ? filters.experience : [0, 30]}
              onValueChange={(val) => onFilterChange('experience', val)}
              className="w-full"
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm font-semibold text-[#012a4a]">
            <div className="bg-secondary/20 border-secondary min-w-20 rounded-lg border px-3 py-1.5 text-center">
              {filters.experience?.[0] || 0} Yrs
            </div>
            <span className="text-[#012a4a]/40">-</span>
            <div className="bg-secondary/20 border-secondary min-w-20 rounded-lg border px-3 py-1.5 text-center">
              {filters.experience?.[1] || 30}+ Yrs
            </div>
          </div>
        </FilterSection>

        {/* --- Gender Radio Group --- */}
        <FilterSection title="Therapist Gender">
          <RadioGroup
            value={filters.gender || 'any'}
            onValueChange={(value) => onFilterChange('gender', value)}
            className="flex gap-2"
          >
            {[
              { id: 'any', label: 'Any' },
              { id: 'male', label: 'Male' },
              { id: 'female', label: 'Female' },
              { id: 'other', label: 'Other' },
            ].map((option) => (
              <div key={option.id} className="flex-1">
                <RadioGroupItem value={option.id} id={option.id} className="peer sr-only" />
                <label
                  htmlFor={option.id}
                  className="border-border hover:bg-secondary/10 peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary flex w-full cursor-pointer items-center justify-center rounded-xl border py-2 text-sm font-medium text-[#012a4a]/70 transition-all"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        </FilterSection>

        {/* --- Speciality Checkboxes --- */}
        <FilterSection title="Clinical Focus">
          <div className="space-y-3">
            {specialities.map((spec) => (
              <div key={spec} className="group flex items-center space-x-3">
                <Checkbox
                  id={`spec-${spec}`}
                  checked={(filters.specialization || []).includes(spec)}
                  onCheckedChange={(checked) => handleSpecialityChange(spec, checked as boolean)}
                  className="border-secondary/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary h-5 w-5 rounded-md"
                />
                <label
                  htmlFor={`spec-${spec}`}
                  className="cursor-pointer text-sm leading-none font-medium text-[#012a4a]/80 transition-colors group-hover:text-[#012a4a] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {spec}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      </div>

      {/* Mobile Sticky Footer (Reset + Apply) */}
      {isMobile && (
        <div className="border-border mt-auto mb-2 flex gap-3 border-t bg-white py-2">
          <Button
            variant="outline"
            onClick={onResetFilters}
            className="border-border h-10 w-1/3 rounded-xl font-semibold text-[#012a4a] shadow-sm"
          >
            Reset
          </Button>
          <Button className="bg-primary shadow-primary/20 h-10 w-2/3 rounded-xl font-semibold text-white shadow-lg transition-all hover:bg-[#013a63]">
            Apply
          </Button>
        </div>
      )}
    </div>
  );
}
