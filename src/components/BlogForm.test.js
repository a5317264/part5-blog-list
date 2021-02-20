import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('testing creating blog', () => {
  test('when call event handler it received as props with the right details', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'test test' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'me' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'test.com' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({ title: 'test test', author: 'me', url: 'test.com' })
    // expect(createBlog.mock.calls)
  })
})