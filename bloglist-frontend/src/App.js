import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServeice from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const [message, setMessage] =  useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with ', username, password)

    try{
      const user = await loginServeice.login( {
        username, password,
      } )
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token)
      setMessage( { level: 'info', content: `Logged in as ${user.username}` } )
      setTimeout( () => setMessage(null), 3000 );
      setUser(user);
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception)
      setMessage( { level: 'error', content: exception } )
      setTimeout( () => setMessage(null), 3000 );
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.removeToken()
    setMessage( { level: 'info', content: `${user.username} logged out` } )
      setTimeout( () => setMessage(null), 3000 );
  }

  const createNewBlog = async newObject => {
    try{
      const response = await blogService.create(newObject)
      console.log(response)
      setBlogs( blogs.concat(response) )
      setMessage( { level: 'info', content: `Post added` } )
      setTimeout( () => setMessage(null), 3000 );
    } catch( exception ) {
      console.error(exception)
      setMessage( { level: 'error', content: exception } )
      setTimeout( () => setMessage(null), 3000 );
    }
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

  const createBlogForm = () => {
    return (
      <Togglable buttonLabel='new note'>
        <BlogForm createNewBlog={createNewBlog} setMessage={setMessage} />
      </Togglable>
    )
  }

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      <div>
        <h3>Logged in User: {user.username}</h3>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <div>
        <h3>Create New</h3>
        {createBlogForm()}
      </div>
      {blogs.sort( (blog1, blog2) => Number(blog2.likes) - Number(blog1.likes) )
      .map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default App