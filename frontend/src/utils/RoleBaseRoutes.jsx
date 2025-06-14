/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    if (roles.includes(user.role)) {
      return children;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  }

  return <Navigate to="/login" />;
};

RoleBaseRoutes.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired
};

export default RoleBaseRoutes;
