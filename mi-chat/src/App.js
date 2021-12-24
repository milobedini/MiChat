import './styles/main.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Home from './components/Home'
import Landing from './components/Landing'
import NewConvo from './components/NewConvo'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app-body">
          {/* <Sidebar conversations={conversations} />
          <ChatList conversations={conversations} /> */}
          {/* <Home /> */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Landing />} />
            <Route path="/new" element={<NewConvo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
