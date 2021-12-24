import React, { useState, useEffect } from 'react'
import axios from './Axios'
import Sidebar from './Sidebar'
import ChatList from './ChatList'

const Home = () => {
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    axios.get('conversations').then((response) => {
      setConversations(response.data)
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

export default Home
