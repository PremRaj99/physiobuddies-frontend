import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// import { useIsPatient } from '@/hooks/isLoggedIn';

export default function PatientRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  //   const isPatientStatus = useIsPatient();
  const isPatientStatus = true;

  useEffect(() => {
    if (!isPatientStatus) {
      toast.error('access forbiden');
      navigate('/login');
    }
  }, [isPatientStatus, navigate]);

  if (!isPatientStatus) {
    return <p>Checking authentication...</p>;
  }

  return <>{children}</>;
}
