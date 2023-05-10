import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { act } from 'react-dom/test-utils'

describe('<Blog />', () => {
  let container
  let mockHandler

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Eemi',
    url: 'www.test.com',
    likes: 10,
    user: { username: 'Emppe' }
  }

  beforeEach(() => {
    mockHandler = jest.fn()
    container = render(
      <Blog blog={blog} user={{ username: 'Emppe' }} like={mockHandler} />
    ).container
  })

  test('does not render url or likes by default', () => {
    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')

    expect(url).toBeNull()
    expect(likes).toBeNull()

  })

  test('url and likes are shown after click', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('like button is pressed twice', async () => {
    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)

    const like = screen.getByText('like')
    await act(() => user.click(like))
    await act(() =>  user.click(like))

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})