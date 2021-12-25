import './styles/main.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Register from './components/Register'
import Home from './components/Home'
import Landing from './components/Landing'
import NewConvo from './components/NewConvo'
import Login from './components/Login'
import { getToken } from './helpers/auth'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
        <div className="app-body">
          {/* <Sidebar conversations={conversations} />
          <ChatList conversations={conversations} /> */}
          {/* <Home /> */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/home"
              element={
                <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route path="/" element={<Landing />} />
            <Route path="/new" element={<NewConvo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
