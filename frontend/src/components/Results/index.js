import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircleDot from '../CircleDot'; // Adjust the import path based on your project structure
import './index.scss';

let outline_day;

const ResultsPage = () => {
  const [selectedDot, setSelectedDot] = useState(null);
  const [phase, setPhase] = useState("Outbreak");
  const [date_range, setDateRange] = useState("");

  const numOfDots = 28;
  const radius = 330; // Adjust the radius as needed
  const centerX = 0; // Adjust the center X-coordinate as needed
  const centerY = 0; // Adjust the center Y-coordinate as needed

  useEffect(() => {
    // This effect will run after the initial render and every time 'selectedDot' changes
    if (selectedDot !== null) {
      // Update the phase and date_range based on the selected dot
      setPhase(calculatePhase(selectedDot));
      setDateRange(calculateDateRange(selectedDot));
    }
  }, [selectedDot]);

  const calculateDotPosition = (index) => {
    const angle = (index / numOfDots) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  };

  const getDotColor = (index) => {
    if (index >= 0 && index < 5) {
      return '#a06868';
    } else if (index >= 5 && index < 12) {
      return '#d4abb3';
    } else if (index >= 12 && index < 21) {
      return '#decbc4';
    } else {
      return '#b4876b';
    }
  };

  const calculatePhase = (index) => {
    if (index >= 0 && index < 5) {
      return "Luteal";
    } else if (index >= 5 && index < 12) {
      return "Ovulation";
    } else if (index >= 12 && index < 21) {
      return "Follicular";
    } else {
      return "Menopausal";
    }
  };

  const calculateDateRange = (index) => {
    const day = (index + 7) % 28 + 1;

    if (day >= 1 && day <= 7) {
      return "1st to 4th Feb 2023";
    } else if (day >= 8 && day <= 12) {
      return "5th to 11th Feb 2023";
    } else if (day >= 13 && day <= 19) {
      return "12th to 20th Feb 2023";
    } else {
      return "21st to 28th Feb 2023";
    }
  };

  const handleDotClick = (index) => {
    setSelectedDot(index);
  };

  return (
    <div className="results-container">
      <div className="circle-dot-container">
        {Array.from({ length: numOfDots }, (_, index) => {
          const position = calculateDotPosition(index);
          const color = getDotColor(index);
          const showOutline = index === outline_day;
          return (
            <CircleDot
              key={index}
              x={position.x}
              y={position.y}
              onClick={() => handleDotClick(index)}
              isSelected={selectedDot === index}
              color={color}
              number={(index + 7) % 28 + 1}
              showOutline={showOutline}
            />
          );
        })}
      </div>
      {selectedDot !== null && (
        <div className="selected-dot-info">
          <h1>Day {(selectedDot + 7) % 28 + 1}</h1>
          <h3>{phase}</h3>
          <h4>{date_range}</h4>
          <p>The virus has begun to quickly spread..</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
