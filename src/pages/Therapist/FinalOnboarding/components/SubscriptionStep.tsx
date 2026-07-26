import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export const SUBSCRIPTION_PLANS = [
  { id: '3m', months: 3, price: 449, popular: false },
  { id: '6m', months: 6, price: 749, popular: true },
  { id: '12m', months: 12, price: 1199, popular: false },
];

interface SubscriptionStepProps {
  formData: {
    planId: string;
  };
  updateField: (field: string, value: string) => void;
}

export const SubscriptionStep: React.FC<SubscriptionStepProps> = ({ formData, updateField }) => {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="relative mb-8 overflow-hidden rounded-xl bg-linear-to-r from-[#014f86] to-[#012a4a] p-6 text-center text-white">
        <Gift className="absolute top-1/2 left-4 h-24 w-24 -translate-y-1/2 text-white/10" />
        <Gift className="absolute top-1/2 right-4 h-24 w-24 -translate-y-1/2 text-white/10" />
        <h2 className="mb-2 text-2xl font-bold">Welcome to Medical-Trust!</h2>
        <p className="text-lg font-medium text-[#a9d6e5]">
          Get your 1st month of subscription completely FREE.
        </p>
      </div>

      <h3 className="mb-4 text-center text-xl font-bold text-[#012a4a]">
        Select your plan after the trial period
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <Card
            key={plan.id}
            onClick={() => updateField('planId', plan.id)}
            className={cn(
              `relative cursor-pointer overflow-hidden border-2 transition-all`,
              formData.planId === plan.id
                ? 'scale-[1.02] border-[#014f86] bg-[#f8fbfa] shadow-lg'
                : 'border-border bg-white hover:border-[#a9d6e5]',
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 rounded-bl-lg bg-[#014f86] px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                Most Popular
              </div>
            )}
            <CardContent className="p-6 text-center">
              <h4 className="mb-2 text-xl font-bold text-[#013a63]">{plan.months} Months</h4>
              <div className="mb-4 text-3xl font-black text-[#012a4a]">₹{plan.price}</div>
              <Separator className="mb-4" />
              <div className="text-muted-foreground space-y-2 text-sm">
                <p>Full platform access</p>
                <p>Priority listing</p>
                <p>24/7 Support</p>
              </div>
              <div
                className={cn(
                  `mt-6 w-full rounded-lg py-2 font-bold transition-colors`,
                  formData.planId === plan.id
                    ? 'bg-[#014f86] text-white'
                    : 'bg-secondary/30 text-[#014f86]',
                )}
              >
                {formData.planId === plan.id ? 'Selected' : 'Select Plan'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};
