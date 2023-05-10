import { useState } from 'react'
import { act } from 'react-dom/test-utils'

const Blog = ({ blog, user, like, remove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visibility, setVisibility] = useState(true)

  const changeVisibility = () => {
    act(() => setVisibility(!visibility))
  }

  const handleLikes = () => {
    const toAdd = { ...blog, likes: blog.likes + 1 }
    like(toAdd)
  }

  const handleDeletion = () => {
    remove(blog)
  }

  if (visibility) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={changeVisibility}>view</button>
      </div>
    )
  }

  const removeButton = user.username === blog.user.username && blog.user.name === user.name ? <button onClick={handleDeletion}>delete</button> : null


  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={changeVisibility}>hide</button>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes} <button onClick={handleLikes}>like</button>
      </div>
      <div>
        {blog.user.name ? blog.user.name : user.name}
      </div>
      {removeButton}
    </div>
  )
}

export default Blog