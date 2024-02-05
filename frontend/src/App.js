import React from 'react'
import './App.scss'
import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Questionnaire from './components/Questionnaire'
import Results from './components/Results'
import HealthData from './components/HealthData/index.js'
// import TopNav from './components/navbar/topnav.js'; // Import the TopNav component

function App() {
  return (
    <>
      {/* <TopNav /> Include the TopNav component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/results" element={<Results />} />
        <Route path="/healthdata" element={<HealthData />} />
      </Routes>
    </>
  )
}

export default App
