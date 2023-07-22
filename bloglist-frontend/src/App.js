import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServeice from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with ', username, password)

    try{
      const user = await loginServeice.login( {
        username, password,
      } )
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token)
      setUser(user);
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.removeToken()
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input 
              type='text' 
              value={username} 
              name='Username' 
              onChange={({ target }) => setUsername(target.value)} 
              />
          </div>
          <div>
            password
              <input 
              type='password' 
              value={password} 
              name='Password' 
              onChange={ ( {target} ) => setPassword(target.value) } 
              />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h3>Logged in User: {user.username}</h3>
        <button on onClick={handleLogout}>Log out</button>
      </div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App