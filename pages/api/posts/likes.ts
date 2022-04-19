import { connectDatabase } from '../../../utils/api/dbUtils'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import { Post } from '../../../server/models/Post'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) {
    res.status(401).json({ message: 'Please login first' })
    return
  }
  const { postId, upvoted, userEmail } = req.body
  const client = await connectDatabase()

  const vote = !upvoted ? 1 : -1
  const updateUsers = !upvoted
    ? {
        $push: { 'likes.users': userEmail },
      }
    : {
        $pull: { 'likes.users': userEmail },
      }

  const post = await Post.findOneAndUpdate(
    { _id: postId },
    { $inc: { 'likes.count': vote }, ...updateUsers },
    { new: true },
  )

  res.status(200).json({ post })
  client.disconnect()
}

export default handler
