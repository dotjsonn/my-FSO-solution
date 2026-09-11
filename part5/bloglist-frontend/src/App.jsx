import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import Message from './components/Message'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('loggedBlogUser')
    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.log('Wrong credentials');
      setColor('red')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleBlogForm = async (blogObject) => {
    const blog = await blogService.create(blogObject)
    setBlogs(blogs.concat(blog))
    setColor('green')
    setMessage(`a new blog ${blog.title} by ${blog.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Message message={message} color={color} />
      <LoginForm handleLogin={handleLogin} 
        username={username} handleUsername={({target}) => setUsername(target.value)} 
        password={password} handlePassword={({target}) => setPassword(target.value)} 
      />
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <BlogForm createBlog={handleBlogForm} />
    </div>
  )

  const displayBlog = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <Message message={message} color={color} />
          <p>
            {user.name || user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {displayBlog()}
        </div>
      )}
    </div>
  )
}

export default App