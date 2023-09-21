// ToyEdit.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveToy } from '../store/actions/toy.action.js'
import { toyService } from '../services/toy.service.js'

export function ToyEdit() {
  const { _id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [toy, setToy] = useState(null)

  useEffect(() => {
    toyService.get(_id).then((fetchedToy) => setToy(fetchedToy))
  }, [_id])

  function handleInputChange({ target }) {
    const { name, value } = target
    setToy((prevToy) => ({ ...prevToy, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    saveToy(toy)
      .then(() => {
        navigate('/toy')
      })
      .catch((err) => {
        console.error('Failed to save toy:', err)
      })
  }

  if (!toy) return <div>Loading...</div>

  return (
    <div className='toy-edit-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='toy-name'>Name:</label>
        <input id='toy-name' name='name' value={toy.name} onChange={handleInputChange} />

        <label htmlFor='toy-price'>Price:</label>
        <input
          type='number'
          id='toy-price'
          name='price'
          value={toy.price}
          onChange={handleInputChange}
        />

        <button type='submit'>Save</button>
      </form>
      <button onClick={() => navigate('/toy')}>Cancel</button>
    </div>
  )
}
