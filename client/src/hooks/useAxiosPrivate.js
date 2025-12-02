// Originally forked - modified with help from AI to use JWT‑only.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import { useEffect } from 'react';
import { axiosInstance } from '../api/apiConfig';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

export default function useAxiosPrivate() {
  const { accessToken, setAccessToken, setUser } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    // Request interceptor: attach current access token
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken && !config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor: handle 401 by refreshing
    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?._retry) {
          prevRequest._retry = true;
          try {
            const newAccessToken = await refresh();
            setAccessToken(newAccessToken);
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(prevRequest);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            setUser(null);
            setAccessToken(null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh, setAccessToken, setUser]);

  return axiosInstance;
}
