import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './TopNav.scss'; // Import your styles if needed
import Popup from '../Popup/popup'; // Import the Popup component

const TopNav = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add this line

  const openPopup = () => {
    navigate('/');
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleLoginSignUp = () => {
    // Handle login/sign-up logic
    closePopup();
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleSignOut = () => {
    // Handle sign-out logic
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

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
            <NavLink to="questionnaire" activeClassName="active">
              Questionnaire
            </NavLink>
          </li>
          <li>
            <NavLink to="results" activeClassName="active">
              Results
            </NavLink>
          </li>
          <li>
            <NavLink to="healthdata" activeClassName="active">
              Results
            </NavLink>
          </li>
          <li>
            <button onClick={openPopup}>Login/Sign Up</button>
          </li>
          <li>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>

        {isPopupOpen && (
          <Popup onClose={closePopup} setIsAuthenticated={setIsAuthenticated}>
            {/* Add your login/sign-up form or content here */}
            <div>
              <h2>Login/Sign Up</h2>
              {/* Add your form inputs and buttons here */}
              <button onClick={handleLoginSignUp}>Submit</button>
            </div>
          </Popup>
        )}
      </nav>
    </div>
  );
};

export default TopNav;
