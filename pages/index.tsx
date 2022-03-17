import { NextPage, GetStaticProps } from 'next'
import { ReactNode } from 'react'
import ContentList from '../components/ContentList'
import SearchBar from '../components/SearchBar'
import { getAllPosts } from '../utils/api/dbUtils'
import styles from '../styles/Home.module.css'

type iProps = {
  posts: any
  children?: ReactNode
}

const Home: NextPage<iProps> = (props: iProps) => {
  const { posts } = props
  console.log(posts)

  return (
    <div className={styles.container}>
      <SearchBar />
      <ContentList />
      <div>Hello World</div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let posts = await getAllPosts()
  console.log(typeof posts[0].createdAt, posts)
  posts = JSON.parse(JSON.stringify(posts))
  console.log(typeof posts[0].createdAt,posts)

  return {
    props: {
      posts: posts,
    },
    revalidate: 60,
  }
}

export default Home
