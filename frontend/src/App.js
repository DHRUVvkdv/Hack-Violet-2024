import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Questionnaire from './components/Questionnaire';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="questionnaire" element={<Questionnaire />} />
    </Routes>
  );
}

export default App;
