import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'

export function ToyDetails() {
  const { _id } = useParams()
  const [toy, setToy] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    toyService.get(_id).then((toy) => setToy(toy))
  }, [_id])

  if (!toy) return <div>Loading...</div>
  return (
    <section className='toy-details main-layout'>
      <h2 className='toy-title'>{toy.name}</h2>
      <p className='toy-price'>Price: ${toy.price}</p>
      <p className='toy-labels'>Labels: {toy.labels.join(', ')}</p>
      <p className='toy-created-at'>Created At: {new Date(toy.createdAt).toLocaleString()}</p>
      <p className='toy-in-stock'>In Stock: {toy.inStock ? 'Yes' : 'No'}</p>

      <button className='go-back-btn' onClick={() => navigate('/toy')}>
        Go Back
      </button>
    </section>
  )
}
