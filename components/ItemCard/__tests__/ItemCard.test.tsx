import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ItemCard from '..'

const post = {
  _id: '1',
  title: 'Lotstring',
  likes: { count: 2, users: [] },
  ownerId: 'test@test.com'
}

describe('Item Card', () => {
  it('renders the card correctly', async () => {
    render(
      <ItemCard
        {...post}
      />,
    )
    const title = screen.getByText(/Lotstring/i)
    const likes = screen.getByText(/2/i)

    expect(title).toBeInTheDocument()
    expect(likes).toBeInTheDocument()
  })
})
