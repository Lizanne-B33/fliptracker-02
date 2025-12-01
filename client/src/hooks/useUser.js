import { useCallback } from 'react';
import useAuth from './useAuth';
import useAxiosPrivate from './usePrivate';

export default function useUser() {
  const { isLoggedIn, setUser } = useAuth();
  const axiosPrivateInstance = useAxiosPrivate();

  const getUser = useCallback(async () => {
    if (!isLoggedIn) return;

    try {
      const { data } = await axiosPrivateInstance.get('auth/me');
      setUser(data);
    } catch (error) {
      console.log(error.response);
    }
  }, [isLoggedIn, axiosPrivateInstance, setUser]);

  return getUser;
}
