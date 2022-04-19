import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import { connectDatabase, getFilteredPosts } from '../../../utils/api/dbUtils'
import { validateString } from '../../../utils/utilFunctions'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) {
    res.status(401).json({ message: 'Please login first' })
    return
  }
  const search = validateString(req.query.q, 'query')
  const client = await connectDatabase()
  const response = await getFilteredPosts(search)

  res.status(200).json({ posts: response.posts, totalCount: response.totalCount })
  client.disconnect()
}

export default handler