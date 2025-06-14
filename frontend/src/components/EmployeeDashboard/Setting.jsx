// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Setting.css';
const Setting = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    userId: user?._id || '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (settings.newPassword !== settings.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:3000/api/setting/change-password',
        settings,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess('Password changed successfully!');
        setError('');
        setSettings({
          userId: user._id,
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(response.data.message || 'Failed to change password');
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'An error occurred while changing password'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="setting-form-container">
  <h2>Change Password</h2>

  {error && <div className="error-message">{error}</div>}
  {success && <div className="success-message">{success}</div>}

  <div>
    <label>Old Password</label>
    <input
      type="password"
      name="oldPassword"
      required
      placeholder="Enter old password"
      value={settings.oldPassword}
      onChange={handleChange}
    />
  </div>

  <div>
    <label>New Password</label>
    <input
      type="password"
      name="newPassword"
      required
      placeholder="Enter new password"
      value={settings.newPassword}
      onChange={handleChange}
    />
  </div>

  <div>
    <label>Confirm Password</label>
    <input
      type="password"
      name="confirmPassword"
      required
      placeholder="Confirm new password"
      value={settings.confirmPassword}
      onChange={handleChange}
    />
  </div>

  <button type="submit" className="submit-btn">Change Password</button>
</form>

  );
};

export default Setting;
