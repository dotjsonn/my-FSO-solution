import { useState } from "react"

const Blog = ({ blog, user, updateLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showDetails, setShowDetails] = useState(false)

  const show = {display: showDetails ? '' : 'none'}

  const changeVisibility = () => {
    setShowDetails(!showDetails)
  }

  const label = showDetails ? 'hide' : 'view'
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={changeVisibility}>{label}</button>
      </div>
      <div style={show}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} 
          <button onClick={() => updateLikes(blog.id)}>like</button>
        </div>        
        <div>{blog.user.name || blog.user.username}</div>
        {blog.user.id === user.id && (
          <button onClick={() => removeBlog(blog.title, blog.author, blog.id)}>
            remove
          </button>
        )}
      </div>
    </div>  
  )
}

export default Blog