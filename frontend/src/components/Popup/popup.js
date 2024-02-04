// Popup.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Popup.scss'; // Import your styles if needed

const Popup = ({ onClose, onLogin, onSignUp }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignInForm, setShowSignInForm] = useState(true); // Define the state
  const [showSignUpForm, setShowSignUpForm] = useState(false); // Define the state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const decoded = jwtDecode(token);
      const email = decoded.email;
      axios
        .get(`http://localhost:8000/api/users/username/${email}`)
        .then((response) => {
          const { firstName, lastName } = response.data;
          setName(`${firstName} ${lastName}`);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, []);

  const signIn = async () => {
    try {
      // Attempt to sign in
      const signInResponse = await axios.post(
        'http://localhost:8000/api/users/signin',
        {
          email,
          password,
        }
      );
  
      // If sign in is successful, set isAuthenticated to true and store the JWT
      setIsAuthenticated(true);
      setShowSignInForm(false);
      localStorage.setItem('token', signInResponse.data.token);
    } catch (error) {
        console.error('Sign in error:', error);
      // Handle error
      if (error.response && error.response.status === 400) {
        alert(`Sign in failed: ${error.response.data.msg}`);
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };
  

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const checkUserResponse = await axios.get(
        `http://localhost:8000/api/users/checkuser/${email}`
      );
      if (checkUserResponse.data.msg === 'User already exists') {
        alert('This email is already registered. Please use a different email.');
        return;
      }

      const signUpResponse = await axios.post(
        'http://localhost:8000/api/users/signup',
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      setIsAuthenticated(true);
      setShowSignUpForm(false);
      localStorage.setItem('token', signUpResponse.data.token);
    } catch (error) {
      alert(`Signup failed: ${error.response.data}`);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const handleSubmit = () => {
    if (mode === 'login') {
      signIn();
    } else if (mode === 'signup') {
      signUp();
    }

    // Reset the form fields
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setConfirmPassword('');

    // Close the popup
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <span onClick={onClose} className="close-btn">
            &times;
          </span>
        </div>
        <div className="popup-content">
          <h2>{mode === 'login' ? 'Log In' : 'Sign Up'}</h2>
          {mode === 'login' ? (
            <>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          ) : (
            <>
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className="popup-footer">
          <span onClick={() => handleModeChange('login')}>
            Log In
          </span>
          <span onClick={() => handleModeChange('signup')}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
};

export default Popup;
