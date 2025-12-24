import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './common/Loader';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
