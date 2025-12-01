import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

// Public instance: for login, register, refresh
export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Automatically append trailing slash if missing
axiosInstance.interceptors.request.use((config) => {
  if (!config.url.endsWith('/')) {
    config.url += '/';
  }
  return config;
});

// Private instance: for authenticated requests
export const axiosPrivateInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Append trailing slash
axiosPrivateInstance.interceptors.request.use((config) => {
  if (!config.url.endsWith('/')) {
    config.url += '/';
  }
  return config;
});
