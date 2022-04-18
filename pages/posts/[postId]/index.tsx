import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { ReactNode, useState } from 'react'
import { Button } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { getPostById } from '../../../utils/api/dbUtils'
import dynamic from 'next/dynamic'
import { isString } from '../../../utils/utilFunctions'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

import classes from './PostDetailPage.module.css'

type iProps = {
  post: any
  initialUpvoted: boolean
  children?: ReactNode
  userEmail: string
}

const PostDetailPage = ({ post, initialUpvoted, userEmail }: iProps) => {
  const router = useRouter()
  const [likes, setLikes] = useState(post.likes)
  const [upvoted, setUpvoted] = useState(initialUpvoted)
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
    <div className={classes.container}>
      <div className={classes['header-container']}>
        <h1>{post.title}</h1>
        <div className={classes['likes-button']}>
          <p>{likes.count}</p>
          <Button
            variant='contained'
            color='primary'
            onClick={handleLikesAction}
            data-testid='likes-button'
          >
            {upvoted ? <ThumbDownIcon /> : <ThumbUpIcon />}
          </Button>
        </div>
      </div>
      <ReactQuill
        readOnly={true}
        defaultValue={post.content}
        className={classes.content}
        modules={{ toolbar: false }}
      />
      {post.ownerId === userEmail && (
            <Button
              variant='contained'
              color='primary'
              data-testid='edit-button'
              onClick={() => router.push(`/posts/${postId}/edit`)}
              style={{ marginTop: '1rem', width: '100px', alignSelf: 'center' }}
            >
              Edit
            </Button>
          )}
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

  const postId = context.params?.postId

  if (!postId) {
    context.res.writeHead(404, { Location: '/' })
    return { props: { posts: [], totalCount: 0 } }
  }

  if (!isString(postId)) {
    context.res.writeHead(404, { Location: '/' })
    return { props: { posts: [], totalCount: 0 } }
  }

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
