// components/Questionnaire/index.js
import React, { useState } from 'react';
import Flashcard from '../Flashcard';
import FlashcardWithCalendar from '../FlashcardWithCalendar/index.js';
import ProgressBar from '../ProgressBar'; // Import the ProgressBar component
import './index.scss';

const Questionnaire = () => {
  const flashcardsData = [
    {
      question: "What is React?",
      answerType: 'buttons',
      answers: ["A JavaScript library", "A styling framework", "A database management system"]
    },
    {
      question: "What is your favorite programming language?",
      answerType: 'buttons',
      answers: ["JavaScript", "Python", "Java", "C++"]
    },
    {
      question: "When was React invented?",
      answerType: 'calendar',
    },
    // Add more flashcards as needed
  ];

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(flashcardsData.length).fill(null));

  const handleNextButtonClick = () => {
    setCurrentFlashcardIndex((prevIndex) => prevIndex + 1);
  };

  const handleBackButtonClick = () => {
    setCurrentFlashcardIndex((prevIndex) => prevIndex - 1);
  };

  const handleAnswerSelect = (selectedAnswer) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedAnswers = [...prevSelectedAnswers];
      updatedAnswers[currentFlashcardIndex] = selectedAnswer;
      return updatedAnswers;
    });
  };

  const isLastPage = currentFlashcardIndex === flashcardsData.length - 1;

  const handleSubmitButtonClick = () => {
    // Log the selected answers to the console
    console.log(selectedAnswers);
  };

  return (
    <div className="questionnaire">
      <h1>Flashcard Questionnaire</h1>

      <ProgressBar totalSteps={flashcardsData.length} currentStep={currentFlashcardIndex + 1} />

      <div className="flashcard-container">
        {currentFlashcardIndex > 0 && (
          <button onClick={handleBackButtonClick}>Back</button>
        )}

        {/* Render the appropriate flashcard based on the answer type */}
        {currentFlashcardIndex < flashcardsData.length && (
          flashcardsData[currentFlashcardIndex].answerType === 'calendar' ? (
            <FlashcardWithCalendar
              {...flashcardsData[currentFlashcardIndex]}
              onAnswerSelect={handleAnswerSelect}
            />
          ) : (
            <Flashcard
              {...flashcardsData[currentFlashcardIndex]}
              onAnswerSelect={handleAnswerSelect}
            />
          )
        )}

        {isLastPage ? (
          <button onClick={handleSubmitButtonClick}>Submit</button>
        ) : (
          <button onClick={handleNextButtonClick}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
