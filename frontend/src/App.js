import './App.scss';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="questionnaire" element={<Questionnaire />} />
      <Route path="results" element={<Results />} />
    </Routes>
  );
}

export default App;
