import React from 'react';
import './index.scss'; // Import the corresponding CSS file

const FoodFlashcard = ({ imageSrc, title, description, isImageOnLeft, backgroundColor }) => {
  const cardStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <div className={`exercise-flashcard ${isImageOnLeft ? 'left' : 'right'}`} style={cardStyle}>
      {isImageOnLeft && (
        <img src={imageSrc} alt="Exercise" className="flashcard-image" />
      )}
      <div className="flashcard-content">
        <h3 className="flashcard-title">{title}</h3>
        <p className="flashcard-description">{description}</p>
      </div>
      {!isImageOnLeft && (
        <img src={imageSrc} alt="Exercise" className="flashcard-image" />
      )}
    </div>
  );
};

export default FoodFlashcard;
