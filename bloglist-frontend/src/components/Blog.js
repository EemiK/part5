import { useState } from 'react'

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
    setVisibility(!visibility)
  }

  const handleLikes = () => {
    like({ ...blog, likes: blog.likes + 1 })
  }

  const handleDeletion = () => {
    remove(blog)
  }

  if (visibility) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}{' '}
        <button onClick={changeVisibility}>view</button>
      </div>
    )
  }

  const removeButton =
    user.username === blog.user.username && blog.user.name === user.name ? (
      <button onClick={handleDeletion}>delete</button>
    ) : null

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}{' '}
      <button onClick={changeVisibility}>hide</button>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes}{' '}
        <button onClick={handleLikes} id="like-button">
          like
        </button>
      </div>
      <div>{blog.user.name ? blog.user.name : user.name}</div>
      {removeButton}
    </div>
  )
}

export default Blog
