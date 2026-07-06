import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type User = {
  id: string | null;
  name: string | null;
  role: 'therapist' | 'patient' | 'admin' | null;
  email: string | null;
  phone: string | null;
};

const initialUser: User = {
  id: null,
  name: null,
  role: null,
  email: null,
  phone: null,
};

export interface UserState {
  user: User;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useCurrUser = create<UserState>()(
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
);
