import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ActivityFilterHeaderProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  typeFilter: string;
  setTypeFilter: (val: string) => void;
}

export const ActivityFilterHeader: React.FC<ActivityFilterHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
}) => {
  return (
    <Card className="border-border mb-6 bg-white py-0 shadow-sm">
      <CardContent className="flex flex-col items-center justify-between gap-4 p-4 sm:flex-row">
        <div className="relative w-full sm:w-80">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search log titles, descriptions, IPs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-border bg-white pl-9 text-[#012a4a] focus-visible:ring-[#014f86]"
          />
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <span className="flex items-center gap-1 text-xs font-bold whitespace-nowrap text-[#012a4a] sm:inline">
            <Filter className="h-3 w-3" /> Filter By:
          </span>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="border-border w-full bg-white text-[#012a4a] sm:w-45">
              <SelectValue placeholder="Activity Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="frequent">Frequent Actions</SelectItem>
              <SelectItem value="likely">Likely Operations</SelectItem>
              <SelectItem value="possible">Possible Changes</SelectItem>
              <SelectItem value="rare">Rare Events</SelectItem>
              <SelectItem value="unlikely">Unlikely Checks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
