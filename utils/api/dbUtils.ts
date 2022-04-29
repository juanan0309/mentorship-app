import mongoose from 'mongoose'
import { Post } from '../../server/models/Post'

type createPostValues = {
  ownerId: string
  title: string
  client: string
  content: string
}

type valuesTypes = {
  _id?: string
  ownerId?: string
  title?: string
  client?: string
  content?: string
  likes?: {
    count: number
    users: string[]
  }
}

export async function connectDatabase() {
  const client = await mongoose.connect(
    process.env.NEXT_PUBLIC_MONGODB_URI || 'mongodb://localhost:27017/',
  )

  return client
}

export async function getAllPosts( limit: number = 12, skip: number = 0, sortBy: string = 'createdAt' ) {
  const client = await connectDatabase()

  const totalCount = await Post.count()
  
  const posts = limit !== 0 ? 
    await Post.find({}).sort([[sortBy, -1]]).limit(limit).skip(skip).lean() :
    await Post.find({}).sort([[sortBy, -1]]).lean()
  client.disconnect()
  return {posts, totalCount}
}

export async function getPostById(id: string) {
  const client = await connectDatabase()

  const posts = await Post.findById(id).lean()
  client.disconnect()
  return posts
}

export async function getFilteredPosts( search: string, limit: number = 12, skip: number = 0) {
  const client = await connectDatabase()

  const posts = await Post.find({
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { client: { $regex: search, $options: 'i' } },
    ],
  }).limit(limit).skip(skip).lean()

  const totalCount = await Post.count({
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ],
  })

  client.disconnect()
  return {posts, totalCount}
}

export async function getAllPostsByOwnerId( limit: number = 12, skip: number = 0, ownerId: string ) {
  const client = await connectDatabase()

  const totalCount = await Post.count({ownerId})
  
  const posts = limit !== 0 ? 
    await Post.find({ownerId}).limit(limit).skip(skip).lean() :
    await Post.find({ownerId}).lean()
  client.disconnect()
  return {posts, totalCount}
}

export async function updatePost(id: string, values: valuesTypes) {
  const client = await connectDatabase()

  const post = await Post.findByIdAndUpdate(id, values, { new: true })
  client.disconnect()
  return post
}

export async function deletePost(id: string, ownerId: string) {
  const client = await connectDatabase()

  await Post.deleteOne({ _id: id, ownerId })
  client.disconnect()
  return
}

export async function createPost(values: createPostValues) {
  const client = await connectDatabase()

  const post = await Post.create(values)
  client.disconnect()
  return post
}