// components/Flashcard/index.js
import React, { useState } from 'react';
import './index.scss';

const Flashcard = ({ question, answerType, answers, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    onAnswerSelect(index); // Notify the parent component about the answer selection
  };

  const handleRevealAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <div className={`flashcard ${showAnswer ? 'show-answer' : ''}`}>
      <div className="card-content">
        <div className={`question ${showAnswer ? 'hidden' : ''}`}>
          <p>{question}</p>
          {answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`answer-choice ${selectedAnswer === index ? 'selected' : ''}`}
            >
              {answer}
            </button>
          ))}
        </div>
        <div className={`answer ${showAnswer ? '' : 'hidden'}`}>
          Selected Answer: {answers[selectedAnswer]}
        </div>
      </div>
      {!showAnswer && (
        <button className="reveal-answer-btn" onClick={handleRevealAnswer}>
          Reveal Answer
        </button>
      )}
    </div>
  );
};

export default Flashcard;