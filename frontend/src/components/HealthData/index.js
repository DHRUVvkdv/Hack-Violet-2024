// src/pages/MenstrualCyclePage/index.js

import React, { useState } from 'react'
import './index.scss'

import ExerciseFlashcard from '../exerciseFlashcard'
import FoodFlashcard from '../foodFlashcarc'

import Weightlift from './weightlift.jpeg'
import Running from './run.jpeg'
import YogaImage from './yoga.jpeg' // Import the image

import FoodImage from './food.jpeg'
import Vegan from './vegan.jpeg'
import Meat from './meat.jpeg'

import TopNav from '../navbar/TopNav'

const MenstrualCyclePage = () => {
  const phases = ['Menstruation', 'Follicular', 'Ovulation', 'Luteal']
  const [selectedPhase, setSelectedPhase] = useState(null)

  const exerciseData = {
    Menstration: 'Information about exercise during menstrual phase...',
    Follicular: 'Information about exercise during follicular phase...',
    Ovulation: 'Information about exercise during ovulation phase...',
    Luteal: 'Information about exercise during luteal phase...',
  }

  const foodData = {
    Veg: 'Information about vegetarian food...',
    Vegan: 'Information about vegan food...',
    NonVegetarian: 'Information about non-vegetarian food...',
  }

  const generalFoodData = {
    Menstration:
      'Increase your intake of iron rich foods and vitamin C. Drink soothing tea, to combat cramps. Avoid or limit fatty foods, alcohol, caffeine, and salty foods.',
    Follicular: '',
    Ovulation: '',
    Luteal: '',
  }

  const mealFoodData = {
    Menstration:
      'Grilled Salmon, Kale and sweet potato salad, Spicy sprouts, Broccoli and feta pasta salad',
    Follicular: '',
    Ovulation: '',
    Luteal: '',
  }

  const veganFoodData = {
    Menstration:
      'Chickpea and spinach curry, Sundried tomatoes and kidney bean chilli, Tofu tacos, Oatmeal cookies, Buddha bowl',
    Follicular: '',
    Ovulation: '',
    Luteal: '',
  }

  const handlePhaseClick = (phase) => {
    setSelectedPhase(phase)
  }

  return (
    <div className="menstrual-cycle-page">
      <TopNav />
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
        <h2 className="exercise-food">Exercise</h2>
        <ExerciseFlashcard
          imageSrc={Weightlift}
          title="Weightlifting"
          description="Yoga focuses on flexibility, balance, and relaxation. It's beneficial for both body and mind."
          isImageOnLeft={true}
          backgroundColor="#fcf5f1"
        />
        <ExerciseFlashcard
          imageSrc={YogaImage}
          title="Yoga"
          description="Yoga focuses on flexibility, balance, and relaxation. It's beneficial for both body and mind."
          isImageOnLeft={false}
          backgroundColor="#f5dada"
        />
        <ExerciseFlashcard
          imageSrc={Running}
          title="Aerobic Exercise"
          description="Yoga focuses on flexibility, balance, and relaxation. It's beneficial for both body and mind."
          isImageOnLeft={true}
          backgroundColor="#fcf5f1"
        />
      </div>
      <div className="right-element">
        <h2 exercise-food>Food</h2>
        <p>{foodData[selectedPhase]}</p>
        <FoodFlashcard
          imageSrc={FoodImage}
          title="General Tips"
          description={generalFoodData[selectedPhase]}
          isImageOnLeft={true}
          backgroundColor="#f5dada"
        />
        <FoodFlashcard
          imageSrc={Meat}
          title="Meal Ideas"
          description={mealFoodData[selectedPhase]}
          isImageOnLeft={false}
          backgroundColor="#fcf5f1"
        />
        <FoodFlashcard
          imageSrc={Vegan}
          title="Vegan Suggestions"
          description={veganFoodData[selectedPhase]}
          isImageOnLeft={true}
          backgroundColor="#f5dada"
        />
      </div>
    </div>
  )
}

export default MenstrualCyclePage
