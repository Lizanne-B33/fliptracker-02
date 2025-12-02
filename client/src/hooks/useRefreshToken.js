import { axiosInstance } from '../api/apiConfig';
import useAuth from './useAuth';

let refreshLock = null; // collapse duplicate calls (StrictMode-safe)

export default function useRefreshToken() {
  const { refreshToken, setAccessToken, setCSRFToken } = useAuth();

  const refresh = async () => {
    // If a refresh is already running, return same promise
    if (refreshLock) return refreshLock;

    // Gate on presence of a refresh token or server-side cookie setup
    const hasClientRefresh = !!(
      refreshToken || localStorage.getItem('refreshToken')
    );
    if (!hasClientRefresh) {
      // If your backend uses httpOnly cookie refresh, you might allow calling anyway:
      // return (refreshLock = axiosInstance.post('auth/refresh/'));
      return null;
    }

    refreshLock = axiosInstance
      .post('auth/refresh/', {
        // If your backend expects a body token, provide it; if cookie-based, omit
        token: refreshToken || localStorage.getItem('refreshToken'),
      })
      .then((response) => {
        const newAccess = response.data?.access;
        const newCSRF = response.headers?.['x-csrftoken'];

        if (newAccess) {
          setAccessToken(newAccess);
          localStorage.setItem('accessToken', newAccess);
        }
        if (newCSRF) {
          setCSRFToken(newCSRF);
          localStorage.setItem('csrfToken', newCSRF);
        }

        return { accessToken: newAccess, csrfToken: newCSRF };
      })
      .finally(() => {
        refreshLock = null;
      });

    return refreshLock;
  };

  return refresh;
}
