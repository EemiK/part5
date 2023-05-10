import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

test('<BlogForm /> calls with rigth information', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const input = screen.getAllByRole('textbox')
  const createButton = screen.getByText('create')

  await act(() => user.type(input[0], 'testing title'))
  await act(() => user.type(input[1], 'testing author'))
  await act(() => user.type(input[2], 'testing url'))
  await act(() => user.click(createButton))

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({ title: 'testing title', author: 'testing author', url: 'testing url' })
})