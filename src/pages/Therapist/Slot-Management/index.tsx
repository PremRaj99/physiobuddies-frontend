'use client';

import { Save } from 'lucide-react';

import PageHeader from '@/components/custom/page-header/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { WeeklyDefaultsTab } from './components/WeeklyDefaultsTab';
import { DateOverridesTab } from './components/DateOverridesTab';
import { UpcomingScheduleSidebar } from './components/UpcomingScheduleSidebar';
import { useSlotManagement } from './hooks/useSlotManagement';

export default function TherapistSlotManagementPage() {
  const {
    activeMainTab,
    setActiveMainTab,
    selectedDay,
    setSelectedDay,
    schedule,
    overrideDate,
    setOverrideDate,
    getOverrideData,
    overridesList,
    handleToggleDayOff,
    handleToggleSlot,
    handleBulkPeriodAction,
    handleToggleOverrideDayOff,
    handleToggleOverrideSlot,
    handleDeleteOverride,
    handleSave,
    isSaving,
  } = useSlotManagement();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <PageHeader
        heading="Slot Management"
        subheading="Configure your default weekly hours and date-specific overrides."
      />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-border gap-0 overflow-hidden rounded-xl bg-white py-0 shadow-sm">
              <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
                <div className="border-border bg-secondary/10 rounded-t-xl border-b p-4">
                  <TabsList className="border-border grid w-full grid-cols-2 border bg-white/50 p-1">
                    <TabsTrigger
                      value="weekly"
                      className="font-bold transition-all data-[state=active]:bg-[#014f86] data-[state=active]:text-white"
                    >
                      Weekly Defaults
                    </TabsTrigger>
                    <TabsTrigger
                      value="overrides"
                      className="font-bold transition-all data-[state=active]:bg-[#014f86] data-[state=active]:text-white"
                    >
                      Date Overrides
                    </TabsTrigger>
                  </TabsList>
                </div>

                <CardContent className="p-6">
                  {activeMainTab === 'weekly' ? (
                    <WeeklyDefaultsTab
                      selectedDay={selectedDay}
                      setSelectedDay={setSelectedDay}
                      schedule={schedule}
                      handleToggleSlot={handleToggleSlot}
                      handleToggleDayOff={handleToggleDayOff}
                      handleBulkPeriodAction={handleBulkPeriodAction}
                    />
                  ) : (
                    <DateOverridesTab
                      overrideDate={overrideDate}
                      setOverrideDate={setOverrideDate}
                      getOverrideData={getOverrideData}
                      schedule={schedule}
                      handleToggleOverrideDayOff={handleToggleOverrideDayOff}
                      handleToggleOverrideSlot={handleToggleOverrideSlot}
                      overridesList={overridesList}
                      handleDeleteOverride={handleDeleteOverride}
                    />
                  )}
                </CardContent>

                <div className="border-border flex justify-end rounded-b-xl border-t bg-gray-50 p-4">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="min-w-37.5 bg-[#014f86] text-white hover:bg-[#013a63]"
                  >
                    {isSaving ? (
                      'Saving...'
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Schedule Changes
                      </>
                    )}
                  </Button>
                </div>
              </Tabs>
            </Card>
          </div>

          <UpcomingScheduleSidebar />
        </div>
      </main>
    </div>
  );
}
