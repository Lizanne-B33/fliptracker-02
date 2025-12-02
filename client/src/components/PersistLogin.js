import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/usePrivate';
import useRefreshToken from '../hooks/useRefreshToken';
import useLogout from '../hooks/useLogout';

export default function PersistLogin() {
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    setCSRFToken,
    setUser,
  } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();
  const logout = useLogout();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      try {
        // Rehydrate from storage (AuthContext already does this, but this ensures fresh state)
        const storedAccess = localStorage.getItem('accessToken');
        const storedRefresh = localStorage.getItem('refreshToken');
        const storedCSRF = localStorage.getItem('csrfToken');

        if (storedAccess && !accessToken) setAccessToken(storedAccess);
        if (storedRefresh && !refreshToken) setRefreshToken(storedRefresh);
        if (storedCSRF) setCSRFToken(storedCSRF);

        // If we don't have an access token but do have a refresh token/cookie, refresh
        if (!storedAccess && (storedRefresh || refreshToken)) {
          const res = await refresh();
          if (!res || !res.accessToken) {
            await logout();
            return;
          }
        }

        // Confirm identity
        const { data } = await axiosPrivate.get('auth/me');
        if (mounted) setUser(data);
      } catch (err) {
        // Any failure here should leave us logged out cleanly
        await logout();
      } finally {
        if (mounted) setLoading(false);
      }
    }

    bootstrap();
    return () => {
      mounted = false;
    };
    // Intentionally empty deps: run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? 'Loading...' : <Outlet />;
}
