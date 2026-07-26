import TherapistRoute from '@/components/custom/ProtectedRoute/TherapistRoute';
import { Outlet } from 'react-router-dom';

export default function TherapistLayout() {
  return (
    <TherapistRoute>
      <Outlet />
    </TherapistRoute>
  );
}
