import { userService } from '../services/user.service'
import { ToyPreview } from './ToyPreview'

export function ToyList({ toys, onRemoveToy, onEditToy }) {
  function shouldShowActionBtns(toy) {
    const user = userService.getLoggedinUser()
    if (!user) return false
    if (user.isAdmin) return true
    return toy.owner?._id === user._id
  }
  return (
    <ul className='toy-list'>
      {toys.map((toy) => (
        <li className='toy-list-item' key={toy._id}>
          <ToyPreview toy={toy} />
          <div>
            {shouldShowActionBtns(toy) && (
              <>
                <button onClick={() => onRemoveToy(toy._id)}>x</button>
                <button onClick={() => onEditToy(toy)}>Change price</button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
