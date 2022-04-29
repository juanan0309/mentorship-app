import {
  getAllPosts,
  updatePost,
  getPostById,
  deletePost,
  createPost
} from '../../../utils/api/dbUtils'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { validateString, validatePostOwner } from '../../../utils/utilFunctions'

type createPostValues = {
  ownerId: string
  title: string
  client: string
  content: string
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session || !session.user || !session.user.email) {
    res.status(401).json({ message: 'Please login first' })
    return
  }

  if (req.method === 'GET') {
    const { page, sortBy } = req.query
    const skip = (+page - 1) * 12
    const response = await getAllPosts(
      12,
      skip,
      validateString(sortBy, 'sortBy'),
    )

    res
      .status(200)
      .json({ posts: response.posts, totalCount: response.totalCount })
  }

  if (req.method === 'POST') {
    const values: createPostValues = req.body
    const post = await createPost(values)

    res.status(201).json({ post })
  }

  if (req.method === 'PUT') {
    const { postId: id, ...values } = req.body
    const validatePost = await validatePostOwner(id, session.user?.email);
    if (!validatePost) {
      res
        .status(403)
        .json({ error: 'You are not authorized to update this post' })
      return
    }
    const post = await updatePost(id, values)

    res.status(200).json({ post })
  }

  if (req.method === 'DELETE') {
    try {
      const { postId: id, userEmail } = req.body
      const validatePost = await validatePostOwner(id, session.user?.email);
      if (!validatePost) {
        res
        .status(403)
        .json({ error: 'You are not authorized to update this post' })
        return
      }
      await deletePost(id, userEmail)
      res.status(204).end()
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }
}

export default handler
