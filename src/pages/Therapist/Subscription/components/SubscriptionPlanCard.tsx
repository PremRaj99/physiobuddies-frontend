import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { PlanItem } from '../hooks/useTherapistSubscription';

interface SubscriptionPlanCardProps {
  plan: PlanItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
}) => {
  return (
    <Card
      onClick={() => onSelect(plan.id)}
      className={`relative cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
        isSelected
          ? 'border-[#014f86] bg-white shadow-xl ring-2 ring-[#014f86]/20'
          : 'border-slate-200 bg-white shadow-sm hover:border-[#a9d6e5]'
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 rounded-bl-xl bg-[#014f86] px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
          Most Popular
        </div>
      )}

      <CardHeader className="p-6 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-[#012a4a]">{plan.name}</CardTitle>
            <p className="mt-1 text-xs text-slate-500">{plan.description}</p>
          </div>
          {plan.savings && (
            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
              {plan.savings}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-2">
        <div className="my-4 flex items-baseline gap-1">
          <span className="text-3xl font-bold text-[#012a4a]">₹{plan.price}</span>
          <span className="text-xs font-medium text-slate-500">/ {plan.months} months</span>
          <span className="ml-auto font-mono text-xs font-semibold text-[#014f86]">
            ~₹{plan.monthlyEquivalent}/mo
          </span>
        </div>

        <div className="space-y-2.5 border-t border-slate-100 pt-2">
          {plan.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className={`w-full font-semibold transition-all ${
            isSelected
              ? 'bg-[#014f86] text-white hover:bg-[#013a63]'
              : 'border-[#014f86] text-[#014f86] hover:bg-[#014f86]/10'
          }`}
          variant={isSelected ? 'default' : 'outline'}
        >
          {plan.buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
