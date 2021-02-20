import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
  const blog = {
    title: 'test title',
    author: 'me',
    url: 'test.com',
    likes: 999,
    user: {
      name: 'test',
      username: 'root'
    }
  }
  const username = 'root'
  const handleLike = jest.fn()
  const handleRemove = jest.fn()

  const component = render(
    <Blog username={username} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
  )

  component.debug()
  test('render title and author as default, others hide', () => {
    expect(component.container).toHaveTextContent('test title')
    expect(component.container).toHaveTextContent('me')
    const div = component.container.querySelector('.hideContent')
    expect(div).toHaveStyle('display: none')
  })

  test('url and likes show after click view button', () => {
    const button = component.container.querySelector('.viewBtn')
    fireEvent.click(button)

    const div = component.container.querySelector('.hideContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('check likes hit twice', () => {
    const likeButton = component.container.querySelector('.likeBtn')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
