// Originally forked - modified with help from AI to use only cookies.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/apiConfig';
import useAuth from './useAuth';

export default function useLogout() {
  const { setUser, setAccessToken } = useAuth();
  const navigate = useNavigate();

  return async (redirect = true) => {
    try {
      // Call your backend logout endpoint (optional if you don’t blacklist refresh tokens)
      await axiosInstance.post('/api/user/logout/');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      // Clear client-side state
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      if (redirect) navigate('/auth/login');
    }
  };
}
