// src/components/ExerciseFlashcard.js

import React, { useState } from 'react';
import HealthPopup from '../HealthPopup'; // Import the new ExercisePopup component
import './index.scss';

const MAX_DESCRIPTION_LENGTH = 50; // Set the maximum number of characters for the truncated description

const ExerciseFlashcard = ({ imageSrc, title, description, isImageOnLeft, backgroundColor, expandedContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardStyle = {
    backgroundColor: backgroundColor,
  };

  const handleCardClick = () => {
    setIsExpanded(true);
  };

  const handleClosePopup = () => {
    setIsExpanded(false);
  };

  const truncatedDescription = (description ?? '').length > MAX_DESCRIPTION_LENGTH
  ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
  : description;


  return (
    <>
      <div
        className={`exercise-flashcard ${isImageOnLeft ? 'left' : 'right'} ${isExpanded ? 'expanded' : ''}`}
        style={cardStyle}
        onClick={handleCardClick}
      >
        {isImageOnLeft && (
          <img src={imageSrc} alt="Exercise" className="flashcard-image" />
        )}
        <div className="flashcard-content">
          <h3 className="flashcard-title">{title}</h3>
          <p className="flashcard-description">
            {isExpanded ? description : truncatedDescription}
          </p>
        </div>
        {!isImageOnLeft && (
          <img src={imageSrc} alt="Exercise" className="flashcard-image" />
        )}
      </div>
      {isExpanded && (
        <HealthPopup
          onClose={handleClosePopup}
          title={title}
          description={description}
          expandedContent={expandedContent}
        />
      )}
    </>
  );
};

export default ExerciseFlashcard;
