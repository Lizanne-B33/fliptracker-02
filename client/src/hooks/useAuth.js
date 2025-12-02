import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/AuthContext';

export default function useAuth() {
  const ctx = useContext(AuthContext);
  useDebugValue(ctx, (c) =>
    c?.user && Object.keys(c.user).length ? 'Logged In' : 'Logged Out'
  );
  return ctx;
}
