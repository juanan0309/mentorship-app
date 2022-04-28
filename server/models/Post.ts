import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    likes: {
      count: { type: Number, default: 0 },
      users: { type: [String], default: [] },
    },
    ownerId: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
)

export const Post = mongoose.models?.Post || mongoose.model('Post', postSchema)
