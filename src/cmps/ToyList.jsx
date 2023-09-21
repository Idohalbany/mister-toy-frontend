import { ToyPreview } from './ToyPreview'

export function ToyList({ toys, onRemoveToy, onEditToy }) {
  console.log(toys)
  return (
    <ul className='toy-list'>
      {toys.map((toy) => (
        <li className='toy-list-item' key={toy._id}>
          <ToyPreview toy={toy} />
          <div>
            <button
              onClick={() => {
                onRemoveToy(toy._id)
              }}>
              x
            </button>
            <button
              onClick={() => {
                onEditToy(toy)
              }}>
              Change price
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
