import React from 'react';
import { motion } from 'framer-motion';
import { SUBSCRIPTION_PLANS } from './SubscriptionStep';

interface ReviewStepProps {
  formData: {
    address: string;
    lat: string;
    lng: string;
    upiId: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
    planId: string;
  };
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
  const selectedPlan = SUBSCRIPTION_PLANS.find((p) => p.id === formData.planId);

  return (
    <motion.div
      key="step5"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="mb-2 text-2xl font-bold text-[#012a4a]">Review & Submit</h2>
      <p className="text-muted-foreground mb-6">
        Please verify your details before final submission.
      </p>

      <div className="space-y-6">
        <div className="bg-secondary/10 border-border rounded-xl border p-5">
          <h4 className="border-border mb-3 border-b pb-2 font-bold text-[#013a63]">
            Location Details
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block">Address:</span>{' '}
              <span className="font-semibold text-[#012a4a]">
                {formData.address} | {formData.lat || 'Not provided'},{' '}
                {formData.lng || 'Not provided'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-secondary/10 border-border rounded-xl border p-5">
          <h4 className="border-border mb-3 border-b pb-2 font-bold text-[#013a63]">Financials</h4>
          <div className="space-y-2 text-sm">
            {formData.upiId ? (
              <div>
                <span className="text-muted-foreground">UPI ID:</span>{' '}
                <span className="font-semibold text-[#012a4a]">{formData.upiId}</span>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-muted-foreground">Bank:</span>{' '}
                  <span className="font-semibold text-[#012a4a]">
                    {formData.bankName || 'Not provided'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Account:</span>{' '}
                  <span className="font-semibold text-[#012a4a]">
                    {formData.accountNumber
                      ? '••••' + formData.accountNumber.slice(-4)
                      : 'Not provided'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">IFSC:</span>{' '}
                  <span className="font-semibold text-[#012a4a]">
                    {formData.ifsc || 'Not provided'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {selectedPlan && (
          <div className="flex items-center justify-between rounded-xl bg-[#014f86] p-5 text-white shadow-md">
            <div>
              <h4 className="text-lg font-bold">Selected Subscription</h4>
              <p className="text-sm text-[#a9d6e5]">Includes 1 Month Free Trial</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black">{selectedPlan.months} Months</span>
              <p className="text-sm font-medium">₹{selectedPlan.price}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
