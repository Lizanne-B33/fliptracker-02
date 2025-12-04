// AuthMiddleware.jsx
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function AuthMiddleware() {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (accessToken) {
    return <Outlet />;
  }

  // Redirect to home with a flag
  return (
    <Navigate to="/" state={{ sessionExpired: true, from: location }} replace />
  );
}
