import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Popup.scss';
import LoadingMessage from '../LoadingMessage/LoadingMessage';

const Popup = ({ onClose, setIsAuthenticated }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const decoded = jwtDecode(token);
      const email = decoded.email;
      axios
        .get(`${BACKEND_URL}/api/users/username/${email}`)
        .then((response) => {
          const { firstName, lastName } = response.data;
          setName(`${firstName} ${lastName}`);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [setIsAuthenticated]);

  const signIn = async () => {
    try {
      setIsLoading(true);
      // Add artificial delay - TESTING ONLY  
      // await new Promise(resolve => setTimeout(resolve, 100000)); // 3 second delay

      const signInResponse = await axios.post(
        `${BACKEND_URL}/api/users/signin`,
        {
          email,
          password,
        }
      );

      setIsAuthenticated(true);
      setShowSignInForm(false);
      localStorage.setItem('token', signInResponse.data.token);

      // Only close after successful sign in
      onClose();
    } catch (error) {
      console.error('Sign in error:', error);
      if (error.response && error.response.status === 400) {
        alert(`Sign in failed: ${error.response.data.msg}`);
      } else {
        alert('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      setIsLoading(true);
      const checkUserResponse = await axios.get(
        `${BACKEND_URL}/api/users/checkuser/${email}`
      );
      if (checkUserResponse.data.msg === 'User already exists') {
        alert('This email is already registered. Please use a different email.');
        return;
      }

      const signUpResponse = await axios.post(
        `${BACKEND_URL}/api/users/signup`,
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

      // Only close after successful sign up
      onClose();
    } catch (error) {
      alert(`Signup failed: ${error.response.data}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const handleSubmit = async () => {
    if (mode === 'login') {
      await signIn();
    } else if (mode === 'signup') {
      await signUp();
    }

    // Reset form fields only after successful submission
    if (!isLoading) {
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        {isLoading ? (
          <LoadingMessage />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Popup;