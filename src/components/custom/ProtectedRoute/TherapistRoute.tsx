import { useCurrUser, useIsTherapist } from '@/hooks/isLoggedIn';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

export default function TherapistRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isTherapistStatus = useIsTherapist();
  const user = useCurrUser();

  useEffect(() => {
    if (!isTherapistStatus) {
      toast.error('Access forbidden');
      navigate('/login');
      return;
    }

    const status = user.therapistStatus;

    if (!status || !status.isOnboardingFilled) {
      // 1. If onboarding NOT filled, only allow accessing /therapist/onboarding
      if (pathname !== '/therapist/onboarding') {
        navigate('/therapist/onboarding');
      }
    } else if (!status.isVerified) {
      // 2. If onboarding filled but NOT verified, only allow accessing /therapist/onboarding (shows success pending screen)
      if (pathname !== '/therapist/onboarding') {
        navigate('/therapist/onboarding');
      }
    } else if (!status.isFinalOnboardingFilled) {
      // 3. If verified but final onboarding NOT filled, only allow accessing /therapist/onboarding/final
      if (pathname !== '/therapist/onboarding/final') {
        navigate('/therapist/onboarding/final');
      }
    } else {
      // 4. If everything filled and verified, redirect away from onboarding pages to dashboard
      if (pathname === '/therapist/onboarding' || pathname === '/therapist/onboarding/final') {
        navigate('/therapist/dashboard');
      }
    }
  }, [isTherapistStatus, user.therapistStatus, pathname, navigate]);

  if (!isTherapistStatus) {
    return <p>Checking authentication...</p>;
  }

  return <>{children}</>;
}
