import Togglable from "./Togglable"

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <Togglable buttonLabel='view'>
          url:{blog.url}
          <br/>
          likes:{blog.likes} <button>like</button>
          <br/>
        </Togglable>
      </div>  
    </div>
    
  )
}

export default Blog