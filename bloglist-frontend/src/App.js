import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import Error from './components/Error'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappuser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappuser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))

      setMessage(`a new blog ${blogObject.title} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const addLike = (blogObject) => {
    blogService.update(blogObject)

    setBlogs(
      blogs.map((blog) => (blog.id === blogObject.id ? blogObject : blog))
    )
  }

  const deleteBlog = (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    )
      blogService.remove(blogObject).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))

        setMessage('blog removed!')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  if (user === null) {
    return (
      <div>
        <Error message={errorMessage} />
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          password={password}
          handlers={[handleUsernameChange, handlePasswordChange]}
          submit={handleLogin}
        />
      </div>
    )
  }

  const compareNumbers = (a, b) => {
    return b.likes - a.likes
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>
        {user.name} logged in
        <LogoutButton submit={handleLogout} />
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.sort(compareNumbers).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          like={addLike}
          remove={deleteBlog}
        />
      ))}
    </div>
  )
}

export default App
