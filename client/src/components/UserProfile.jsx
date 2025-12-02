// While not originally part of the fork, this code was added to act
// as a canary to assure that the authentication is working.
// As I was struggling with this, the framework seemed fragile and I
// couldn't tell quickly if something I had done had broken it.
// Sources: ChatGPT and COPilot.

// ===================================================================

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { axiosInstance } from '../api/apiConfig';

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(!user);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/api/user/me/');
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.response?.data?.detail || 'Unable to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, setUser]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!user) return <p>Welcome, Guest!</p>;

  return (
    <div>
      <h2>
        Welcome, {user.first_name} {user.last_name}
      </h2>
      <p>Email: {user.email}</p>
      <p>User ID: {user.id}</p>
    </div>
  );
};

export default UserProfile;
