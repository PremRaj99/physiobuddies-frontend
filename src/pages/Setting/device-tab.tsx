import { motion } from 'framer-motion';
import { AlertCircle, Laptop, LogOut, Smartphone } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DeviceSession {
  id: string;
  os: string;
  browser: string;
  ip: string;
  lastActive: string;
  isCurrentSession: boolean;
  type: 'desktop' | 'mobile';
}

// --- Mock Data ---
const MOCK_DEVICES: DeviceSession[] = [
  {
    id: 'dev-1',
    os: 'macOS',
    browser: 'Chrome',
    ip: '192.168.1.42',
    lastActive: 'Active now',
    isCurrentSession: true,
    type: 'desktop',
  },
  {
    id: 'dev-2',
    os: 'iOS 16',
    browser: 'Safari',
    ip: '10.0.0.15',
    lastActive: '2 hours ago',
    isCurrentSession: false,
    type: 'mobile',
  },
  {
    id: 'dev-3',
    os: 'Windows 11',
    browser: 'Edge',
    ip: '172.16.254.1',
    lastActive: 'May 20, 2026',
    isCurrentSession: false,
    type: 'desktop',
  },
];

// --- Sub-Components ---

export const DevicesTab = () => {
  const [devices, setDevices] = useState<DeviceSession[]>(MOCK_DEVICES);

  const handleLogoutDevice = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-[#012a4a]">
            <Smartphone className="h-6 w-6 text-[#014f86]" /> Active Devices
          </CardTitle>
          <CardDescription>Manage devices currently logged into your account.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm leading-relaxed">
              If you see an unfamiliar device, log it out immediately and change your password in
              the Security tab.
            </p>
          </div>

          <div className="space-y-4">
            {devices.map((device) => (
              <div
                key={device.id}
                className="border-border flex flex-col justify-between gap-4 rounded-xl border bg-white p-4 transition-colors hover:border-[#a9d6e5] sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-secondary/30 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#014f86]">
                    {device.type === 'desktop' ? (
                      <Laptop className="h-6 w-6" />
                    ) : (
                      <Smartphone className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-[#012a4a]">
                      {device.os} • {device.browser}
                      {device.isCurrentSession && (
                        <Badge
                          variant="secondary"
                          className="bg-success/10 text-success border-success/20 text-[10px] uppercase"
                        >
                          Current Session
                        </Badge>
                      )}
                    </h4>
                    <p className="text-muted-foreground mt-0.5 text-sm">
                      IP: {device.ip} • Last active: {device.lastActive}
                    </p>
                  </div>
                </div>

                {!device.isCurrentSession && (
                  <Button
                    variant="outline"
                    className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:border-destructive w-full sm:w-auto"
                    onClick={() => handleLogoutDevice(device.id)}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log Out Device
                  </Button>
                )}
              </div>
            ))}

            {devices.length === 0 && (
              <div className="text-muted-foreground py-8 text-center">No active devices found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
