import React from 'react';
import { motion } from 'framer-motion';
import { Banknote, CreditCard } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface FinancialsStepProps {
  formData: {
    accountName: string;
    bankName: string;
    branchName: string;
    accountNumber: string;
    ifsc: string;
    upiId: string;
  };
  updateField: (field: string, value: string) => void;
}

export const FinancialsStep: React.FC<FinancialsStepProps> = ({ formData, updateField }) => {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="mb-2 text-2xl font-bold text-[#012a4a]">Account Details</h2>
      <p className="text-muted-foreground mb-6">
        Where should we send your session payouts? Provide Bank Details OR a UPI ID.
      </p>

      <div className="bg-secondary/10 border-border space-y-6 rounded-xl border p-6">
        <h3 className="border-border flex items-center gap-2 border-b pb-2 font-bold text-[#013a63]">
          <Banknote className="h-4 w-4" /> Option 1: Direct Bank Transfer
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-[#012a4a]">Account Holder Name</Label>
            <Input
              value={formData.accountName}
              onChange={(e) => updateField('accountName', e.target.value)}
              className="focus-visible:ring-[#014f86]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#012a4a]">Bank Name</Label>
            <Input
              value={formData.bankName}
              onChange={(e) => updateField('bankName', e.target.value)}
              className="focus-visible:ring-[#014f86]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#012a4a]">Branch Name</Label>
            <Input
              value={formData.branchName}
              onChange={(e) => updateField('branchName', e.target.value)}
              className="focus-visible:ring-[#014f86]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[#012a4a]">Account Number</Label>
            <Input
              type="password"
              value={formData.accountNumber}
              onChange={(e) => updateField('accountNumber', e.target.value)}
              className="focus-visible:ring-[#014f86]"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="text-[#012a4a]">IFSC Code</Label>
            <Input
              value={formData.ifsc}
              onChange={(e) => updateField('ifsc', e.target.value)}
              className="uppercase focus-visible:ring-[#014f86]"
            />
          </div>
        </div>
      </div>

      <div className="my-6 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-sm font-bold">OR</span>
        <Separator className="flex-1" />
      </div>

      <div className="bg-secondary/10 border-border space-y-4 rounded-xl border p-6">
        <h3 className="border-border flex items-center gap-2 border-b pb-2 font-bold text-[#013a63]">
          <CreditCard className="h-4 w-4" /> Option 2: UPI Transfer
        </h3>
        <div className="space-y-2">
          <Label className="text-[#012a4a]">UPI ID</Label>
          <Input
            placeholder="e.g. name@bank"
            value={formData.upiId}
            onChange={(e) => updateField('upiId', e.target.value)}
            className="max-w-md focus-visible:ring-[#014f86]"
          />
        </div>
      </div>
    </motion.div>
  );
};
