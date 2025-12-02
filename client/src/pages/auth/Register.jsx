// Originally forked - modified with help from AI to use JWT only.
// the dual Token/Cookies did not work and cost many hours of research
// Sources: the DUCK, ChatGPT and COPilot.
// Original Fork: https://github.com/sinansarikaya/django-react-auth

// ===================================================================

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const first_name = useRef();
  const last_name = useRef();
  const email = useRef();
  const password = useRef();
  const password2 = useRef();

  async function onSubmitForm(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      email: email.current.value,
      password: password.current.value,
      password2: password2.current.value,
    };

    try {
      await axiosInstance.post('/user/register/', data);
      event.target.reset();
      navigate('/auth/login'); // redirect to login after success
    } catch (err) {
      console.error(err);
      const detail =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        'Registration failed';
      setError(detail);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="First Name"
          ref={first_name}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          ref={last_name}
          className="form-control mb-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          ref={email}
          className="form-control mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="form-control mb-2"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          ref={password2}
          className="form-control mb-2"
          required
        />
        <button className="btn btn-success" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
