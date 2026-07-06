import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

export type User = {
  id: string | null;
  name: string | null;
  role: 'therapist' | 'patient' | 'admin' | null;
  email: string | null;
  phone?: string | null;
  image?: string | null;
  therapistStatus?: {
    isOnboardingFilled: boolean;
    isVerified: boolean;
    isFinalOnboardingFilled: boolean;
  } | null;
  therapistProfile?: {
    id: string;
    about?: string | null;
    displayAddress?: string | null;
    location?: { lat: number; lng: number } | null;
  } | null;
};

const initialUser: User = {
  id: null,
  name: null,
  role: null,
  email: null,
  phone: null,
  image: null,
  therapistStatus: null,
  therapistProfile: null,
};

export interface UserState {
  user: User;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useCurrUser = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: initialUser,
        setUser: (user: User) => set({ user }),
        removeUser: () => set({ user: initialUser }),
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
