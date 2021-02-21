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
    <div id="blog" style={blogStyle} className="blog">
      <span>{blog.title} {blog.author}</span>
      <button id="button-view" onClick={toggleVisability} className="viewBtn">{buttonText}</button>
      <div style={showWhenVisible} className="hideContent">
        <div>{blog.url}</div>
        <div id="likes">likes: {blog.likes}
          <button id="button-like" onClick={handleLike} className="likeBtn">like</button>
        </div>
        {!blog.user
          ? ''
          : <div>
            {blog.user.name}
            <br/>
            {blog.user.username === username &&
            <button onClick={handleRemove}>remove</button>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Blog
