// Originally forked - modified with help from AI to use only cookies.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/apiConfig';
import useAuth from './useAuth';

export default function useLogout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return async (redirect = true) => {
    try {
      await axiosInstance.post('auth/logout/', {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setUser(null); // clear user state
      if (redirect) navigate('/auth/login');
    }
  };
}
