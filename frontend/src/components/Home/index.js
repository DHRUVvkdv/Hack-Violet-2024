//import { Link } from 'react-router-dom'
import './index.scss'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Logo from './Icon'
import axios from 'axios'

export const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const healthArray = ['h', 'e', 'a', 'l', 't', 'h', ' ']
  const youArray = [' ', 'you']
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
        <h2>Tech {backendOutput} </h2>
      </div>

      <Logo />
    </div>
  )
}

export default Home
