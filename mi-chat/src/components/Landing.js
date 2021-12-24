import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Landing.scss'

const Landing = () => {
  return (
    <div className="landing">
      <h1>Welcome back to MiChat</h1>
      <Link to="/home">
        <button>Hub</button>
      </Link>
      <Link to="/new">
        <button>Start new conversation</button>
      </Link>
    </div>
  )
}

export default Landing
