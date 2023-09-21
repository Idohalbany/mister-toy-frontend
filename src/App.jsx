import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AppHeader } from './cmps/AppHeader'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { Dashboard } from './pages/Dashboard'
import './App.css'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className='main-layout app'>
          <AppHeader />
          <main className='nav-bar'>
            <Routes>
              <Route element={<Home />} path='/' />
              <Route element={<About />} path='/about' />
              <Route element={<Dashboard />} path='/dashboard' />
              <Route element={<ToyIndex />} path='/toy' />
              <Route element={<ToyDetails />} path='/toy/:_id' />
              <Route element={<ToyEdit />} path='/toy/edit/:_id' />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}