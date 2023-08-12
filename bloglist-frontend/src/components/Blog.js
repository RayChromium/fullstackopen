import Togglable from "./Togglable"
import blogService from '../services/blogs'

const Blog = ({blog, setBlogs}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async (event) => {
    event.preventDefault();
    const likeBlogReq = {
      user: blog.user.id,
      likes: 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    };
    const likeRes = await blogService.like(likeBlogReq);
    console.log('after like blog: ', likeRes);
    const updatedBlogs = await blogService.getAll();
    setBlogs(updatedBlogs);
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <Togglable buttonLabel='view'>
          url:{blog.url}
          <br/>
          likes:{blog.likes} <button onClick={handleLike}>like</button>
          <br/>
        </Togglable>
      </div>  
    </div>
    
  )
}

export default Blog