import '../index.css';

import { Outlet } from 'react-router-dom';
import Header from '@/components/custom/header/header';
import { Providers } from '@/provider';
import { Toaster } from '@/components/ui/sonner';
// import FloatingMenu from "@/components/Footer/FloatingMenu";
// import FloatingWhatsapp from "@/components/Footer/FloatingWhatsapp";

export default function RootLayout() {
  return (
    <div className="bg-background text-foreground relative min-h-screen w-full overflow-hidden pb-20 md:pb-0">
      <Providers>
        <Header />

        <div className="relative z-10">
          <Outlet />
        </div>
        <Toaster />
      </Providers>
    </div>
  );
}
