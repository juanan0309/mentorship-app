import { connectDatabase, getAllPosts } from '../../../utils/api/dbUtils'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {page} = req.query
  const skip = (+page - 1) * 10
  const client = await connectDatabase()
  const response = await getAllPosts(10, skip)

  res.status(200).json({ posts: response.posts, totalCount: response.totalCount })
  client.disconnect()
}

export default handler
