/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const ProtectRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectRoutes;
//prop validation
import PropTypes from 'prop-types';
ProtectRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};