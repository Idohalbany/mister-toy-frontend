import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from './ImgUploader'

export function LoginSignup(props) {
  const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
  const [isSignup, setIsSignup] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const users = await userService.getUsers()
    setUsers(users)
  }

  function clearState() {
    setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    setIsSignup(false)
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  function onLogin(ev = null) {
    if (ev) ev.preventDefault()
    if (!credentials.username) return
    props.onLogin(credentials)
    clearState()
  }

  function onSignup(ev = null) {
    if (ev) ev.preventDefault()
    if (!credentials.username || !credentials.password || !credentials.fullname) return
    props.onSignup(credentials)
    clearState()
  }

  function toggleSignup() {
    setIsSignup(!isSignup)
  }

  function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl })
  }

  return (
    <div className='login-page'>
      <div className='form-section'>
        {!isSignup ? (
          <form className='login-form' onSubmit={onLogin}>
            <div className='form-group'>
              <select
                className='form-control'
                name='username'
                value={credentials.username}
                onChange={handleChange}>
                <option value=''>Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user.username}>
                    {user.fullname}
                  </option>
                ))}
              </select>
              <button className='login-button'>Login!</button>
            </div>
          </form>
        ) : (
          <form className='signup-form' onSubmit={onSignup}>
            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                name='fullname'
                value={credentials.fullname}
                placeholder='Fullname'
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                name='username'
                value={credentials.username}
                placeholder='Username'
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                type='password'
                name='password'
                value={credentials.password}
                placeholder='Password'
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <ImgUploader className='img-uploader' onUploaded={onUploaded} />
            </div>
            <button className='signup-button'>Signup!</button>
          </form>
        )}
        <div className='toggle-section'>
          <button className='toggle-button' onClick={toggleSignup}>
            {!isSignup ? 'Signup' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}
