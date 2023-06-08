import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const User = () => {
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

  const userToDisplay = users.find((n) => n.id === useParams().id)

  console.log(users)

  return (
    <div>
      <h2>{userToDisplay.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userToDisplay.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
