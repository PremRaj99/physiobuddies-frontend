import PatientRoute from '@/components/custom/ProtectedRoute/PatientRoute';
import { Outlet } from 'react-router-dom';

export default function PatientLayout() {
  return (
    <PatientRoute>
      <Outlet />
    </PatientRoute>
  );
}
