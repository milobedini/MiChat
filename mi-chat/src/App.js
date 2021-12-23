import { useEffect, useState } from 'react'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import './styles/main.scss'
import Pusher from 'pusher-js'
import axios from './components/Axios'

function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('messages/sync').then((response) => {
      setMessages(response.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('328ccb8fcb9341b089ca', {
      cluster: 'eu',
    })

    const channel = pusher.subscribe('messages')
    channel.bind('inserted', (data) => {
      setMessages([...messages, data])
    })
    // cleanup function
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])

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
