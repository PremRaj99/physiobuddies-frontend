import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingEmptyStateProps {
  title?: string;
  description?: string;
  onClearFilters?: () => void;
}

export const BookingEmptyState: React.FC<BookingEmptyStateProps> = ({
  title = 'No sessions found',
  description = "We couldn't find any treatment sessions matching your current filters.",
  onClearFilters,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-border rounded-xl border border-dashed bg-white py-24 text-center"
    >
      <div className="mb-4 inline-flex rounded-full bg-[#a9d6e5]/30 p-4">
        <CalendarDays className="h-8 w-8 text-[#014f86]" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-[#012a4a]">{title}</h3>
      <p className="text-muted-foreground mx-auto mb-6 max-w-sm">{description}</p>
      {onClearFilters && (
        <Button
          variant="outline"
          className="border-[#014f86] text-[#014f86] transition-colors hover:bg-[#014f86] hover:text-white"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      )}
    </motion.div>
  );
};
