// Originally forked - modified with help from AI to use only cookies.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);
  return { user, setUser };
}
