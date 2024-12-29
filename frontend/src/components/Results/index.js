import React, { useState, useEffect } from 'react'
import CircleDot from '../CircleDot'
import './index.scss'
import TopNav from '../navbar/TopNav'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom'

let outline_day

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const ResultsPage = () => {
  const [selectedDot, setSelectedDot] = useState(3)
  const [phase, setPhase] = useState('Click on a day to learn more')
  const [dateRange, setDateRange] = useState(null)
  const [email, setEmail] = useState('')
  const [periodStartDate, setPeriodStartDate] = useState(null)
  const [periodDuration, setPeriodDuration] = useState(0)

  const luteal_text =
    'Due to release of progesterone the lining of the uterus thickens in preparation for pregnancy.This is when you may experience premenstrual symptoms (PMS) like mood swings, bloating, food cravings and breast tenderness. More hormones means a decrease in anabolic, or muscle-building, capacity. This means that it’s time to take it easier, focusing on lower-intensity workouts with more recovery time.'
  const ovulation_text =
    'Ovulation is when a mature egg is released from an ovary and moves along a fallopian tube towards your uterus. Lasts from 16 - 32 hours. Estrogen and testosterone levels peak, giving you high energy.  Try exercises such as high-intensity interval workouts or a spin class. Best time for achieving muscle gain.'
  const folicular_text =
    'The pituitary gland in the brain releases a hormone to stimulate the production of follicles on the surface of an ovary. Usually, only one follicle will mature into an egg. Estrogen and progesterone are on the rise. Energy levels also increase, but you may experience low stamina. Gradually increase intensity and duration of workouts. A good diet helps support the body as it prepares to release an egg during the next phase, ovulation.'
  const menstrual_text =
    'Your uterus lining sheds and flows out of your vagina. Your Period contains blood, mucus and some cells from the lining of your uterus. During this time, your estrogen and progesterone are low, so your energy levels are low. Taking rest and focusing on low intensity exercises is important'

  let startDate = new Date(2022, 2, 1)

  const numOfDots = 28
  const radius = 330
  const centerX = 0
  const centerY = 0

  useEffect(() => {
    const fetchDataOnDotChange = async () => {
      if (selectedDot !== null) {
        setPhase(calculatePhase(selectedDot))
        setDateRange(calculateDateRange(selectedDot))
      }
      const token = localStorage.getItem('token')
      if (token) {
        const decoded = jwtDecode(token)
        const userEmail = decoded.email
        setEmail(userEmail)
        console.log(userEmail)
      } else {
        alert('User Not Signed up!')
      }
    }

    fetchDataOnDotChange()

    // Other logic based on selectedDot...
  }, [selectedDot])

  useEffect(() => {
    const fetchDataOnPageLoad = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/data/periodCycle/${email}`
        )
        console.log(response.data)
        setPeriodDuration(response.data.duration || 3)
        setPeriodStartDate(response.data.startDate)
        startDate = periodStartDate

        const current_date = new Date()
        const timeDifference = current_date - new Date(periodStartDate)
        const magic_num = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        outline_day = (21 + magic_num) % 28

        setSelectedDot(outline_day)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchDataOnPageLoad()
  }, [email]) // Updated dependency array

  const calculateDotPosition = (index) => {
    const angle = (index / numOfDots) * 2 * Math.PI
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    return { x, y }
  }

  async function getPeriodCycle(userEmail) {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/data/periodCycle/${userEmail}`
      )
      console.log(response.data)
      setPeriodDuration(response.data.duration || 3)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getDotColor = (index) => {
    let adj_index = ((index + 7) % 28) + 1
    if (adj_index >= 0 && adj_index <= periodDuration) {
      return '#a06868'
    } else if (adj_index >= periodDuration + 1 && adj_index <= 14) {
      return '#decbc4'
    } else if (adj_index >= 15 && adj_index <= 17) {
      return '#a3775b'
    } else {
      return '#d4abb3'
    }
  }

  const calculatePhase = (index) => {
    let adj_index = ((index + 7) % 28) + 1
    if (adj_index >= 0 && adj_index <= periodDuration) {
      return 'Menstrual'
    } else if (adj_index >= periodDuration + 1 && adj_index <= 14) {
      return 'Follicular'
    } else if (adj_index >= 15 && adj_index <= 17) {
      return 'Ovulation'
    } else {
      return 'Luteal'
    }
  }

  const getPhaseText = () => {
    switch (phase) {
      case 'Luteal':
        return luteal_text
      case 'Ovulation':
        return ovulation_text
      case 'Follicular':
        return folicular_text
      case 'Menstrual':
        return menstrual_text
      default:
        return menstrual_text
    }
  }

  const calculateDateRange = (index) => {
    const day = ((index + 7) % 28) + 1
    console.log('aslddnlfj: ', typeof periodStartDate)
    startDate = new Date(periodStartDate)
    if (day >= 1 && day <= 7) {
      const endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 6)
      return { startDate, endDate }
    } else if (day >= 8 && day <= 14) {
      const newStartDate = new Date(startDate)
      newStartDate.setDate(startDate.getDate() + 7)
      const endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 11)
      startDate = newStartDate
      return { startDate, endDate }
    } else if (day >= 15 && day <= 16) {
      const newStartDate = new Date(startDate)
      newStartDate.setDate(startDate.getDate() + 12)
      const endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 18)
      startDate = newStartDate
      return { startDate, endDate }
    } else {
      const newStartDate = new Date(startDate)
      newStartDate.setDate(startDate.getDate() + 19)
      const endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 27)
      startDate = newStartDate
      return { startDate, endDate }
    }
  }

  const handleDotClick = (index) => {
    setSelectedDot(index)
  }

  return (
    <div className="results-container">
      <TopNav />
      <div className="circle-dot-container">
        {Array.from({ length: numOfDots }, (_, index) => {
          const position = calculateDotPosition(index)
          const color = getDotColor(index)

          console.log('sdkjfnkjrjksndfckjs: ', typeof periodStartDate)
          const showOutline = index === outline_day
          return (
            <CircleDot
              key={index}
              x={position.x}
              y={position.y}
              onClick={() => handleDotClick(index)}
              isSelected={selectedDot === index}
              color={color}
              number={((index + 7) % 28) + 1}
              showOutline={showOutline}
            />
          )
        })}
      </div>
      {selectedDot !== null && (
        <div className="selected-dot-info">
          <h3>{phase}</h3>
          {dateRange && dateRange.startDate && dateRange.endDate && (
            <h4>
              {dateRange.startDate.toLocaleDateString()} to{' '}
              {dateRange.endDate.toLocaleDateString()}
            </h4>
          )}
          <h1>Day {((selectedDot + 7) % 28) + 1}</h1>
          <p className="main-text">{getPhaseText()}</p>
          <Link to="/healthdata">
            <button className="learn">Explore guides for each phase</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ResultsPage
