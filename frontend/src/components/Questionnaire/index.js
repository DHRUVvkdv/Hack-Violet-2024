// components/Questionnaire/index.js
import React, { useState, useEffect } from 'react'
import Flashcard from '../Flashcard'
import FlashcardWithCalendar from '../FlashcardWithCalendar/index.js'
import { useNavigate } from 'react-router-dom' // Import the useNavigate hook
import ProgressBar from '../ProgressBar' // Import the ProgressBar component
import './index.scss'
import TopNav from '../navbar/TopNav.js'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

const Questionnaire = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = jwtDecode(token)
      const email = decoded.email
      setEmail(email)
      console.log(email)
    } else {
      alert('User Not Signed up!')
    }
  }, [])

  const flashcardsData = [
    {
      question: 'What is your height range?',
      answerType: 'buttons',
      answers: [
        'Below 5 feet',
        '5 feet to 5 feet 5 inches',
        '5 feet 6 inches to 6 feet',
        'Above 6 feet',
      ],
    },
    {
      question: 'What is your weight range?',
      answerType: 'buttons',
      answers: [
        'Below 100 lbs',
        '100 lbs to 150 lbs',
        '151 lbs to 200 lbs',
        'Above 200 lbs',
      ],
    },
    {
      question: 'Do you experience cramps or uneasiness during your period?',
      answerType: 'buttons',
      answers: ['Yes, regularly', 'Occasionally', 'No, rarely', 'No, never'],
    },
    // {
    //   question: 'What is your favorite type of outdoor activity?',
    //   answerType: 'text', // Use 'text' for a freeform text response
    //   placeholder: 'Enter your favorite outdoor activity',
    // },
    {
      question: 'How long did your last period last?',
      answerType: 'buttons',
      answers: ['1-2 days', '3-4 days', '5-7 days', '7+ days'],
    },
    {
      question: 'When was your last period?',
      answerType: 'calendar',
    },
    // Will Add more flashcards as needed
  ]

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(flashcardsData.length).fill(null)
  )

  const handleNextButtonClick = () => {
    setCurrentFlashcardIndex((prevIndex) => prevIndex + 1)
  }

  const handleBackButtonClick = () => {
    setCurrentFlashcardIndex((prevIndex) => prevIndex - 1)
  }

  const isLastPage = currentFlashcardIndex === flashcardsData.length - 1

  const handleAnswerSelect = (selectedAnswer) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedAnswers = [...prevSelectedAnswers]
      updatedAnswers[currentFlashcardIndex] = selectedAnswer
      return updatedAnswers
    })

    if (!isLastPage) {
      handleNextButtonClick()
    }
  }

  function customFunction(input) {
    switch (input) {
      case 0:
        return 1
      case 1:
        return 3
      case 2:
        return 5
      case 3:
        return 7
      default:
        return 'Invalid input' // Handle other cases if needed
    }
  }

  const handleSubmitButtonClick = async () => {
    // Log the selected answers to the console
    console.log(selectedAnswers)
    try {
      console.log(`EMAIL FROM TRACK ${email}`)
      // Define the data to send
      const data = {
        email: email, // use the email from the state
        startDate: new Date(selectedAnswers[2]), // use the start date from the state
        duration: customFunction(selectedAnswers[1]), // use the duration from the state
      }

      // Make the axios request
      const response = await axios.post(
        'http://localhost:8000/api/data/periodCycle',
        data
      )

      // Log the response
      console.log(response.data)
    } catch (error) {
      console.error('Error:', error)
    }

    navigate('/results')
  }

  return (
    <div className="questionnaire">
      <TopNav />
      <h1>Flashcard Questionnaire</h1>

      <ProgressBar
        totalSteps={flashcardsData.length}
        currentStep={currentFlashcardIndex + 1}
      />

      <div className="flashcard-container">
        {/* Render the appropriate flashcard based on the answer type */}
        {currentFlashcardIndex < flashcardsData.length &&
          (flashcardsData[currentFlashcardIndex].answerType === 'calendar' ? (
            <FlashcardWithCalendar
              {...flashcardsData[currentFlashcardIndex]}
              onAnswerSelect={handleAnswerSelect}
            />
          ) : (
            <Flashcard
              {...flashcardsData[currentFlashcardIndex]}
              onAnswerSelect={handleAnswerSelect}
            />
          ))}

        {currentFlashcardIndex > 0 && (
          <button className="back btn" onClick={handleBackButtonClick}>
            Back
          </button>
        )}

        {isLastPage ? (
          <button className="submit btn" onClick={handleSubmitButtonClick}>
            Submit
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Questionnaire
