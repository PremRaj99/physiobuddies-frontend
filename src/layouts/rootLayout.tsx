import { Outlet } from 'react-router-dom';
import Header from '@/components/custom/header/header';
import { Providers } from '@/provider';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/custom/scrol-to-top/scroll-to-top';
// import FloatingMenu from "@/components/Footer/FloatingMenu";
// import FloatingWhatsapp from "@/components/Footer/FloatingWhatsapp";

export default function RootLayout() {
  return (
    <div className="bg-background text-foreground relative h-screen min-h-screen w-full overflow-hidden pb-20 md:pb-0">
      <Providers>
        <ScrollToTop />
        <div id="main-scroll-container" className="relative z-10 h-screen overflow-y-auto">
          <Header />
          <Outlet />
        </div>
        <Toaster />
      </Providers>
    </div>
  );
}
