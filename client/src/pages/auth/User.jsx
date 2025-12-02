import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';
import useUser from '../../hooks/useUser';

export default function User() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const [loading, setLoading] = useState(false);

  const { fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  async function onLogout() {
    setLoading(true);
    await logout();
    navigate('/');
  }

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="container">
      <h2>User Profile</h2>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>First Name:</strong> {user.first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {user.last_name}
      </p>
      <p>
        <strong>Staff:</strong> {user.is_staff ? 'Yes' : 'No'}
      </p>
      <button
        disabled={loading}
        type="button"
        className="btn btn-danger mt-3"
        onClick={onLogout}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
}
