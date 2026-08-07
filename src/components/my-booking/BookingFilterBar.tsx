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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { TabOption } from './types';

interface BookingFilterBarProps {
  tabs: TabOption[];
  activeTab: string;
  onTabChange: (value: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  modeFilter: string;
  onModeFilterChange: (value: string) => void;
}

export const BookingFilterBar: React.FC<BookingFilterBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search...',
  modeFilter,
  onModeFilterChange,
}) => {
  const gridColsClass =
    tabs.length === 4 ? 'grid-cols-4' : tabs.length === 3 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <Card className="border-border mb-8 bg-white py-0 shadow-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Tabs
            defaultValue={tabs[0]?.value || 'ALL'}
            value={activeTab}
            onValueChange={onTabChange}
            className="w-full md:w-auto"
          >
            <TabsList
              className={`bg-secondary/50 grid h-auto w-full ${gridColsClass} rounded-lg p-0 md:flex md:w-auto`}
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-muted-foreground rounded-md px-4 py-2.5 transition-all data-[state=active]:bg-white data-[state=active]:text-[#014f86]"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="border-border bg-white pl-9 text-[#012a4a] focus-visible:ring-[#014f86]"
              />
            </div>

            <Select value={modeFilter} onValueChange={onModeFilterChange}>
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
  );
};
