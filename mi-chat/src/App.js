import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import './styles/main.scss'
import axios from './components/Axios'
import ChatList from './components/ChatList'

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
      <div className="app-body">
        <Sidebar conversations={conversations} />
        <ChatList conversations={conversations} />
      </div>
    </div>
  )
}

export default App
