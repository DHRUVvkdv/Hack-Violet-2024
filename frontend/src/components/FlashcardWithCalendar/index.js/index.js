// components/FlashcardWithCalendar/index.js
import React, { useState } from 'react'
import { CalendarComponent } from '@syncfusion/ej2-react-calendars'
import './index.scss'

const FlashcardWithCalendar = ({ question, onAnswerSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleDateChange = (e) => {
    setSelectedDate(e.value)
    onAnswerSelect(e.value) // Notify the parent component about the answer selection
  }

  const handleRevealAnswer = () => {
    setShowAnswer(true)
  }

  return (
    <div
      className={`flashcard-with-calendar ${showAnswer ? 'show-answer' : ''}`}
    >
      <div className="card-content">
        <div className={`question ${showAnswer ? 'hidden' : ''}`}>
          <p>{question}</p>
          <div className="calendar-container">
            <CalendarComponent onChange={handleDateChange} />
          </div>
        </div>
        <div className={`answer ${showAnswer ? '' : 'hidden'}`}>
          {selectedDate ? (
            <p>Selected Answer: {selectedDate.toString()}</p>
          ) : (
            <p>No date selected</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FlashcardWithCalendar
