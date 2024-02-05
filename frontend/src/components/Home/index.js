//import { Link } from 'react-router-dom'
import './index.scss'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import { Link } from 'react-router-dom'
import axios from 'axios'
import TopNav from '../navbar/TopNav'

export const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const healthArray = ['r', 'h', 'y', 't', 'h', 'm', ' ']
  const youArray = [' ', 'r', 'i', 's', 'e']
  const [backendOutput, setBackendOutput] = useState('')

  useEffect(() => {
    fetchBackendData()
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 400)
  }, [])

  const fetchBackendData = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/algorithm') // Adjust endpoint URL and changed from axios.get to axios.post
      setBackendOutput(response.data.result) // Changed from response.data to response.data.result
    } catch (error) {
      console.error('Error fetching backend data:', error)
      // Handle errors gracefully, e.g., display an error message
    }
  }

  return (
    <div className="container home-page">
      <TopNav />
      <div className="text-zone">
        <h1>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={healthArray}
            idx={15}
          />
          and
          <AnimatedLetters
            letterClass={letterClass}
            strArray={youArray}
            idx={15}
          />
        </h1>
        <h2>
          Learn how your menstrual cycle affects your exercise and diet. <br />{' '}
          Own your cycle, own your fitness!
          {backendOutput}{' '}
        </h2>
        <Link to="/questionnaire">
          <button className="goto-btn">Enter</button>
        </Link>
      </div>
    </div>
  )
}

export default Home
