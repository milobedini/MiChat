import axios from './Axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setFullname, setToken } from '../helpers/auth'
import { login } from '../helpers/api'

const Login = ({ setIsLoggedIn }) => {
  const [data, setData] = useState({
    username: '',
    password: '',
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    login(data).then(handleSuccessfulLogin).catch(handleError)
  }

  const handleSuccessfulLogin = ({ token }) => {
    setToken(token)
    setIsLoggedIn(true)
    setIsError(false)
    navigate('/home')
  }

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
    console.log(data)
  }
  return (
    <div className="login">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            onChange={handleFormChange}
            id="username"
            placeholder="Username"
          />
          <label htmlFor="username"></label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            onChange={handleFormChange}
            id="password"
            placeholder="Password"
          />
          <label htmlFor="password"></label>
        </div>
        <div>
          <input type={'submit'} value="Log In" />
        </div>
      </form>
    </div>
  )
}

export default Login
