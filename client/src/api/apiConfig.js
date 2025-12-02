// FlipTrackr API config — JWT-only, no cookies
// Sources: sinansarikaya/django-react-auth (fork), simplified for JWT headers

import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', //
});

// Attach token automatically to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired tokens automatically
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const res = await axios.post(
            'http://localhost:8000/api/token/refresh/',
            { refresh: refreshToken }
          );

          // Save new access token
          localStorage.setItem('accessToken', res.data.access);

          // Update header and retry original request
          axiosInstance.defaults.headers.Authorization = `Bearer ${res.data.access}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed → force logout
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);
