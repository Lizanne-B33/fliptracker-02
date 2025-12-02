// Originally forked - modified with help from AI to use only cookies.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import { axiosInstance } from '../api/apiConfig';
import { useAuth } from '../context/AuthContext';

export default function useRefreshToken() {
  const { setAccessToken } = useAuth();
  let refreshPromise = null;

  const refresh = async () => {
    if (!refreshPromise) {
      refreshPromise = axiosInstance
        .post('auth/refresh/', {}, { withCredentials: true })
        .then((res) => {
          const newAccess = res.data.access;
          setAccessToken(newAccess);
          return newAccess;
        })
        .finally(() => {
          refreshPromise = null; // reset after done
        });
    }
    return refreshPromise;
  };

  return refresh;
}
