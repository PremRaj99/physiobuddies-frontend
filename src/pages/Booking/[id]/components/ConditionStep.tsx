import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CONDITIONS } from '../constants';

interface ConditionStepProps {
  selectedConditionId: string | null;
  onSelectCondition: (id: string) => void;
  problemDesc: string;
  onChangeDesc: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export const ConditionStep: React.FC<ConditionStepProps> = ({
  selectedConditionId,
  onSelectCondition,
  problemDesc,
  onChangeDesc,
  onBack,
  onNext,
}) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
    <h2 className="mb-2 text-2xl font-bold text-[#012a4a]">Your Condition</h2>
    <p className="text-muted-foreground mb-6">What are you seeking treatment for?</p>

    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {CONDITIONS.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelectCondition(c.id)}
          className={cn(
            'relative overflow-hidden rounded-2xl border-2 text-left transition-all',
            selectedConditionId === c.id ? 'border-[#014f86] ring-2 ring-[#014f86]/30' : 'border-transparent hover:border-[#a9d6e5]',
          )}
        >
          <img src={c.image} alt={c.title} className="h-24 w-full object-cover" />
          <div className="p-2">
            <p className="text-sm font-bold text-[#012a4a]">{c.title}</p>
            <p className="text-muted-foreground text-xs">{c.desc}</p>
          </div>
          {selectedConditionId === c.id && (
            <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#014f86]">
              <CheckCircle2 className="h-3 w-3 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>

    <div className="mb-8 space-y-2">
      <Label htmlFor="desc">Describe your problem (optional)</Label>
      <Textarea
        id="desc"
        placeholder="E.g. Pain in lower back for 2 weeks, worsens when sitting..."
        value={problemDesc}
        onChange={(e) => onChangeDesc(e.target.value)}
        className="border-[#a9d6e5] focus-visible:ring-[#014f86]"
        rows={3}
      />
    </div>

    <div className="flex justify-between">
      <Button variant="outline" onClick={onBack}>
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Button size="lg" className="bg-[#014f86] hover:bg-[#013a63]" disabled={!selectedConditionId} onClick={onNext}>
        Review & Pay <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </motion.div>
);
