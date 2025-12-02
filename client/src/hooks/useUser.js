// Originally forked - modified with help from AI to use only cookies.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import { useCallback } from 'react';
import useAuth from './useAuth';
import usePrivate from './usePrivate';

export default function useUser() {
  const { user, setUser } = useAuth();
  const axiosPrivate = usePrivate();

  const fetchUser = useCallback(async () => {
    if (user) return user; // already have it
    try {
      const { data } = await axiosPrivate.get('auth/me/');
      setUser(data);
      return data;
    } catch (err) {
      console.error(err.response || err);
      return null;
    }
  }, [user, setUser, axiosPrivate]);

  return { user, fetchUser };
}
