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
      <div className='logo'>
        <Link to={'/toy'}>MisterToy</Link>
      </div>
      <nav className='main-nav'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/toy'>Toys</NavLink>
        <NavLink to='/dashboard'>Dashboard</NavLink>
        <NavLink to='/about'>About</NavLink>
        {user && <NavLink to={`/admin/${user._id}`}>Profile</NavLink>}
      </nav>
      {user && (
        <span className='user-info'>
          <div>
            {user.imgUrl && <img src={user.imgUrl} />}
            {user.fullname}
          </div>
          <button onClick={onLogout}>Logout</button>
        </span>
      )}
      {!user && (
        <section className='user-info'>
          <LoginSignup onLogin={onLogin} onSignup={onSignup} />
        </section>
      )}
    </header>
  )
}
