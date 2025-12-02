// Originally forked - modified with help from AI to use only cookies.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
