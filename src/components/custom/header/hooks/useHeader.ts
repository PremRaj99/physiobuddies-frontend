import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Home, Search, House, Building2, Globe } from 'lucide-react';
import React from 'react';
import { useCurrUser } from '@/hooks/isLoggedIn';
import { useCurrUser as useUser } from '@/store/userStore';
import { useLogout } from '@/hooks/useAuth';

export interface NavigationItem {
  name: string;
  href: string;
  icon: ReactNode;
}

export interface NetworkItem {
  title: string;
  icon: ReactNode;
  href: string;
}

export const useHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useCurrUser();
  const removeUser = useUser((state) => state.removeUser);
  const logoutMutation = useLogout();

  const navigationItems: NavigationItem[] = [
    { name: 'Home', href: '/', icon: React.createElement(Home, { className: 'h-4 w-4' }) },
    {
      name: 'Search Physio',
      href: '/search',
      icon: React.createElement(Search, { className: 'h-4 w-4' }),
    },
  ];

  const networkItems: NetworkItem[] = [
    {
      title: 'Home Network',
      icon: React.createElement(House, { className: 'h-4 w-4' }),
      href: '/network/home',
    },
    {
      title: 'Clinic Network',
      icon: React.createElement(Building2, { className: 'h-4 w-4' }),
      href: '/network/clinic',
    },
    {
      title: 'Online Network',
      icon: React.createElement(Globe, { className: 'h-4 w-4' }),
      href: '/network/online',
    },
  ];

  const handleProfileView = () => {
    if (user.role === 'therapist') {
      navigate('/therapist/profile');
    } else if (user.role === 'patient') {
      navigate('/patient/profile');
    } else {
      toast.error('Unknown user role. Please log in again.');
    }
  };

  const handleTherapyPlans = () => {
    if (user.role === 'therapist') {
      navigate('/therapist/my-bookings');
    } else if (user.role === 'patient') {
      navigate('/patient/my-bookings');
    } else {
      toast.error('Unknown user role. Please log in again.');
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        removeUser();
        toast.success('Logged out successfully!');
        navigate('/login');
      },
      onError: (err: unknown) => {
        console.error('Logout API error, clearing local session anyway:', err);
        removeUser();
        toast.success('Logged out successfully!');
        navigate('/login');
      },
    });
  };

  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    navigate,
    user,
    navigationItems,
    networkItems,
    handleProfileView,
    handleTherapyPlans,
    handleLogout,
  };
};

export type UseHeaderReturn = ReturnType<typeof useHeader>;
