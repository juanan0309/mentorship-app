import { GetStaticPaths, GetStaticProps } from 'next'
import { ReactNode } from 'react'
import {getPostById, getAllPosts} from '../../utils/api/dbUtils'

type iProps = {
  post: any
  children?: ReactNode
}

const postDetailPage = ({post}: iProps) => {
  return (
    <div>{post.content}</div>
  )
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const postId = context.params.postId

  let post = await getPostById(postId)
  post = JSON.parse(JSON.stringify(post))

  return {
    props: {
      post: post,
    },
    revalidate: 60,
  }
  
}

export const getStaticPaths: GetStaticPaths = async() => {
  let {posts} = await getAllPosts()
  posts = JSON.parse(JSON.stringify(posts))
  const paths = posts.map((post: any) => {
    return {
      params: {
        postId: post._id,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export default postDetailPage