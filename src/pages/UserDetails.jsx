import { useParams } from 'react-router-dom'
import { userService } from '../services/user.service.js'

export function UserDetails() {
  const { userId } = useParams()
  const user = userService.getById(userId) || userService.getLoggedinUser()
  if (!user) return <div>Loading...</div>
  return (
    <section className='user-details'>
      <h1>Full Name: {user.fullName}</h1>
    </section>
  )
}
