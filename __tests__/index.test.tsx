import Home, { getServerSideProps } from '../pages/index'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { getAllPosts } from '../utils/api/dbUtils'

describe('Home Page', () => {
  const homeData = {
    posts: [
      {
        title: 'Lotstring',
        content: 'recontextualize back-end users',
        likes: { count: 2, users: [] },
        createdAt: { $date: '2021-06-19T06:25:35.000Z' },
        updatedAt: { $date: '2021-04-20T02:39:39.000Z' },
      },
      {
        title: 'Y-find',
        content: 'scale intuitive paradigms',
        likes: { count: 2, users: [] },
        createdAt: { $date: '2022-01-31T15:07:30.000Z' },
        updatedAt: { $date: '2021-10-28T20:02:23.000Z' },
      },
      {
        title: 'Sonsing',
        content: 'monetize wireless users',
        likes: { count: 2, users: [] },
        createdAt: { $date: '2021-05-10T00:54:42.000Z' },
        updatedAt: { $date: '2021-11-30T00:38:08.000Z' },
      },
    ],
    totalCount: 3,
  }

  it('renders a search bar', () => {
    render(<Home {...homeData}/>)

    expect(screen.getByTestId('SEARCH')).toBeInTheDocument()
  })
})
