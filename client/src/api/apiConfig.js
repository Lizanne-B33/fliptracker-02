import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically append trailing slash if missing
axiosInstance.interceptors.request.use((config) => {
  if (!config.url.endsWith('/')) {
    config.url = config.url + '/';
  }
  return config;
});

export const axiosPrivateInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Apply the same interceptor to private instance
axiosPrivateInstance.interceptors.request.use((config) => {
  if (!config.url.endsWith('/')) {
    config.url = config.url + '/';
  }
  return config;
});
