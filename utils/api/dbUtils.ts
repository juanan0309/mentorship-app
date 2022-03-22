import mongoose from 'mongoose'
import { Post } from '../../server/models/Post'

export async function connectDatabase() {
  const client = await mongoose.connect(
    process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb://localhost:27017/',
  )

  return client
}

export async function getAllPosts( limit: number = 10, skip: number = 0) {
  const client = await connectDatabase()

  const totalCount = await Post.count()
  const posts = await Post.find({}).limit(limit).skip(skip).lean()
  client.disconnect()
  return {posts, totalCount}
}

export async function getPostById(id: string) {
  const client = await connectDatabase()

  const posts = await Post.findById(id).lean()
  client.disconnect()
  return posts
}