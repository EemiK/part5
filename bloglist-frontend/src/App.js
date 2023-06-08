import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import Error from './components/Error'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'

import blogService from './services/blogs'
import loginService from './services/login'
import { useNotificationDispatch } from './NotificationContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'

const App = () => {
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const dispatch = useNotificationDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const queryClient = new useQueryClient()

  const result = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const updatedBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.map((n) => (n.id !== updatedBlog.id ? n : updatedBlog))
      )

      dispatch({ type: 'SHOW', payload: `blog ${updatedBlog.title} liked` })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    },
  })

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))

      dispatch({ type: 'SHOW', payload: `a new blog ${newBlog.title} added` })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    },
  })

  /*const deletedBlogMutation = useMutation(blogService.remove, {
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        'blogs',
        blogs.filter((blog) => blog.id !== deletedBlog.id)
      )

      dispatch({ type: 'SHOW', payload: 'blog removed!' })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    },
  })*/

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

  const addBlog = (blogObject) => {
    newBlogMutation.mutate(blogObject)
  }

  const addLike = (blogObject) => {
    updatedBlogMutation.mutate(blogObject)
  }

  /*const deleteBlog = (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    )
      deletedBlogMutation.mutate(blogObject)
  }*/

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

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  const blogs = result.data

  return (
    <Router>
      <Menu />
      <Notification />
      <p>
        {user.name} logged in
        <LogoutButton submit={handleLogout} />
      </p>
      <Routes>
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<BlogView blogs={blogs} like={addLike} />} />
        <Route path='/' element={<BlogList blogs={blogs} addBlog={addBlog} />} />
        <Route path='/users' element={<Users />} />
      </Routes>

    </Router>
  )
}

export default App
