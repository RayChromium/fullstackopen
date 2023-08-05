import { useState } from "react";

const BlogForm = ( {createNewBlog, setMessage} ) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async event => {
        event.preventDefault();
        const newObject = {
            title: title,
            author: author,
            url: url,
        };
        try{
            await createNewBlog(newObject);
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch( exception ) {
            console.error(exception)
            setMessage( { level: 'error', content: exception } )
            setTimeout( () => setMessage(null), 3000 );
          }
        
    }
    return (
        <form onSubmit={addBlog}>
          <div>
            title
              <input 
              type='text' 
              value={title} 
              name='Title' 
              onChange={({ target }) => setTitle(target.value)} 
              />
          </div>
          <div>
            author
              <input 
              type='text' 
              value={author} 
              name='Author' 
              onChange={ ( {target} ) => setAuthor(target.value) } 
              />
          </div>
          <div>
            url
              <input 
              type='text' 
              value={url} 
              name='Url' 
              onChange={ ( {target} ) => setUrl(target.value) } 
              />
          </div>
          <button type='submit'>create</button>
        </form>
    )
}

export default BlogForm;