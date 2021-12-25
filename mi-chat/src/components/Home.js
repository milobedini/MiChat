import React, { useState, useEffect } from 'react'
import axios from './Axios'
import Sidebar from './Sidebar'
import ChatList from './ChatList'
import { getToken } from '../helpers/auth'

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    axios.get('conversations').then((response) => {
      setConversations(response.data)
    })
    if (getToken()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  console.log(conversations)

  return (
    <div className="app">
      <div className="app-body">
        <Sidebar conversations={conversations} isLoggedIn={isLoggedIn} />
        <ChatList conversations={conversations} />
      </div>
    </div>
  )
}

export default Home
