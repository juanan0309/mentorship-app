import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { ReactNode, useState } from 'react'
import Swal from 'sweetalert2'
import { Button } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { getPostById } from '../../../utils/api/dbUtils'
import dynamic from 'next/dynamic'
import { isString } from '../../../utils/utilFunctions'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

import classes from './PostDetailPage.module.css'
import { PostTypes } from '../../../utils/types'

type iProps = {
  post: PostTypes
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

  const handleDeleteAction = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/posts`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postId,
            userEmail,
          }),
        })
          .then((res) => {
            if (res.status === 500) {
              Swal.fire({
                title: 'Error',
                text: 'Something went wrong, please try again later',
                icon: 'error',
              })
              return
            }
            Swal.fire({
              title: 'Done!',
              text: 'Post deleted successfully',
              icon: 'success',
              confirmButtonText: 'Return',
            }).then(() => router.push(`/`))
          })
          .catch(() => {
            Swal.fire({
              title: 'Oops!',
              text: 'There was an error with your post, please try again',
              icon: 'error',
              confirmButtonText: 'Return',
            })
          })
      }
    })
  }

  return (
    <div className={classes.container}>
      <div className={classes['header-container']}>
        <h1>{post.title}</h1>
        <div className={classes['text-container']}>
          <p className={classes.strong}>
            By: <span className={classes.light}>{post.ownerId}</span>
          </p>
          <p className={classes.strong}>
            Client: <span className={classes.light}>{post.client}</span>
          </p>
        </div>
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
        <div className={classes['action-buttons']}>
          <Button
            variant='contained'
            color='primary'
            data-testid='edit-button'
            onClick={() => router.push(`/posts/${postId}/edit`)}
            style={{ marginTop: '1rem', width: '100px', alignSelf: 'center' }}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            color='primary'
            data-testid='delete-button'
            onClick={handleDeleteAction}
            style={{ marginTop: '1rem', width: '100px', alignSelf: 'center' }}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    context.res.writeHead(302, {
      Location: `/login?redirect=${context.req.url}`,
    })
    context.res.end()
    return { props: { posts: [], totalCount: 0 } }
  }

  const postId = context.params?.postId

  if (!postId) {
    context.res.writeHead(302, {
      Location: `/login?redirect=${context.req.url}`,
    })
    context.res.end()
    return { props: { posts: [], totalCount: 0 } }
  }

  if (!isString(postId)) {
    context.res.writeHead(302, {
      Location: `/login?redirect=${context.req.url}`,
    })
    context.res.end()
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
