import React from 'react';
import { Award, Calendar, Star, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const DashboardMetrics: React.FC = () => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border-border py-0 shadow-sm transition-all hover:shadow-md">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
              Total Earnings
            </p>
            <h3 className="text-2xl font-bold text-[#012a4a]">₹42,500</h3>
            <p className="mt-1 text-xs font-medium text-emerald-600">+12.5% from last month</p>
          </div>
          <div className="rounded-2xl bg-[#014f86]/10 p-3 text-[#014f86]">
            <Wallet className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border py-0 shadow-sm transition-all hover:shadow-md">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
              Completed Sessions
            </p>
            <h3 className="text-2xl font-bold text-[#012a4a]">148</h3>
            <p className="mt-1 text-xs font-medium text-emerald-600">+8 new this week</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
            <Calendar className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border py-0 shadow-sm transition-all hover:shadow-md">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
              Avg Patient Rating
            </p>
            <h3 className="text-2xl font-bold text-[#012a4a]">4.9 / 5.0</h3>
            <p className="mt-1 text-xs font-medium text-slate-500">Based on 94 reviews</p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-3 text-amber-500">
            <Star className="h-6 w-6 fill-current" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border py-0 shadow-sm transition-all hover:shadow-md">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">
              Verification Tier
            </p>
            <h3 className="text-2xl font-bold text-[#012a4a]">Gold Partner</h3>
            <p className="mt-1 text-xs font-medium text-emerald-600">Verified & Active</p>
          </div>
          <div className="bg-secondary/40 rounded-2xl p-3 text-[#014f86]">
            <Award className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
