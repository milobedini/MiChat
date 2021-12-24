import { useEffect, useState } from 'react'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import './styles/main.scss'
import axios from './components/Axios'

function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('messages/sync').then((response) => {
      setMessages(response.data)
      console.log(messages)
    })
  }, [])

  console.log(messages)

  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  )
}

export default App
