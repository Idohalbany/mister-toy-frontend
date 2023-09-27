import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

const Marker = ({ text }) => <div style={{ fontSize: '2em', color: 'red' }}>{text}</div>

const data = [
  {
    id: 1,
    name: 'New York, New York',
    lat: 40.712776,
    lng: -74.005974,
  },
  {
    id: 2,
    name: 'San Francisco, California',
    lat: 37.774929,
    lng: -122.419418,
  },
  {
    id: 3,
    name: 'Los Angeles, California',
    lat: 34.052235,
    lng: -118.243683,
  },
  {
    id: 4,
    name: 'Tel Aviv, Israel',
    lat: 32.0853,
    lng: 34.781769,
  },
  {
    id: 5,
    name: 'Sydney, Australia',
    lat: -33.86882,
    lng: 151.20929,
  },
]

export function About() {
  const [center, setCenter] = useState({ lat: 32.0853, lng: 34.781769 })
  const zoom = 11

  const handleBranchClick = (branch) => {
    setCenter({ lat: branch.lat, lng: branch.lng })
  }

  return (
    <div className='about-us'>
      <div>
        <h1 style={{ textAlign: 'center' }}>Shop branches</h1>

        <div style={{ marginBottom: '20px' }}>
          {data.map((branch) => (
            <button key={branch.id} onClick={() => handleBranchClick(branch)}>
              {branch.name}
            </button>
          ))}
        </div>

        <div className='map-container' style={{ height: '50vh', margin: 'auto' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyA5YAKbctMWmj2etXv-KY7MSXDMGaWr0qs' }}
            center={center}
            defaultZoom={zoom}>
            {data.map((branch) => (
              <Marker key={branch.id} lat={branch.lat} lng={branch.lng} text='📍' />
            ))}
          </GoogleMapReact>
        </div>
      </div>
      <h1 className='title-content-about'>About Us</h1>
      <p className='about-content'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum voluptate atque doloremque
        ipsam non maxime distinctio consequuntur saepe harum eum dicta incidunt, alias earum? Dicta
        debitis quo harum rerum aliquam.
      </p>
    </div>
  )
}
