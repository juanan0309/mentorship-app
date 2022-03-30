import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { Button } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import Editor from 'rich-markdown-editor'
import { getPostById } from '../../utils/api/dbUtils'

import classes from './PostDetailPage.module.css'

type iProps = {
  post: any
  initialUpvoted: boolean
  children?: ReactNode
  userEmail: string
}

const PostDetailPage = ({ post, initialUpvoted, userEmail }: iProps) => {
  const [likes, setLikes] = useState(post.likes)
  const [upvoted, setUpvoted] = useState(initialUpvoted)
  const router = useRouter()
  const { postId } = router.query

  const handleLikesAction = () => {
    fetch(`/api/posts/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        upvoted,
        userEmail,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLikes(res.post.likes)
        setUpvoted(!upvoted)
      })
  }

  return (
    <div>
      <div className={classes.container}>
        <h1>{post.title}</h1>
        <div className={classes['likes-button']}>
          <p>{likes.count}</p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLikesAction}
          >
            {upvoted ? <ThumbDownIcon /> : <ThumbUpIcon />}
          </Button>
        </div>
      </div>
      <Editor defaultValue={post.content} readOnly={true}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (!session) {
    context.res.writeHead(302, { Location: '/login' })
    context.res.end()
    return { props: { posts: [], totalCount: 0 } }
  }

  const postId = context.params.postId

  let post = await getPostById(postId)
  post = JSON.parse(JSON.stringify(post))
  const initialUpvoted = post.likes.users.indexOf(session.user?.email) !== -1

  return {
    props: {
      post: post,
      initialUpvoted,
      userEmail: session.user?.email,
    },
  }
}

export default PostDetailPage
