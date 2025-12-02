// Originally forked - modified with help from AI to use JWT only.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const { setAccessToken, setUser } = useAuth();
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
      const response = await axiosInstance.post('/api/token/', {
        email,
        password,
      });
      const { access, refresh } = response.data;

      // Save tokens
      setAccessToken(access);
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // Optionally fetch user immediately
      const userRes = await axiosInstance.get('/api/user/me/', {
        headers: { Authorization: `Bearer ${access}` },
      });
      setUser(userRes.data);
      localStorage.setItem('user', JSON.stringify(userRes.data));

      // Reset form
      setEmail('');
      setPassword('');

      navigate(fromLocation, { replace: true });
    } catch (err) {
      console.error(err);
      const detail =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        'Login failed';
      setError(detail);
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
