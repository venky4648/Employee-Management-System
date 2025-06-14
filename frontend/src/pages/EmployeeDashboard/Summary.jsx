/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const SummaryCard = ({ iconClass }) => {
  const { user } = useAuth();

  return (
    <>
      <style>{`
        .summary-card {
          display: flex;
          align-items: center;
          background-color: #f5f5f5;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin: 15px;
          
          
          
        }

        .summary-icon {
          font-size: 2.5rem;
          margin-right: 20px;
          color: #4a90e2;
        }

        .summary-content h3 {
          margin: 0;
          font-size: 1.2rem;
          color: #333;
        }

        .summary-content p {
          margin: 5px 0 0;
          font-size: 1.5rem;
          font-weight: bold;
          color: #555;
        }
      `}</style>

      <div className="summary-card">
        <div className={`summary-icon ${iconClass}`}>{<FaUser />}</div>
        <div className="summary-content">
          <h3>Welcome Back</h3>
          <p>{user.name}</p>
        </div>
      </div>
    </>
  );
};

SummaryCard.propTypes = {
  iconClass: PropTypes.string.isRequired
};

export default SummaryCard;
