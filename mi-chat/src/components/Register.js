import '../styles/Register.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
      const res = await axios.post('/api/register', data)
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
      </form>
    </div>
  )
}

export default Register
