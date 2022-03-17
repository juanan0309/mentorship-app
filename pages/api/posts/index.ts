import { connectDatabase, getAllPosts } from '../../../utils/api/dbUtils'
import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await connectDatabase()
  const posts = await getAllPosts( 'posts')

  res.status(200).json({ posts: posts })
  client.disconnect()
}

export default handler
