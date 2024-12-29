import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './TopNav.scss'
import Popup from '../Popup/popup'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const TopNav = () => {
  const navigate = useNavigate()
  const [isPopupOpen, setPopupOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      const decoded = jwtDecode(token)
      const email = decoded.email
      setEmail(email)
      axios
        .get(`${BACKEND_URL}/api/users/username/${email}`)
        .then((response) => {
          const { firstName, lastName } = response.data
          setName(`${firstName} ${lastName}`)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }, [])

  const openPopup = () => {
    navigate('/')
    setPopupOpen(true)
  }

  const closePopup = () => {
    setPopupOpen(false)
  }

  const handleLoginSignUp = () => {
    closePopup()
    setIsAuthenticated(true)
    window.location.reload()
    navigate('/')
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <div className="top-nav-overlay">
      <nav className="top-nav">
        <ul>
          <li>
            <NavLink to="/" activeClassName="active" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/questionnaire" activeClassName="active">
              Questionnaire
            </NavLink>
          </li>
          <li>
            <NavLink to="/results" activeClassName="active">
              Results
            </NavLink>
          </li>
          <li>
            <NavLink to="/healthdata" activeClassName="active">
              Health Data
            </NavLink>
          </li>
          {!isAuthenticated && (
            <li>
              <button className="auth-button" onClick={openPopup}>
                Login/Sign Up
              </button>
            </li>
          )}
          {isAuthenticated && (
            <>
              <li>
                <span className="welcome-text">Welcome, {name}!</span>
              </li>
              <li>
                <button className="auth-button" onClick={handleSignOut}>
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>

        {isPopupOpen && (
          <Popup onClose={closePopup} setIsAuthenticated={setIsAuthenticated}>
            <div>
              <h2>Login/Sign Up</h2>
              <button onClick={handleLoginSignUp}>Submit</button>
            </div>
          </Popup>
        )}
      </nav>
    </div>
  )
}

export default TopNav
