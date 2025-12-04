// Originally forked - modified with help from AI to use JWT only.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth
// Modified with help from Copilot to determine the Outlet required
// the Nesting chain in React 6.

// ===================================================================
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'; // <-- add this
import { useAuth } from '../context/AuthContext';
import { axiosInstance } from '../api/apiConfig';
import useRefreshToken from '../hooks/useRefreshToken';

export default function PersistLogin() {
  const { user, setUser } = useAuth();
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    const verifyUser = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        setLoading(false); // No refresh → show login
        return;
      }

      try {
        const newAccessToken = await refresh();
        if (!newAccessToken) {
          setLoading(false);
          return;
        }

        const res = await axiosInstance.get('/api/user/me/', {
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Cannot refresh or fetch user:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [user, setUser, refresh]);

  if (loading) return <div>Loading...</div>;
  return <Outlet />; // <-- critical change
}
