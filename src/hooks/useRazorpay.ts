import { usePaymentContext, type RazorpayCheckoutOptions, type RazorpayPaymentResponse } from '@/components/custom/razorpay/RazorPayProvider';
import { useCallback } from 'react';

export const useRazorpay = () => {
  const { openRazorpayCheckout, isProcessing } = usePaymentContext();

  const processPayment = useCallback(
    async (params: {
      orderId: string;
      amount: number; // in INR (e.g. 500)
      keyId?: string;
      currency?: string;
      description?: string;
      prefill?: {
        name?: string;
        email?: string;
        contact?: string;
      };
      notes?: Record<string, string>;
    }): Promise<RazorpayPaymentResponse> => {
      const options: RazorpayCheckoutOptions = {
        key: params.keyId,
        order_id: params.orderId,
        amount: Math.round(params.amount * 100), // convert to paise
        currency: params.currency || 'INR',
        description: params.description || 'PhysioBuddies Session Booking',
        prefill: params.prefill,
        notes: params.notes,
      };

      return openRazorpayCheckout(options);
    },
    [openRazorpayCheckout],
  );

  return {
    processPayment,
    isProcessing,
  };
};
