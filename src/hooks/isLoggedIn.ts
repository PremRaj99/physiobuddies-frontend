import { useCurrUser as useUser, type User } from '@/store/userStore';

const emptyUser: User = {
  id: null,
  name: null,
  role: null,
  email: null,
  phone: null,
};

export const useCurrUser = (): User => {
  // useCurrUser may accept a selector; keep selector typed loosely to avoid runtime issues
  const user = useUser((state) => state.user);
  return user ?? emptyUser;
};

export const useIsLoggedIn = () => {
  const user = useCurrUser();
  return !!user?.id;
};

export const useIsTherapist = () => {
  const user = useCurrUser();
  return user?.role === 'therapist';
};

export const useIsPatient = () => {
  const user = useCurrUser();
  return user?.role === 'patient';
};

export const useIsAdmin = () => {
  const user = useCurrUser();
  return user?.role === 'admin';
};
