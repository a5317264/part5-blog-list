import React, { useState } from 'react'

const Blog = ({ blog, username, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisability = () => {
    setVisible(!visible)
  }
  const buttonText = visible ? 'hide' : 'view'

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleVisability} className="viewBtn">{buttonText}</button>
      <div style={showWhenVisible} className="hideContent">
        <div>{blog.url}</div>
        <div>likes: {blog.likes}
          <button onClick={handleLike} className="likeBtn">like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          {blog.user.username === username &&
          <button onClick={handleRemove}>remove</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Blog
