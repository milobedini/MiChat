import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import './styles/main.scss'
import axios from './components/Axios'
import ChatList from './components/ChatList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register'

function App() {
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    axios.get('conversations').then((response) => {
      setConversations(response.data)
      console.log(conversations)
    })
  }, [])

  console.log(conversations)

  return (
    <div className="app">
      <BrowserRouter>
        <div className="app-body">
          <Sidebar conversations={conversations} />
          <ChatList conversations={conversations} />
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
