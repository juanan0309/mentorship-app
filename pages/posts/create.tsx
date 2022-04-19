import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import CreateForm from '../../components/CreateForm'

const CreateInterviewPage = () => {
  const router = useRouter()
  const { data: session } = useSession()
  return (
    <CreateForm router={router} session={session} />
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (!session) {
    context.res.writeHead(302, { Location: `/login?redirect=${context.req.url}` })
    context.res.end()
    return { props: { posts: [], totalCount: 0 } }
  }

  return {
    props: {},
  }
}

export default CreateInterviewPage
