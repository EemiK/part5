import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = ({ blogs, addBlog, blogRef }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const compareNumbers = (a, b) => {
    return b.likes - a.likes
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={addBlog} blogRef={blogRef} />
      </Togglable>
      {blogs.sort(compareNumbers).map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
