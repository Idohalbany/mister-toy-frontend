import { toyService } from '../services/toy.service'
import { useEffect, useState } from 'react'

export function Home() {
  const [labels, setLabels] = useState([])

  useEffect(() => {
    const labels = toyService.getLabels()
    setLabels(labels)
  }, [])

  return (
    <div className='home-page'>
      {/* Hero Section */}
      <section className='hero-section'>
        <h1>Welcome to MisterToy!</h1>
        <p>Your one-stop-shop for the best toys in town.</p>
      </section>

      {/* Features Section */}
      <section className='features-section'>
        <div className='feature'>
          <h2>Add Toys</h2>
          <p>Add new toys to your collection easily.</p>
        </div>
        <div className='feature'>
          <h2>Edit Toys</h2>
          <p>Customize and manage your toy inventory.</p>
        </div>
        <div className='feature'>
          <h2>Details & More</h2>
          <p>Find out everything you need to know about a toy.</p>
        </div>
      </section>

      {/* Labels Showcase */}
      <section className='label-section'>
        <h2>Explore by Labels</h2>
        <ul className='labels-list'>
          {labels.map((label, index) => (
            <li key={index} className='label-item'>
              {label}
            </li>
          ))}
        </ul>
      </section>

      {/* Call-to-Action */}
      <section className='cta-section'>
        <h2>Find a Branch Near You</h2>
        <p>Check out our About page to find a MisterToy branch close to you.</p>
      </section>
    </div>
  )
}
