import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '..'

const homeData = {
  posts: [
    {
      _id: '1',
      title: 'Lotstring',
      content: 'recontextualize back-end users',
      likes: { count: 2, users: [] },
      createdAt: { $date: '2021-06-19T06:25:35.000Z' },
      updatedAt: { $date: '2021-04-20T02:39:39.000Z' },
    },
    {
      _id: '2',
      title: 'Y-find',
      content: 'scale intuitive paradigms',
      likes: { count: 2, users: [] },
      createdAt: { $date: '2022-01-31T15:07:30.000Z' },
      updatedAt: { $date: '2021-10-28T20:02:23.000Z' },
    },
    {
      _id: '3',
      title: 'Sonsing',
      content: 'monetize wireless users',
      likes: { count: 2, users: [] },
      createdAt: { $date: '2021-05-10T00:54:42.000Z' },
      updatedAt: { $date: '2021-11-30T00:38:08.000Z' },
    },
  ],
  totalCount: 3,
}

describe('Home Page', () => {
  it('renders a search bar', async () => {
    render(
      <Home
        posts={homeData.posts}
        setPosts={() => {}}
        setTotalCount={() => {}}
        sortBy="createdAt"
        setSortBy={() => {}}
        isFetching={false}
        handleSortChange={() => new Promise((resolve) => resolve())}
        handleNextPage={() => {}}
        handlePreviousPage={() => {}}
        nextButtonActive={false}
        previousButtonActive={false}
      />,
    )
    const search = screen.getAllByText(/Search Interview/i)
    expect(search.length).toBeGreaterThan(0)
  })

  it('renders a lit of products', async () => {
    render(
      <Home
        posts={homeData.posts}
        setPosts={() => {}}
        setTotalCount={() => {}}
        sortBy="createdAt"
        setSortBy={() => {}}
        isFetching={false}
        handleSortChange={() => new Promise((resolve) => resolve())}
        handleNextPage={() => {}}
        handlePreviousPage={() => {}}
        nextButtonActive={false}
        previousButtonActive={false}
      />,
    )
    const posts = screen.getAllByTestId('card-element')
    expect(posts.length).toBeGreaterThan(0)
  })
})
