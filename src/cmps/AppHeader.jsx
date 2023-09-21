import { NavLink, Link } from 'react-router-dom'

export function AppHeader() {
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
      </nav>
    </header>
  )
}
