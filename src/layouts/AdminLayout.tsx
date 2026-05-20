import AdminRoute from '@/components/custom/ProtectedRoute/AdminRoute';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <AdminRoute>
      <Outlet />
    </AdminRoute>
  );
}
