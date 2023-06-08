import { Link } from 'react-router-dom'

const BlogView = ({ blogs, id, like }) => {
  const blog = blogs.find((n) => n.id === id)

  const handleLikes = () => {
    like({ ...blog, likes: blog.likes + 1 })
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <Link to={blog.url}>{blog.url}</Link>
      <div>
        {blog.likes} likes <button onClick={handleLikes}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default BlogView
