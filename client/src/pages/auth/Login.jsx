// Originally forked - modified with help from AI to use only cookies.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { setAccessToken, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation = location?.state?.from?.pathname || '/';
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function onSubmitForm(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        'auth/login/',
        { email, password },
        { withCredentials: true } // crucial for cookie auth
      );

      // Save token to context
      setAccessToken(response.data.access);
      setIsLoggedIn(true);
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('isLoggedIn', true);

      // Reset form
      setEmail('');
      setPassword('');

      navigate(fromLocation, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-2"
          required
        />
        <button className="btn btn-success" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
