import { motion } from 'framer-motion';
import { Bell, Lock } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export const NotificationsTab = () => {
  const [prefs, setPrefs] = useState({
    announcements: true,
    discounts: false,
    feedback: true,
    healthTips: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-[#012a4a]">
            <Bell className="h-6 w-6 text-[#014f86]" /> Notification Preferences
          </CardTitle>
          <CardDescription>Manage how we communicate with you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          {/* Mandatory Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-[#013a63] uppercase">
              Required Notifications
            </h4>
            <div className="bg-secondary/10 space-y-5 rounded-xl border border-[#a9d6e5]/40 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <Label className="flex items-center gap-2 text-base font-semibold text-[#012a4a]">
                    Transactional Alerts <Lock className="text-muted-foreground h-3 w-3" />
                  </Label>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Booking confirmations, payment receipts, and schedule changes. Cannot be
                    disabled.
                  </p>
                </div>
                <Switch checked disabled className="data-[state=checked]:bg-[#014f86]/50" />
              </div>

              <Separator className="bg-border/50" />

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <Label className="flex items-center gap-2 text-base font-semibold text-[#012a4a]">
                    Security Alerts <Lock className="text-muted-foreground h-3 w-3" />
                  </Label>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    New sign-ins, password changes, and account security notices. Cannot be
                    disabled.
                  </p>
                </div>
                <Switch checked disabled className="data-[state=checked]:bg-[#014f86]/50" />
              </div>
            </div>
          </div>

          {/* Optional Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-[#013a63] uppercase">
              Optional Updates
            </h4>
            <div className="border-border space-y-5 rounded-xl border p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <Label
                    htmlFor="announcements"
                    className="cursor-pointer text-base font-semibold text-[#012a4a]"
                  >
                    Clinic Announcements
                  </Label>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Updates about new services, doctors, or clinic operational changes.
                  </p>
                </div>
                <Switch
                  id="announcements"
                  checked={prefs.announcements}
                  onCheckedChange={(c) => setPrefs({ ...prefs, announcements: c })}
                  className="data-[state=checked]:bg-[#014f86]"
                />
              </div>

              <Separator className="bg-border/50" />

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <Label
                    htmlFor="discounts"
                    className="cursor-pointer text-base font-semibold text-[#012a4a]"
                  >
                    Offers & Discounts
                  </Label>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Receive special wellness packages and promotional discount codes.
                  </p>
                </div>
                <Switch
                  id="discounts"
                  checked={prefs.discounts}
                  onCheckedChange={(c) => setPrefs({ ...prefs, discounts: c })}
                  className="data-[state=checked]:bg-[#014f86]"
                />
              </div>

              <Separator className="bg-border/50" />

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <Label
                    htmlFor="feedback"
                    className="cursor-pointer text-base font-semibold text-[#012a4a]"
                  >
                    Feedback & Surveys
                  </Label>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Requests to rate your recent sessions to help us improve our care.
                  </p>
                </div>
                <Switch
                  id="feedback"
                  checked={prefs.feedback}
                  onCheckedChange={(c) => setPrefs({ ...prefs, feedback: c })}
                  className="data-[state=checked]:bg-[#014f86]"
                />
              </div>

              <Separator className="bg-border/50" />

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <Label
                    htmlFor="healthTips"
                    className="cursor-pointer text-base font-semibold text-[#012a4a]"
                  >
                    Health Tips & Blogs
                  </Label>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Weekly newsletters containing physiotherapy exercises and wellness tips.
                  </p>
                </div>
                <Switch
                  id="healthTips"
                  checked={prefs.healthTips}
                  onCheckedChange={(c) => setPrefs({ ...prefs, healthTips: c })}
                  className="data-[state=checked]:bg-[#014f86]"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
