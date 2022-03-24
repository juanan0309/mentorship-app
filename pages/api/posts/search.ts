import { connectDatabase, getFilteredPosts } from '../../../utils/api/dbUtils'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const search = req.query.q as string
  const client = await connectDatabase()
  const response = await getFilteredPosts(search)

  res.status(200).json({ posts: response.posts, totalCount: response.totalCount })
  client.disconnect()
}

export default handler