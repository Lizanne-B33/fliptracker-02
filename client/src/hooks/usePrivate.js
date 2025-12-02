// Originally forked - modified with help from AI to use only cookies.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import { axiosPrivateInstance } from '../api/apiConfig';
import useRefreshToken from './useRefreshToken';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function useAxiosPrivate() {
  const { accessToken } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?._retry) {
          prevRequest._retry = true;

          // Wait for new token
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosPrivateInstance(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () =>
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
  }, [accessToken, refresh]);

  return axiosPrivateInstance;
}
