import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.action.js'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { AdminView } from './AdminView'
import { LoginSignup } from './LoginSignup'

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)
  console.log('user:', user)
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(false)
  const [isAdminView, setIsAdminView] = useState(false)

  const navigate = useNavigate()

  function setUser(user) {
    console.log('user:', user)
    dispatch({ type: SET_USER, user })
  }

  async function onLogout() {
    try {
      await logout()
      setUser(null)
      navigate('/toy')
    } catch (err) {
      showErrorMsg('Cannot Logout!', err)
    }
  }

  function onChangeLoginStatus() {
    setIsLogin(false)
  }

  return (
    <header className='app-header'>
      <div>
        <div>
          <div className='logo'>
            <Link to={'/toy'}>MisterToy</Link>
          </div>
          <nav className='main-nav'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/toy'>Toys</NavLink>
            <NavLink to='/dashboard'>Dashboard</NavLink>
            <NavLink to='/about'>About</NavLink>
            {user && <NavLink to={`/user/${user._id}`}>Profile</NavLink>}
          </nav>
          {user && (
            <section className='user-info flex align-center justify-between'>
              <p className='header-user'>Hello {user.fullname} !</p>
              <button onClick={onLogout}>Logout</button>
              {user && <button onClick={() => setIsAdminView(true)}>Admin Controller</button>}
            </section>
          )}

          {!user && (
            <section className='user-info'>
              <button onClick={() => setIsLogin((prevLogin) => !prevLogin)}>
                {!isLogin ? 'Log In' : 'Close'}
              </button>

              {isLogin && (
                <section>
                  <LoginSignup onChangeLoginStatus={onChangeLoginStatus} />
                  <div onClick={() => setIsLogin(false)}></div>
                </section>
              )}
            </section>
          )}
        </div>
      </div>

      {isAdminView && (
        <section>
          <div onClick={() => setIsAdminView(false)}></div>
          <AdminView />
        </section>
      )}
    </header>
  )
}
