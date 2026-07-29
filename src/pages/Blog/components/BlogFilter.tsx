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

interface BlogFilterProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTag: string;
  onTagChange: (value: string) => void;
  allTags: string[];
}

export const BlogFilter: React.FC<BlogFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedTag,
  onTagChange,
  allTags,
}) => {
  return (
    <Card className="border-border mb-10 overflow-hidden bg-white py-0 shadow-sm transition-all">
      <CardContent className="flex flex-col items-center justify-between gap-4 p-4 md:flex-row">
        <div className="relative w-full md:w-96">
          <Search className="text-muted-foreground absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search articles by title or keyword..."
            value={searchQuery}
            onChange={onSearchChange}
            className="border-border bg-slate-50/50 pl-10 text-[#012a4a] focus:bg-white focus-visible:ring-[#014f86]"
          />
        </div>

        <div className="flex w-full items-center gap-3 md:w-auto">
          <span className="flex items-center gap-1.5 text-xs font-bold whitespace-nowrap text-[#012a4a]">
            <Filter className="h-3.5 w-3.5 text-[#014f86]" /> Topic:
          </span>
          <Select value={selectedTag} onValueChange={onTagChange}>
            <SelectTrigger className="border-border w-full bg-slate-50/50 font-medium text-[#012a4a] focus:bg-white md:w-48">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
