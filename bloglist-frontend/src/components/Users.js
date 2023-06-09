import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

const Users = () => {
  const getAll = () => {
    const request = axios.get('/api/users/')
    return request.then((res) => res.data)
  }

  const result = useQuery('users', getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  const users = result.data

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link> {user.blogs.length}
        </div>
      ))}
    </div>
  )
}

export default Users
