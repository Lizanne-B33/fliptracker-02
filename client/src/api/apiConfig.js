// FlipTrackr API config — JWT-only, no cookies
// Sources: sinansarikaya/django-react-auth (fork), simplified for JWT headers

import axios from 'axios';

// Use environment variable for baseURL so dev/prod can differ
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
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
          // IMPORTANT: use axiosInstance with baseURL, not bare axios
          const res = await axiosInstance.post('/api/token/refresh/', {
            refresh: refreshToken,
          });
          localStorage.setItem('accessToken', res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          alert(
            'You’ve been logged out due to inactivity. Please log in again.'
          );
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      } else {
        alert('Your session has expired. Please log in again.');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
