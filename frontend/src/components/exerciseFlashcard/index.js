// src/components/ExerciseFlashcard.js

import React from 'react';
import './index.scss'; // Import the corresponding CSS file

const ExerciseFlashcard = ({ imageSrc, title, description }) => {
  return (
    <div className="exercise-flashcard">
      <img src={imageSrc} alt="Exercise" className="flashcard-image" />
      <div className="flashcard-content">
        <h3 className="flashcard-title">{title}</h3>
        <p className="flashcard-description">{description}</p>
      </div>
    </div>
  );
};

export default ExerciseFlashcard;
