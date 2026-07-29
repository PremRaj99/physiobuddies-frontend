import { useReducer, useMemo } from 'react';
import { toast } from 'sonner';
import {
  useWeeklySchedule,
  useUpdateWeeklySchedule,
  useBlocksAndLeaves,
  useBlockSlots,
  useUnblockSlots,
  useOverrides,
} from '@/hooks/useTherapist';
import {
  mapBackendToUiSchedule,
  mapUiToBackendSchedule,
  generateSlotsForPeriod,
  parseSlotToHour,
} from '../utils';
import type { DaySchedule, DateOverride } from '../utils';

// ---------------------------------------------------------------------------
// State & Action types
// ---------------------------------------------------------------------------

type SlotState = {
  activeMainTab: string;
  selectedDay: string;
  overrideDate: string;
  /** User edits layered on top of the backend weekly schedule */
  scheduleOverrides: Record<string, DaySchedule>;
  /** User edits layered on top of fetched date-level block data */
  localOverrides: Record<string, DateOverride>;
};

type SlotAction =
  | { type: 'SET_ACTIVE_TAB'; tab: string }
  | { type: 'SET_SELECTED_DAY'; day: string }
  | { type: 'SET_OVERRIDE_DATE'; date: string }
  /**
   * Toggle the selected day's "day off" flag.
   * `currentSchedule` is the merged (backend + local overrides) schedule so
   * the reducer can read the latest value without closing over stale state.
   */
  | { type: 'TOGGLE_DAY_OFF'; currentSchedule: Record<string, DaySchedule> }
  /**
   * Enable or disable a batch of slots for the selected day.
   * `currentSchedule` is the merged schedule for the same reason as above.
   */
  | {
      type: 'BULK_PERIOD_ACTION';
      slots: string[];
      action: 'enable' | 'disable';
      currentSchedule: Record<string, DaySchedule>;
    }
  /**
   * Toggle a single individual slot for the selected day.
   * `currentSchedule` is the merged schedule.
   */
  | { type: 'TOGGLE_SLOT'; slot: string; currentSchedule: Record<string, DaySchedule> }
  /**
   * Toggle "day off" for the currently selected override date.
   * `currentOverrides` is the merged (fetched + local) overrides map.
   */
  | { type: 'TOGGLE_OVERRIDE_DAY_OFF'; currentOverrides: Record<string, DateOverride> }
  /**
   * Toggle a single slot's blocked state for the currently selected override date.
   * `currentOverrides` is the merged overrides map.
   */
  | { type: 'TOGGLE_OVERRIDE_SLOT'; slot: string; currentOverrides: Record<string, DateOverride> }
  /** Remove a date's entry from local overrides after a successful API delete. */
  | { type: 'CLEAR_DATE_LOCAL_OVERRIDE'; date: string };

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

const initialState: SlotState = {
  activeMainTab: 'weekly',
  selectedDay: 'Monday',
  overrideDate: '',
  scheduleOverrides: {},
  localOverrides: {},
};

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function slotReducer(state: SlotState, action: SlotAction): SlotState {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeMainTab: action.tab };

    case 'SET_SELECTED_DAY':
      return { ...state, selectedDay: action.day };

    case 'SET_OVERRIDE_DATE':
      return { ...state, overrideDate: action.date };

    case 'TOGGLE_DAY_OFF': {
      const { selectedDay } = state;
      const current = action.currentSchedule[selectedDay];
      const newIsOff = !current.isOff;
      return {
        ...state,
        scheduleOverrides: {
          ...state.scheduleOverrides,
          [selectedDay]: {
            isOff: newIsOff,
            disabledSlots: newIsOff ? generateSlotsForPeriod(6, 23) : [],
          },
        },
      };
    }

    case 'BULK_PERIOD_ACTION': {
      const { selectedDay } = state;
      const current = action.currentSchedule[selectedDay];
      let newDisabled = [...current.disabledSlots];
      if (action.action === 'disable') {
        action.slots.forEach((slot) => {
          if (!newDisabled.includes(slot)) newDisabled.push(slot);
        });
      } else {
        newDisabled = newDisabled.filter((slot) => !action.slots.includes(slot));
      }
      return {
        ...state,
        scheduleOverrides: {
          ...state.scheduleOverrides,
          [selectedDay]: { ...current, disabledSlots: newDisabled },
        },
      };
    }

    case 'TOGGLE_SLOT': {
      const { selectedDay } = state;
      const dayData = action.currentSchedule[selectedDay];
      const newDisabled = dayData.disabledSlots.includes(action.slot)
        ? dayData.disabledSlots.filter((s) => s !== action.slot)
        : [...dayData.disabledSlots, action.slot];
      return {
        ...state,
        scheduleOverrides: {
          ...state.scheduleOverrides,
          [selectedDay]: { ...dayData, disabledSlots: newDisabled },
        },
      };
    }

    case 'TOGGLE_OVERRIDE_DAY_OFF': {
      const { overrideDate } = state;
      const current = action.currentOverrides[overrideDate] ?? { isOff: false, blockedSlots: [] };
      const newIsOff = !current.isOff;
      return {
        ...state,
        localOverrides: {
          ...state.localOverrides,
          [overrideDate]: {
            isOff: newIsOff,
            blockedSlots: newIsOff ? generateSlotsForPeriod(6, 23) : [],
          },
        },
      };
    }

    case 'TOGGLE_OVERRIDE_SLOT': {
      const { overrideDate } = state;
      const dateData = action.currentOverrides[overrideDate] ?? { isOff: false, blockedSlots: [] };
      const newBlocked = dateData.blockedSlots.includes(action.slot)
        ? dateData.blockedSlots.filter((s) => s !== action.slot)
        : [...dateData.blockedSlots, action.slot];
      return {
        ...state,
        localOverrides: {
          ...state.localOverrides,
          [overrideDate]: { ...dateData, blockedSlots: newBlocked },
        },
      };
    }

    case 'CLEAR_DATE_LOCAL_OVERRIDE': {
      const next = { ...state.localOverrides };
      delete next[action.date];
      const nextOverrideDate = state.overrideDate === action.date ? '' : state.overrideDate;
      return { ...state, localOverrides: next, overrideDate: nextOverrideDate };
    }

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useSlotManagement() {
  const [state, dispatch] = useReducer(slotReducer, initialState);
  const { activeMainTab, selectedDay, overrideDate, scheduleOverrides, localOverrides } = state;

  // 1. Fetch Weekly Schedule Defaults
  const { data: weeklyScheduleData } = useWeeklySchedule();
  const updateWeeklyScheduleMutation = useUpdateWeeklySchedule();

  // 2. Fetch Blocks and Leaves for Overrides Tab
  const { data: blocksAndLeavesData, refetch: refetchBlocksAndLeaves } = useBlocksAndLeaves(
    overrideDate,
    !!overrideDate,
  );
  const blockSlotsMutation = useBlockSlots();
  const unblockSlotsMutation = useUnblockSlots();

  // 3. Fetch all active Date Overrides
  const { data: overridesList, refetch: refetchOverrides } = useOverrides();

  // Derive weekly schedule from backend data
  const backendSchedule = useMemo(() => {
    if (weeklyScheduleData?.success && weeklyScheduleData?.data?.schedule) {
      return mapBackendToUiSchedule(weeklyScheduleData.data.schedule);
    }
    return null;
  }, [weeklyScheduleData]);

  // Merge backend schedule with local user edits
  const schedule = useMemo(
    () => ({ ...backendSchedule, ...scheduleOverrides }),
    [backendSchedule, scheduleOverrides],
  );

  // Derive per-date override from fetched blocks data
  const fetchedDateOverride = useMemo(() => {
    if (overrideDate && blocksAndLeavesData?.success && blocksAndLeavesData?.data) {
      const { isOff, blockedHours } = blocksAndLeavesData.data;
      const blockedSlots = (blockedHours as number[]).map((hour) => {
        const isPM = hour >= 12;
        const displayH = hour % 12 === 0 ? 12 : hour % 12;
        const ampm = isPM ? 'PM' : 'AM';
        const displayHStr = String(displayH).padStart(2, '0');
        return `${displayHStr}:00 ${ampm} - ${displayHStr}:40 ${ampm}`;
      });
      return { isOff, blockedSlots };
    }
    return null;
  }, [blocksAndLeavesData, overrideDate]);

  // Merge fetched override data with local user edits
  const overrides = useMemo(() => {
    if (fetchedDateOverride && overrideDate && !(overrideDate in localOverrides)) {
      return { ...localOverrides, [overrideDate]: fetchedDateOverride };
    }
    return localOverrides;
  }, [fetchedDateOverride, localOverrides, overrideDate]);

  // ---------------------------------------------------------------------------
  // Event handlers — dispatch actions with the current merged state as payload
  // ---------------------------------------------------------------------------

  const handleToggleDayOff = () => {
    dispatch({ type: 'TOGGLE_DAY_OFF', currentSchedule: schedule });
  };

  const handleBulkPeriodAction = (slots: string[], action: 'enable' | 'disable') => {
    dispatch({ type: 'BULK_PERIOD_ACTION', slots, action, currentSchedule: schedule });
  };

  const handleToggleSlot = (slot: string) => {
    dispatch({ type: 'TOGGLE_SLOT', slot, currentSchedule: schedule });
  };

  const getOverrideData = (): DateOverride =>
    overrides[overrideDate] ?? { isOff: false, blockedSlots: [] };

  const handleToggleOverrideDayOff = () => {
    if (!overrideDate) return;
    dispatch({ type: 'TOGGLE_OVERRIDE_DAY_OFF', currentOverrides: overrides });
  };

  const handleToggleOverrideSlot = (slot: string) => {
    if (!overrideDate) return;
    dispatch({ type: 'TOGGLE_OVERRIDE_SLOT', slot, currentOverrides: overrides });
  };

  const handleDeleteOverride = (date: string) => {
    const allHours = Array.from({ length: 16 }, (_, i) => i + 6);
    const formattedIsoDate = new Date(date).toISOString();
    unblockSlotsMutation.mutate(
      { date: formattedIsoDate, startHours: allHours },
      {
        onSuccess: () => {
          toast.success(`Cleared overrides for ${date}`);
          refetchOverrides();
          refetchBlocksAndLeaves();
          dispatch({ type: 'CLEAR_DATE_LOCAL_OVERRIDE', date });
        },
        onError: (err: unknown) => {
          const response = (err as { response?: { data?: { message?: string } } }).response;
          toast.error(response?.data?.message || 'Failed to clear override.');
        },
      },
    );
  };

  const handleSave = () => {
    if (activeMainTab === 'weekly') {
      const backendSched = mapUiToBackendSchedule(schedule);
      updateWeeklyScheduleMutation.mutate(
        { schedule: backendSched },
        {
          onSuccess: () => {
            toast.success('Weekly schedule defaults saved successfully!');
          },
          onError: (err: unknown) => {
            const response = (err as { response?: { data?: { message?: string } } }).response;
            toast.error(response?.data?.message || 'Failed to save weekly defaults.');
          },
        },
      );
    } else if (activeMainTab === 'overrides') {
      if (!overrideDate) {
        toast.error('Please select a date first.');
        return;
      }
      const currentOverride = getOverrideData();
      const allHours = Array.from({ length: 16 }, (_, i) => i + 6); // 6 to 21
      const formattedIsoDate = new Date(overrideDate).toISOString();

      unblockSlotsMutation.mutate(
        { date: formattedIsoDate, startHours: allHours },
        {
          onSuccess: () => {
            const hoursToBlock = currentOverride.isOff
              ? allHours
              : currentOverride.blockedSlots.map(parseSlotToHour);

            if (hoursToBlock.length > 0) {
              blockSlotsMutation.mutate(
                { date: formattedIsoDate, startHours: hoursToBlock },
                {
                  onSuccess: () => {
                    toast.success('Specific date overrides saved successfully!');
                    refetchBlocksAndLeaves();
                    refetchOverrides();
                  },
                  onError: (err: unknown) => {
                    const response = (err as { response?: { data?: { message?: string } } })
                      .response;
                    toast.error(response?.data?.message || 'Failed to save blocks.');
                  },
                },
              );
            } else {
              toast.success('Specific date overrides cleared successfully!');
              refetchBlocksAndLeaves();
              refetchOverrides();
            }
          },
          onError: (err: unknown) => {
            const response = (err as { response?: { data?: { message?: string } } }).response;
            toast.error(response?.data?.message || 'Failed to reset slot blocks.');
          },
        },
      );
    }
  };

  const isSaving =
    updateWeeklyScheduleMutation.isPending ||
    blockSlotsMutation.isPending ||
    unblockSlotsMutation.isPending;

  return {
    activeMainTab,
    setActiveMainTab: (tab: string) => dispatch({ type: 'SET_ACTIVE_TAB', tab }),
    selectedDay,
    setSelectedDay: (day: string) => dispatch({ type: 'SET_SELECTED_DAY', day }),
    schedule,
    overrideDate,
    setOverrideDate: (date: string) => dispatch({ type: 'SET_OVERRIDE_DATE', date }),
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
  };
}
