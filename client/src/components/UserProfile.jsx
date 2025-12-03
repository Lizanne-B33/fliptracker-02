import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api/apiConfig';
import useAuth from '../hooks/useAuth';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();

  let message = null;

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUser = async () => {
        try {
          const res = await axiosInstance.get('/api/user/me/');
          setUser(res.data);
        } catch (err) {
          console.error('Error fetching user:', err);
          setError(err.response?.data || 'Request failed');
        }
      };

      fetchUser();
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    if (error) {
      message = <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>;
    } else if (!user) {
      message = <p>Loading user...</p>;
    } else {
      message = (
        <div>
          <h2>Welcome, {user.first_name}</h2>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
        </div>
      );
    }
  } else {
    message = (
      <div>
        <h2>Welcome, Guest</h2>
      </div>
    );
  }

  return message;
};

export default UserProfile;
