import mongoose from 'mongoose'
import { Post } from '../../server/models/Post'

export async function connectDatabase() {
  const client = await mongoose.connect(
    process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb://localhost:27017/',
  )

  return client
}

export async function getAllPosts(sort?: string) {
  const client = await connectDatabase()

  const posts = await Post.find({}).lean()
  client.disconnect()
  return posts
}

export async function getPostById(id: string) {
  const client = await connectDatabase()

  const posts = await Post.findById(id).lean()
  client.disconnect()
  return posts
}