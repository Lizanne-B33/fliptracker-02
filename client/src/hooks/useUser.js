// Originally forked - modified with help from AI to use only cookies.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import { useCallback } from 'react';
import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

export default function useUser() {
  const { user, setUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const fetchUser = useCallback(async () => {
    if (user) return user; // already cached
    try {
      const { data } = await axiosPrivate.get('/api/user/me/');
      setUser(data);
      return data;
    } catch (err) {
      console.error('Error fetching user:', err.response || err);
      setUser(null); // clear context if request fails
      return null;
    }
  }, [user, setUser, axiosPrivate]);

  return { user, fetchUser };
}
