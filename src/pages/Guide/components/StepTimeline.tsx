import React from 'react';
import { motion } from 'framer-motion';
import type { FlowStep } from '../hooks/useGuide';

export const StepTimeline: React.FC<{ steps: FlowStep[] }> = ({ steps }) => (
  <div className="relative">
    <div className="bg-secondary absolute top-2 bottom-2 left-6 w-px md:left-7" />

    <div className="space-y-8">
      {steps.map((step, idx) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="relative flex gap-5 md:gap-6"
          >
            <div className="relative z-10 shrink-0">
              <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md md:h-14 md:w-14">
                <Icon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <span className="border-secondary text-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border bg-white text-[10px] font-bold shadow-sm">
                {idx + 1}
              </span>
            </div>

            <div className="border-border grow rounded-2xl border bg-white p-5 shadow-sm md:p-6">
              <h4 className="text-lg font-bold text-[#012a4a] md:text-xl">{step.title}</h4>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {step.description}
              </p>
              {step.tip && (
                <div className="border-secondary bg-secondary/15 text-primary mt-4 rounded-xl border p-3 text-xs font-medium">
                  💡 <span className="font-bold">Pro Tip:</span> {step.tip}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);
