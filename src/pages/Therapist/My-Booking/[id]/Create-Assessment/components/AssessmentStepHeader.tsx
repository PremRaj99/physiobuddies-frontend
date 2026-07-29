import React from 'react';
import { Activity, CheckCircle2, HeartPulse, Stethoscope } from 'lucide-react';

interface AssessmentStepHeaderProps {
  currentStep: number;
}

const steps = [
  { num: 1, title: 'Patient Vitals', icon: Activity },
  { num: 2, title: 'Physical Exam', icon: Stethoscope },
  { num: 3, title: 'Clinical Plan', icon: HeartPulse },
  { num: 4, title: 'Review & Save', icon: CheckCircle2 },
];

export const AssessmentStepHeader: React.FC<AssessmentStepHeaderProps> = ({ currentStep }) => {
  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {steps.map((s) => {
        const Icon = s.icon;
        const isActive = currentStep === s.num;
        const isPast = currentStep > s.num;

        return (
          <div
            key={s.num}
            className={`flex items-center gap-3 rounded-xl border p-3.5 transition-all ${
              isActive
                ? 'border-[#014f86] bg-white shadow-md ring-2 ring-[#014f86]/10'
                : isPast
                  ? 'border-emerald-200 bg-emerald-50/50 text-emerald-800'
                  : 'border-slate-200 bg-white opacity-60'
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-bold ${
                isActive
                  ? 'bg-[#014f86] text-white'
                  : isPast
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-500'
              }`}
            >
              {isPast ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Step 0{s.num}
              </p>
              <p className="text-xs font-bold text-[#012a4a]">{s.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
