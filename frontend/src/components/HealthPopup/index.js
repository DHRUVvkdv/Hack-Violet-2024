// src/components/ExercisePopup.js

import React from 'react';
import './index.scss'; // Create a new CSS file for styling the popup

const HealthPopup = ({ onClose, title, description, expandedContent }) => {
  const handleOverlayClick = (e) => {
    // Check if the click occurred outside the popup content
    if (e.target.classList.contains('health-popup-overlay')) {
      onClose();
    }
  };

  return (
    <div className="health-popup-overlay" onClick={handleOverlayClick}>
      <div className="health-popup">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h3 className="popup-title">{title}</h3>
        <p className="popup-description">{description}</p>
        {expandedContent && <div className="expanded-content">{expandedContent}</div>}
      </div>
    </div>
  );
};

export default HealthPopup;