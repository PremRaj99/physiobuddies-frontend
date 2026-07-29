import { AnimatePresence } from 'framer-motion';
import { Bell, Shield, Smartphone } from 'lucide-react';

import PageHeader from '@/components/custom/page-header/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DevicesTab } from './components/device-tab';
import { NotificationsTab } from './components/notification-tab';
import { SecurityTab } from './components/security-tab';
import { useSettings } from './hooks/useSettings';

export default function SettingsPage() {
  useSettings();

  return (
    <div className="min-h-screen bg-[#f8fbfa] font-sans">
      <PageHeader
        heading="Preferences & Settings"
        subheading="Manage your account security, notifications, and active sessions."
      />

      <main className="mx-auto max-w-5xl px-4 pt-12 pb-24 sm:px-6">
        <Tabs defaultValue="security" className="flex flex-col gap-8 md:flex-row">
          <TabsList className="my-8 flex h-auto flex-col items-stretch gap-4 bg-transparent p-0 md:my-0 md:flex-row">
            <TabsTrigger
              value="security"
              className="text-muted-foreground data-[state=active]:border-border border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Shield className="mr-3 h-4 w-4" /> Security & Password
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="text-muted-foreground data-[state=active]:border-border border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Bell className="mr-3 h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger
              value="devices"
              className="text-muted-foreground data-[state=active]:border-border border-border data-[state=active]:bg-primary justify-start rounded-lg border px-4 py-3 transition-all hover:bg-white/50 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Smartphone className="mr-3 h-4 w-4" /> Active Devices
            </TabsTrigger>
          </TabsList>

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <TabsContent value="security" className="mt-0 outline-none">
                <SecurityTab />
              </TabsContent>

              <TabsContent value="notifications" className="mt-0 outline-none">
                <NotificationsTab />
              </TabsContent>

              <TabsContent value="devices" className="mt-0 outline-none">
                <DevicesTab />
              </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
