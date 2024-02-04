import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Questionnaire from './components/Questionnaire'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="questionnaire" element={<Questionnaire />} />
    </Routes>
  )
  // return (
  //   <main className="column">
  //     <h1>Auth0 Login</h1>
  //     <LoginButton />
  //     <LogoutButton />
  //   </main>
  // )
}

export default App
