import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleTitleChange = (event) => {setNewBlog({ ...newBlog, title: event.target.value })}
  const handleAuthorChange = (event) => {setNewBlog({ ...newBlog, author: event.target.value })}
  const handleUrlChange = (event) => {setNewBlog({ ...newBlog, url: event.target.value })}

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })
    setNewBlog({ title: '', author: '', url: '' })
  }


  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>title:<input id="title" value={newBlog.title} onChange={handleTitleChange} /></div>
        <div>author:<input id="author" value={newBlog.author} onChange={handleAuthorChange} /></div>
        <div>url:<input id="url" value={newBlog.url} onChange={handleUrlChange} /></div>
        <button id="button.submit" type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm