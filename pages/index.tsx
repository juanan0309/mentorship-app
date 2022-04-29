/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { getAllPosts } from '../utils/api/dbUtils'
import Home from '../components/Home'
import { validateString } from '../utils/utilFunctions'
import { PostTypes } from "../utils/types"

type iProps = {
  posts: PostTypes[]
  totalCount: number
  children?: ReactNode
}

const HomePage: NextPage<iProps> = (props: iProps) => {
  const router = useRouter()
  const { posts: initialPosts } = props
  const page = router?.query?.page || 1
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

  let nextButtonActive = +page === Math.ceil(totalCount / 12) ? true : false
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
    <Home
      posts={posts}
      setPosts={setPosts}
      setTotalCount={setTotalCount}
      sortBy={sortBy}
      setSortBy={setSortBy}
      isFetching={isFetching}
      handleSortChange={handleSortChange}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      nextButtonActive={nextButtonActive}
      previousButtonActive={previousButtonActive}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    context.res.writeHead(302, { Location: `/login?redirect=${context.req.url}` })
    context.res.end()
    return { props: { posts: [], totalCount: 0 } }
  }
  const page = context.query?.page || 1
  const sort = context.query?.sort || 'createdAt'
  const skip = (+page - 1) * 12
  let { posts, totalCount } = await getAllPosts(
    12,
    skip,
    validateString(sort, 'sort'),
  )
  posts = JSON.parse(JSON.stringify(posts))

  return {
    props: {
      posts,
      totalCount,
    },
  }
}

export default HomePage
