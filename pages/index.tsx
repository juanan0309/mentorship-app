import { useState, useEffect } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import ContentList from '../components/ContentList'
import SearchBar from '../components/SearchBar'
import { getAllPosts } from '../utils/api/dbUtils'
import styles from '../styles/Home.module.css'
import PaginationButtons from '../components/PaginationButtons'

type iProps = {
  posts: any
  totalCount: number
  children?: ReactNode
}

const Home: NextPage<iProps> = (props: iProps) => {
  const { totalCount } = props
  const router = useRouter()
  const page = router.query.page || 1
  const [posts, setPosts] = useState(props.posts)

  useEffect(() => {
    fetch(`/api/posts?page=${page}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts)
      }
    )
  }, [page])

  const handleNextPage = () => {
    router.push(`?page=${+page + 1}`)
  }

  const handlePreviousPage = () => {
    router.push(`?page=${+page - 1}`)
  }

  let nextButtonActive = +page === Math.ceil(totalCount / 10) ? true : false
  let previousButtonActive = +page === 1 ? true : false

  return (
    <div className={styles.container}>
      <SearchBar />
      <ContentList items={posts} />
      <PaginationButtons
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        nextButtonActive={nextButtonActive}
        previousButtonActive={previousButtonActive}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let { posts, totalCount } = await getAllPosts()
  posts = JSON.parse(JSON.stringify(posts))

  return {
    props: {
      posts,
      totalCount,
    },
    revalidate: 60,
  }
}

export default Home
