// Originally forked - modified with help from AI to use only cookies.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { axiosInstance } from '../api/apiConfig'; // simple axios, no retry
import useRefreshToken from '../hooks/useRefreshToken';

export default function PersistLogin({ children }) {
  const { user, setUser } = useAuth();
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    const verifyUser = async () => {
      const hasRefreshCookie = document.cookie.includes('refresh');
      if (!hasRefreshCookie) {
        setLoading(false); // No refresh → show login
        return;
      }

      try {
        // Try to refresh the token
        await refresh();

        // After refresh, fetch user safely
        const res = await axiosInstance.get('auth/me/', {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error('Cannot refresh or fetch user:', err);
        setUser(null); // treat as guest
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [user, setUser, refresh]);

  if (loading) return <div>Loading...</div>;
  return children;
}
