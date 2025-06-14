/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './SummaryCard.css';

const SummaryCard = ({ icon, text, number, iconClass }) => {
  return (
    <div className="summary-card">
      <div className={`summary-icon ${iconClass}`}>{icon}</div>
      <div className="summary-content">
        <h3>{text}</h3>
        <p>{number}</p>
      </div>
    </div>
  );
};

SummaryCard.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  iconClass: PropTypes.string.isRequired,
};

export default SummaryCard;
