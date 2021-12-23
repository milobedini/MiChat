import { useEffect } from 'react'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import './styles/main.scss'
import Pusher from 'pusher-js'

function App() {
  useEffect(() => {
    const pusher = new Pusher('328ccb8fcb9341b089ca', {
      cluster: 'eu',
    })

    const channel = pusher.subscribe('messages')
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data))
    })
  }, [])

  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default App
