// Originally forked - modified with help from AI to use only cookies.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: true, // ensures cookies are sent
});

export const axiosPrivateInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: true, // ensures cookies are sent
});
