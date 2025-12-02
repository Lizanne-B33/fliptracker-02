import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext({
  user: {},
  setUser: () => {},
  accessToken: null,
  refreshToken: null,
  csrftoken: null,
  setAccessToken: () => {},
  setRefreshToken: () => {},
  setCSRFToken: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export function AuthContextProvider(props) {
  // Rehydrate from storage on first render
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken') || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refreshToken') || null
  );
  const [csrftoken, setCSRFToken] = useState(
    localStorage.getItem('csrfToken') || null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );

  // Keep simple flags in sync
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // Keep tokens in sync (single source of truth = storage + context)
  useEffect(() => {
    if (accessToken) localStorage.setItem('accessToken', accessToken);
    else localStorage.removeItem('accessToken');
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    else localStorage.removeItem('refreshToken');
  }, [refreshToken]);

  useEffect(() => {
    if (csrftoken) localStorage.setItem('csrfToken', csrftoken);
    else localStorage.removeItem('csrfToken');
  }, [csrftoken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        csrftoken,
        setCSRFToken,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
