import { useIsTherapist } from '@/hooks/isLoggedIn';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function TherapistRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const isTherapistStatus = useIsTherapist();

  useEffect(() => {
    if (!isTherapistStatus) {
      toast.error('access forbiden');
      navigate('/login');
    }
  }, [isTherapistStatus, navigate]);

  if (!isTherapistStatus) {
    return <p>Checking authentication...</p>;
  }

  return <>{children}</>;
}
