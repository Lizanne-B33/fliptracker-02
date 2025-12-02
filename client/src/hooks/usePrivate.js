import { useEffect } from 'react';
import { axiosPrivateInstance } from '../api/apiConfig';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';
import useLogout from './useLogout';

export default function useAxiosPrivate() {
  const { accessToken, csrftoken, setAccessToken, setCSRFToken } = useAuth();
  const refresh = useRefreshToken();
  const logout = useLogout();

  useEffect(() => {
    // Attach tokens on every request
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        const token = accessToken || localStorage.getItem('accessToken');
        const csrf = csrftoken || localStorage.getItem('csrfToken');

        if (token) config.headers['Authorization'] = `Bearer ${token}`;
        if (csrf) config.headers['X-CSRFToken'] = csrf;

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Handle 401/403: try refresh once, then logout
    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          try {
            const { csrfToken: newCSRFToken, accessToken: newAccessToken } =
              await refresh();

            if (!newAccessToken) {
              await logout();
              return Promise.reject(error);
            }

            // Sync context + storage
            setAccessToken(newAccessToken);
            localStorage.setItem('accessToken', newAccessToken);

            if (newCSRFToken) {
              setCSRFToken(newCSRFToken);
              localStorage.setItem('csrfToken', newCSRFToken);
              prevRequest.headers['X-CSRFToken'] = newCSRFToken;
            }

            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosPrivateInstance(prevRequest);
          } catch (refreshError) {
            await logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, csrftoken, refresh, logout, setAccessToken, setCSRFToken]);

  return axiosPrivateInstance;
}
