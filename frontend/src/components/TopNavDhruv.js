import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const TopNav = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showSignInForm, setShowSignInForm] = useState(false)
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [duration, setDuration] = useState(5)

  // Check if a JWT is stored locally when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      const decoded = jwtDecode(token)
      const email = decoded.email
      setEmail(email)
      console.log(email)
      axios
        .get(`http://localhost:8000/api/users/username/${email}`)
        .then((response) => {
          const { firstName, lastName } = response.data

          // Output the name to the console
          //   console.log(`User's name: ${firstName} ${lastName}`)
          setName(`${firstName} ${lastName}`)
          console.log('Response dATA:', response.data)
          //   console.log(lastName)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }, [])

  const signIn = async () => {
    try {
      // Attempt to sign in
      const signInResponse = await axios.post(
        'http://localhost:8000/api/users/signin',
        {
          email,
          password,
        }
      )

      // If sign in is successful, set isAuthenticated to true and store the JWT
      setIsAuthenticated(true)
      setShowSignInForm(false)
      localStorage.setItem('token', signInResponse.data.token)
    } catch (error) {
      // Handle error
      if (error.response.status === 400) {
        alert(`Sign in failed: ${error.response.data.msg}`)
      } else {
        alert('An error occurred. Please try again.')
      }
    }
  }

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    try {
      // Check if the user already exists
      const checkUserResponse = await axios.get(
        `http://localhost:8000/api/users/checkuser/${email}`
      )
      if (checkUserResponse.data.msg === 'User already exists') {
        alert('This email is already registered. Please use a different email.')
        return
      }

      // If the user does not exist, attempt to sign up
      const signUpResponse = await axios.post(
        'http://localhost:8000/api/users/signup',
        {
          firstName,
          lastName,
          email,
          password,
        }
      )

      // If sign up is successful, set isAuthenticated to true
      setIsAuthenticated(true)
      setShowSignUpForm(false)
      localStorage.setItem('token', signUpResponse.data.token)
    } catch (error) {
      // Handle error
      alert(`Signup failed: ${error.response.data}`)
    }
  }

  const signOut = async () => {
    // Replace this with your sign out logic
    // If sign out is successful, set isAuthenticated to false
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }
  const trackPeriodCycle = async () => {
    try {
      console.log(`EMAIL FROM TRACK ${email.charAt(1)}`)
      // Define the data to send
      const data = {
        email, // use the email from the state
        startDate, // use the start date from the state
        duration, // use the duration from the state
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
  }

  return (
    <nav>
      <h1>My App</h1>
      {isAuthenticated ? (
        <>
          <p>Welcome, {name}</p>
          <button onClick={signOut}>Sign Out</button>
          <button onClick={trackPeriodCycle}>Track Period Cycle</button>{' '}
        </>
      ) : (
        <>
          <button onClick={() => setShowSignInForm(true)}>Sign In</button>
          <button onClick={() => setShowSignUpForm(true)}>Sign Up</button>
        </>
      )}
      {showSignInForm && (
        <div>
          <h2>Sign In</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={signIn}>Submit</button>
          <button onClick={() => setShowSignInForm(false)}>Cancel</button>
        </div>
      )}
      {showSignUpForm && (
        <div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <button onClick={signUp}>Submit</button>
          <button onClick={() => setShowSignUpForm(false)}>Cancel</button>
        </div>
      )}
    </nav>
  )
}

export default TopNav
