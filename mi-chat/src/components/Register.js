import '../styles/Register.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from './Axios'

const Register = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    fullname: '',
    password: '',
    passwordConfirmation: '',
  })
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const handleSuccessfulRegister = () => {
    setIsError(false)
    navigate('/login')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post('register', data)
      handleSuccessfulRegister()
      console.log(res.data)
    } catch (err) {
      console.log(err)
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
    <div className="register">
      <h2>Sign Up</h2>
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
            type="email"
            name="email"
            onChange={handleFormChange}
            id="email"
            placeholder="Email"
          />
          <label htmlFor="email"></label>
        </div>
        <div>
          <input
            type="text"
            name="fullname"
            onChange={handleFormChange}
            id="fullname"
            placeholder="Your full name"
          />
          <label htmlFor="fullname"></label>
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
          <input
            type="password"
            name="passwordConfirmation"
            onChange={handleFormChange}
            id="passwordConfirmation"
            placeholder="Password again"
          />
          <label htmlFor="passwordConfirmation"></label>
        </div>
        <div>
          <input type={'submit'} value="Sign Up" />
        </div>
      </form>
    </div>
  )
}

export default Register
