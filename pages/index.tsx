/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { ReactNode } from 'react'
import ContentList from '../components/ContentList'
import SearchBar from '../components/SearchBar'
import { getAllPosts } from '../utils/api/dbUtils'
import PaginationButtons from '../components/PaginationButtons'
import SortInput from '../components/SortInput'
import classes from '../styles/Home.module.css'

type iProps = {
  posts: unknown
  totalCount: number
  children?: ReactNode
}

const Home: NextPage<iProps> = (props: iProps) => {
  const router = useRouter()
  const { posts: initialPosts } = props
  const page = router.query.page || 1
  const [totalCount, setTotalCount] = useState(props.totalCount)
  const [posts, setPosts] = useState(initialPosts)
  const [isFetching, setIsFetching] = useState(false)
  const [sortBy, setSortBy] = useState('createdAt')

  useEffect(() => {
    setPosts(initialPosts)
    setIsFetching(false)
  }, [initialPosts])

  const handleNextPage = () => {
    router.push(`?page=${+page + 1}&sort=${sortBy}`)
  }

  const handlePreviousPage = () => {
    router.push(`?page=${+page - 1}&sort=${sortBy}`)
  }

  let nextButtonActive = +page === Math.ceil(totalCount / 10) ? true : false
  let previousButtonActive = +page === 1 ? true : false

  const handleSortChange = async (sortBy: string) => {
    setIsFetching(true)
    const page = router.query?.page ? +router.query.page : 1
    fetch(`/api/posts?sortBy=${sortBy}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts)
        setIsFetching(false)
      })
  }

  return (
    <div className={classes.container}>
      <div className={classes.options}>
        <SearchBar setPosts={setPosts} setTotalCount={setTotalCount} />
        <SortInput
          handleSort={handleSortChange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      {isFetching ? (
        <div className={classes.loading}>
          <p>Loading...</p>
        </div>
      ) : (
        <ContentList items={posts} />
      )}
      <PaginationButtons
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        nextButtonActive={nextButtonActive}
        previousButtonActive={previousButtonActive}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    context.res.writeHead(302, { Location: '/login' })
    context.res.end()
    return { props: { posts: [], totalCount: 0 } }
  }
  const page = context.query?.page || 1
  const sort = context.query?.sort || 'createdAt'
  const skip = (+page - 1) * 10
  let { posts, totalCount } = await getAllPosts(10, skip, sort as string)
  posts = JSON.parse(JSON.stringify(posts))

  return {
    props: {
      posts,
      totalCount,
    },
  }
}

export default Home
