import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import RazorpayProvider from './components/custom/razorpay/RazorPayProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  // ⚡ useState ensures the same client instance on re-renders
  const [queryClient] = useState(() => new QueryClient());

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <RazorpayProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </RazorpayProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
