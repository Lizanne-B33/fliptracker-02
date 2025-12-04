// AuthMiddleware.jsx
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function AuthMiddleware() {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (accessToken) {
    // User is authenticated → render child routes
    return <Outlet />;
  }

  // User is not authenticated → show friendly message + redirect
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ color: 'red' }}>Session Expired</h2>
      <p>
        You’ve been logged out due to inactivity or session timeout. Please log
        in again to continue.
      </p>
      {/* Redirect to login */}
      <Navigate to="/auth/login" state={{ from: location }} replace />
    </div>
  );
}
