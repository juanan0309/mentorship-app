import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import CreateForm from '../../../components/CreateForm'
import { getPostById } from '../../../utils/api/dbUtils'
import { isString, validatePostOwner } from '../../../utils/utilFunctions'

type iProps = {
  post: any
}

const EditPage = ({ post }: iProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  return <CreateForm router={router} session={session} edit post={post} />
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (!session || !session.user || !session.user.email) {
    context.res.writeHead(302, { Location: `/login?redirect=${context.req.url}` })
    context.res.end()
    return { props: { posts: [], totalCount: 0 } }
  }
  
  const postId = context.params?.postId

  if (!postId) {
    context.res.writeHead(302, { Location: '/' })
    context.res.end()
    return { props: { posts: [], totalCount: 0 } }
  }

  if (!isString(postId)) {
    context.res.writeHead(302, { Location: '/' })
    context.res.end()
    return { props: { posts: [], totalCount: 0 } }
  }

  const validatePost = await validatePostOwner(postId, session.user?.email);
  if (!validatePost) {
    context.res.writeHead(302, { Location: '/' })
    context.res.end()
    return { props: { posts: [], totalCount: 0 } }
  }
  
  let post = await getPostById(postId)

  post = JSON.parse(JSON.stringify(post))

  return {
    props: {
      post: post,
    },
  }
}

export default EditPage
