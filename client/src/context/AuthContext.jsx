// Originally forked - modified with help from AI to use only cookies.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth
// 12/12 Want to assure tha the app always opens logged out.  This change
// removes localStorage, but keeps my refresh working.

// ===================================================================

import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
  isLoggedIn: false,
});

export function AuthContextProvider({ children }) {
  // Memory-only JWT, never persisted
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const isLoggedIn = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
