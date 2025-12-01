import React, { useEffect, useState } from 'react';
import { axiosPrivateInstance } from '../api/apiConfig';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosPrivateInstance.get('auth/me');
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.response?.data || 'Request failed');
      }
    };

    fetchUser();
  }, []);

  if (error)
    return <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>;
  if (!user) return <p>Loading user...</p>;

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>
      <p>User ID: {user.id}</p>
    </div>
  );
};

export default UserProfile;
