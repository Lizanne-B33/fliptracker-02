// Originally forked - modified with help from AI to use JWT only.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import { axiosInstance } from '../api/apiConfig';
import useAuth from './useAuth';

export default function useRefreshToken() {
  const { setAccessToken } = useAuth();
  let refreshPromise = null;

  const refresh = async () => {
    if (!refreshPromise) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token available');

      refreshPromise = axiosInstance
        .post('/api/token/refresh/', { refresh: refreshToken })
        .then((res) => {
          const newAccess = res.data.access;
          setAccessToken(newAccess);
          localStorage.setItem('accessToken', newAccess);
          return newAccess; // <-- critical
        })
        .finally(() => {
          refreshPromise = null; // reset after done
        });
    }
    return refreshPromise;
  };

  return refresh;
}
