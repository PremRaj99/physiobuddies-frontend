import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: readonly string[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-8 flex items-center gap-2">
      {steps.map((label, i) => {
        const n = i + 1;
        const active = currentStep === n;
        const done = currentStep > n;
        return (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors',
                  done
                    ? 'bg-[#014f86] text-white'
                    : active
                      ? 'bg-[#014f86] text-white ring-4 ring-[#014f86]/20'
                      : 'bg-gray-200 text-gray-500',
                )}
              >
                {done ? <CheckCircle2 className="h-4 w-4" /> : n}
              </div>
              <span
                className={cn(
                  'hidden text-sm font-medium sm:block',
                  active ? 'text-[#014f86]' : done ? 'text-[#014f86]/70' : 'text-gray-400',
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 flex-1 transition-colors',
                  done ? 'bg-[#014f86]' : 'bg-gray-200',
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
