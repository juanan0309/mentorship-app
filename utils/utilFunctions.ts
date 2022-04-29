import { getPostById } from "./api/dbUtils"

export function validateString(x: unknown, name: string): string {
  if (typeof(x) === 'string') {
    return x
  }

  throw new Error('Expected string for ' + name + ' and got ' + typeof(x))
}

export function isString(x: unknown): x is string {
  return typeof x === 'string'
}

export async function validatePostOwner(postId: string, userEmail: string) {
  const post = await getPostById(postId)
  return userEmail === post.ownerId
}