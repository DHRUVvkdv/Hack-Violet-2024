// src/pages/MenstrualCyclePage/index.js

import React, { useState } from 'react';
import './index.scss';
import ExerciseFlashcard from '../exerciseFlashcard';

import Weightlift from './weightlift.jpeg'
import Running from './run.jpeg'
import YogaImage from './yoga.jpeg'; // Import the image
import TopNav from "../navbar/TopNav"


const MenstrualCyclePage = () => {
  const phases = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];
  const [selectedPhase, setSelectedPhase] = useState(null);

  const exerciseData = {
    Menstrual: 'Information about exercise during menstrual phase...',
    Follicular: 'Information about exercise during follicular phase...',
    Ovulation: 'Information about exercise during ovulation phase...',
    Luteal: 'Information about exercise during luteal phase...',
  };

  const foodData = {
    Veg: 'Information about vegetarian food...',
    Vegan: 'Information about vegan food...',
    NonVegetarian: 'Information about non-vegetarian food...',
  };

  const handlePhaseClick = (phase) => {
    setSelectedPhase(phase);
  };

  return (
    <div className="menstrual-cycle-page">
        <TopNav/>
      <div className="left-element">
        {phases.map((phase) => (
          <button
            key={phase}
            onClick={() => handlePhaseClick(phase)}
            className={selectedPhase === phase ? 'selected' : ''}
          >
            {phase}
          </button>
        ))}
      </div>
      <div className="middle-element">
        <h2>Exercise</h2>
        <p>{exerciseData[selectedPhase]}</p>
        <ExerciseFlashcard
        imageSrc= {Weightlift}
        title="Weightlifting"
        description="Yoga focuses on flexibility, balance, and relaxation. It's beneficial for both body and mind." 
        isImageOnLeft={true}
        backgroundColor="#fcf5f1"
        />
        <ExerciseFlashcard
        imageSrc= {YogaImage}
        title="Yoga"
        description="Yoga focuses on flexibility, balance, and relaxation. It's beneficial for both body and mind." 
        isImageOnLeft={false}
        backgroundColor="#f5dada"
        />
        <ExerciseFlashcard
        imageSrc= {Running}
        title="Aerobic Exercise"
        description="Yoga focuses on flexibility, balance, and relaxation. It's beneficial for both body and mind." 
        isImageOnLeft={true}
        backgroundColor="#fcf5f1"
        />
      </div>
      <div className="right-element">
        <h2>Food</h2>
        <p>{foodData[selectedPhase]}</p>
      </div>
    </div>
  );
};

export default MenstrualCyclePage;
