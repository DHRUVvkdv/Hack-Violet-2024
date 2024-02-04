// components/Questionnaire/index.js
import React, { useState } from 'react';
import Flashcard from '../Flashcard';
import FlashcardWithCalendar from '../FlashcardWithCalendar/index.js';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import ProgressBar from '../ProgressBar'; // Import the ProgressBar component
import './index.scss';

const Questionnaire = () => {
  const navigate = useNavigate();
  
  const flashcardsData = [
    {
      question: "What is React?",
      answerType: 'buttons',
      answers: ["A library", "A framework", "A dbms"]
    },
    {
      question: "How long did your period last?",
      answerType: 'buttons',
      answers: ["1-2 days", "3-4 days", "5-7 days", "7+ days"]
    },
    {
      question: "When was your last period?",
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

  const isLastPage = currentFlashcardIndex === flashcardsData.length - 1;


  const handleAnswerSelect = (selectedAnswer) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedAnswers = [...prevSelectedAnswers];
      updatedAnswers[currentFlashcardIndex] = selectedAnswer;
      return updatedAnswers;
    });

    if (!isLastPage) {
      handleNextButtonClick();
    }

  };

  const handleSubmitButtonClick = () => {
    // Log the selected answers to the console
    console.log(selectedAnswers);

    navigate('/results');
  };

  return (
    <div className="questionnaire">
      <h1>Flashcard Questionnaire</h1>

      <ProgressBar totalSteps={flashcardsData.length} currentStep={currentFlashcardIndex + 1} />

      <div className="flashcard-container">
        

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

        {currentFlashcardIndex > 0 && (
          <button className="back btn" onClick={handleBackButtonClick}>Back</button>
        )}

        {isLastPage ? (
          <button className="submit btn" onClick={handleSubmitButtonClick}>Submit</button>
        ):
        null}
      </div>
    </div>
  );
};

export default Questionnaire;
