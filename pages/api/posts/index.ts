import {
  connectDatabase,
  getAllPosts,
  updatePost,
} from '../../../utils/api/dbUtils'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import { Post } from '../../../server/models/Post'
import { validateString } from '../../../utils/utilFunctions'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) {
    res.status(401).json({ message: 'Please login first' })
    return
  }
  const client = await connectDatabase()
  if (req.method === 'GET') {
    const { page, sortBy } = req.query
    const skip = (+page - 1) * 10
    const response = await getAllPosts(
      10,
      skip,
      validateString(sortBy, 'sortBy'),
    )

    res
      .status(200)
      .json({ posts: response.posts, totalCount: response.totalCount })
  }

  if (req.method === 'POST') {
    const values = req.body
    const post = await Post.create(values)

    res.status(201).json({ post })
  }

  if (req.method === 'PUT') {
    const { postId: id, ...values } = req.body
    const post = await updatePost(id, values)

    res.status(200).json({ post })
  }

  if (req.method === 'DELETE') {
    const { postId: id, userEmail } = req.body
    await Post.deleteOne({ _id: id, ownerId: userEmail })

    res.status(204).end()
  }

  client.disconnect()
}

export default handler
