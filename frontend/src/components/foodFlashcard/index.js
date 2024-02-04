// src/components/FoodFlashcard.js

import React, { useState } from 'react';
import HealthPopup from '../HealthPopup';
import './index.scss'; // Import the corresponding CSS file

const FoodFlashcard = ({ imageSrc, title, description, isImageOnLeft, backgroundColor, expandedContent }) => {
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

  return (
    <>
      <div
        className={`food-flashcard ${isImageOnLeft ? 'left' : 'right'} ${isExpanded ? 'expanded' : ''}`}
        style={cardStyle}
        onClick={handleCardClick}
      >
        {isImageOnLeft && (
          <img src={imageSrc} alt="Food" className="flashcard-image" />
        )}
        <div className="flashcard-content">
          <h3 className="flashcard-title">{title}</h3>
          {isExpanded ? (
            <p className="flashcard-description">{description}</p>
          ) : (
            <p className="flashcard-description">
              {description && description.length > 100 ? `${description.slice(0, 100)}...` : description}
            </p>
          )}
        </div>
        {!isImageOnLeft && (
          <img src={imageSrc} alt="Food" className="flashcard-image" />
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

export default FoodFlashcard;
