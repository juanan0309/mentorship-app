export type PostTypes = {
  _id: string
  title: string
  client: string
  content: string
  ownerId: string
  createdAt: string
  updatedAt: string
  likes: {
    count: number
    users: string[]
  }
}
