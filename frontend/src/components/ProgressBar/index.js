// components/ProgressBar/ProgressBar.js
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar">
      <div className="background-bar"></div>
      <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
    </div>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default ProgressBar;
