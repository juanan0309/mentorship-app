import { connectDatabase, getFilteredPosts } from '../../../utils/api/dbUtils'
import { NextApiRequest, NextApiResponse } from 'next'
import { validateString } from '../../../utils/utilFunctions'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const search = validateString(req.query.q, 'query')
  const client = await connectDatabase()
  const response = await getFilteredPosts(search)

  res.status(200).json({ posts: response.posts, totalCount: response.totalCount })
  client.disconnect()
}

export default handler