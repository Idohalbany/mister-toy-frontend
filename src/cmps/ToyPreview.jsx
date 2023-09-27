import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
  return (
    <article className='toy-preview'>
      <h1>🧸</h1>
      <h2>{toy.name}</h2>
      <p>
        Price: <span>${toy.price.toLocaleString()}</span>
      </p>
      <p>
        in stock: <span>{toy.inStock ? 'Yes' : 'No'}</span>
      </p>
      <Link to={`/toy/${toy._id}`}>Details</Link>
      <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
    </article>
  )
}
