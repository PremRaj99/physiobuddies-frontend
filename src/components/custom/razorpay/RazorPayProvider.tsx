import { createContext, useCallback, useContext, useState } from 'react';


export interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export interface RazorpayCheckoutOptions {
    key?: string;
    amount: number; // in paise (e.g. 50000 = ₹500)
    currency?: string;
    name?: string;
    description?: string;
    image?: string;
    order_id: string;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
        color?: string;
    };
}

interface PaymentContextType {
    openRazorpayCheckout: (options: RazorpayCheckoutOptions) => Promise<RazorpayPaymentResponse>;
    isProcessing: boolean;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePaymentContext = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error('usePaymentContext must be used within a PaymentProvider / Providers');
    }
    return context;
};

const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Razorpay: any;
    }
}

export default function RazorpayProvider({ children }: { children: React.ReactNode }) {
    const [isProcessing, setIsProcessing] = useState(false);

    const openRazorpayCheckout = useCallback(
        async (options: RazorpayCheckoutOptions): Promise<RazorpayPaymentResponse> => {
            setIsProcessing(true);
            const isLoaded = await loadRazorpayScript();

            if (!isLoaded) {
                setIsProcessing(false);
                throw new Error('Razorpay SDK failed to load. Please check your network connection.');
            }

            return new Promise((resolve, reject) => {
                const razorpayKey = options.key || import.meta.env.VITE_RAZORPAY_KEY_ID || '';

                const checkoutOptions = {
                    key: razorpayKey,
                    amount: options.amount,
                    currency: options.currency || 'INR',
                    name: options.name || 'PhysioBuddies',
                    description: options.description || 'Therapy Session Booking',
                    image: options.image || '/logo.png',
                    order_id: options.order_id,
                    prefill: options.prefill || {},
                    notes: options.notes || {},
                    theme: {
                        color: options.theme?.color || '#014f86',
                    },
                    handler: function (response: RazorpayPaymentResponse) {
                        setIsProcessing(false);
                        resolve(response);
                    },
                    modal: {
                        ondismiss: function () {
                            setIsProcessing(false);
                            reject(new Error('Payment cancelled by user.'));
                        },
                    },
                };

                try {
                    const rzp = new window.Razorpay(checkoutOptions);
                    rzp.open();
                } catch (err) {
                    setIsProcessing(false);
                    reject(err);
                }
            });
        },
        [],
    );

    return (
        <PaymentContext.Provider value={{ openRazorpayCheckout, isProcessing }}>
            {children}
        </PaymentContext.Provider>
    )
}