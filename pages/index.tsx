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

  return (
    <div className={styles.container}>
      <SearchBar />
      <ContentList items={posts}/>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let posts = await getAllPosts()
  posts = JSON.parse(JSON.stringify(posts))

  return {
    props: {
      posts: posts,
    },
    revalidate: 60,
  }
}

export default Home
