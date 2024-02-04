import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CalendarComponent } from '@syncfusion/ej2-react-calendars'
import './index.scss'
import { jwtDecode } from 'jwt-decode'

const FlashcardWithCalendar = ({ question }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [backendResult, setBackendResult] = useState(null)

  useEffect(() => {
    if (selectedDate) {
      axios
        .post('http://localhost:8000/api/phases', {
          date: selectedDate.toISOString(),
          integer: 7, // replace with the desired integer
        })
        .then((response) => {
          setBackendResult(response.data.result)
          console.log(response.data.result)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }, [selectedDate])

  const handleDateChange = (e) => {
    setSelectedDate(e.value)
  }

  const handleRevealAnswer = () => {
    setShowAnswer(true)
    const token = localStorage.getItem('token')

    // Decode the JWT
    const decoded = jwtDecode(token)

    // Extract the email
    const email = decoded.email

    // Print the email
    console.log(email)
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
          {backendResult ? (
            // <p>Backend Result: {backendResult.join(', ')}</p>
            <p>Selected Answer: {selectedDate.toString()}</p>
          ) : (
            <p>No date selected</p>
          )}
        </div>
      </div>
      {!showAnswer && (
        <button className="reveal-answer-btn" onClick={handleRevealAnswer}>
          Reveal Answer
        </button>
      )}
    </div>
  )
}

export default FlashcardWithCalendar

// // components/FlashcardWithCalendar/index.js
// import React, { useState } from 'react'
// import { CalendarComponent } from '@syncfusion/ej2-react-calendars'
// import './index.scss'

// const FlashcardWithCalendar = ({ question, onAnswerSelect }) => {
//   const [selectedDate, setSelectedDate] = useState(null)
//   const [showAnswer, setShowAnswer] = useState(false)

//   const handleDateChange = (e) => {
//     setSelectedDate(e.value)
//     onAnswerSelect(e.value) // Notify the parent component about the answer selection
//   }

//   const handleRevealAnswer = () => {
//     setShowAnswer(true)
//   }

//   return (
//     <div
//       className={`flashcard-with-calendar ${showAnswer ? 'show-answer' : ''}`}
//     >
//       <div className="card-content">
//         <div className={`question ${showAnswer ? 'hidden' : ''}`}>
//           <p>{question}</p>
//           <div className="calendar-container">
//             <CalendarComponent onChange={handleDateChange} />
//           </div>
//         </div>
//         <div className={`answer ${showAnswer ? '' : 'hidden'}`}>
//           {selectedDate ? (
//             <p>Selected Answer: {selectedDate.toString()}</p>
//           ) : (
//             <p>No date selected</p>
//           )}
//         </div>
//       </div>
//       {!showAnswer && (
//         <button className="reveal-answer-btn" onClick={handleRevealAnswer}>
//           Reveal Answer
//         </button>
//       )}
//     </div>
//   )
// }

// export default FlashcardWithCalendar
