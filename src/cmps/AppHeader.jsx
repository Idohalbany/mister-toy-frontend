import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, logout, signup } from '../store/actions/user.action.js'
import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)

  async function onLogin(credentials) {
    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }

  async function onSignup(credentials) {
    try {
      const user = await signup(credentials)
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot signup')
    }
  }

  async function onLogout() {
    try {
      await logout()
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  return (
    <header className='app-header'>
      <div className='container'>
        <div className='logo'>
          <Link to='/toy'>MisterToy</Link>
        </div>
        <nav className='main-nav'>
          <ul>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/toy'>Toys</NavLink>
            </li>
            <li>
              <NavLink to='/dashboard'>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to='/about'>About</NavLink>
            </li>
            <li>
              <NavLink to='/chat'>Chat</NavLink>
            </li>
            <li>
              <NavLink to='/review'>Review</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/admin/${user._id}`}>Profile</NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className='user-info-wrapper'>
          {user ? (
            <span className='user-info logged-in'>
              <div className='user-detail'>
                {user.imgUrl && <img src={user.imgUrl} />}
                {user.fullname}
              </div>
              <button onClick={onLogout}>Logout</button>
            </span>
          ) : (
            <section className='user-info logged-out'>
              <LoginSignup onLogin={onLogin} onSignup={onSignup} />
            </section>
          )}
        </div>
      </div>
    </header>
  )
}
