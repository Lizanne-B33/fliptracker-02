import useAuth from './useAuth';
import { axiosPrivateInstance } from '../api/apiConfig'; // <-- fixed import

export default function useLogout() {
  const {
    setAccessToken,
    setRefreshToken,
    setCSRFToken,
    setUser,
    setIsLoggedIn,
  } = useAuth();

  const logout = async () => {
    try {
      await axiosPrivateInstance.post('auth/logout/');
    } catch (error) {
      // Ignore 401 Unauthorized — user is already logged out
      if (error?.response?.status !== 401) {
        console.error('Logout error:', error);
      }
    } finally {
      // Always clear frontend state
      setAccessToken(null);
      setRefreshToken(null);
      setCSRFToken(null);
      setUser({});
      setIsLoggedIn(false);

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('csrfToken');
      localStorage.setItem('isLoggedIn', JSON.stringify(false));
    }
  };

  return logout;
}
