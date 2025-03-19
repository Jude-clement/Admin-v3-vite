import React, { useEffect, useState } from 'react';
import api from '../api'; // Import the Axios instance

const Dashboard = () => {
  const [profile, setProfile] = useState(null); // State for profile data
  const [roles, setRoles] = useState([]); // State for roles
  const [permissions, setPermissions] = useState([]); // State for permissions
  const [error, setError] = useState(''); // State for error handling

  // Fetch profile data from the backend
  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      if (response.data.success) {
        setProfile(response.data.user); // Set the user profile data
        setRoles(response.data.roles); // Set the roles
        setPermissions(response.data.permissions); // Set the permissions
      }
    } catch (err) {
      setError('Failed to fetch profile. Please try again.');
      console.error('Failed to fetch profile', err);
    }
  };

  // Fetch profile data when the component mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '20px',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
         backgroundColor: 'white'
      }}
    >
      {/* Display error if any */}
      {error && (
        <div style={{ color: '#721c24', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '4px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {/* Display Profile Information */}
      {profile && (
        <div style={{ textAlign: 'left' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '36px', color: '#333' }}>Hello {profile.username}!</h3>
          <p style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#555' }}>
            <strong>Email : </strong> {profile.email}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;