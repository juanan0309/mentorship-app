import { connectDatabase, getAllPosts, updatePost } from '../../../utils/api/dbUtils'
import { NextApiRequest, NextApiResponse } from 'next'
import { Post } from '../../../server/models/Post'
import { validateString } from '../../../utils/utilFunctions'
import { update } from "cypress/types/lodash"

async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    const {postId:id, ...values} = req.body
    const post = await updatePost(id, values)

    res.status(200).json({ post })
  }
  client.disconnect()
}

export default handler
