import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { getAllPostsByOwnerId } from '../../utils/api/dbUtils'
import ContentList from '../../components/ContentList'

type iProps = {
    posts: unknown
    totalCount: number
    children?: ReactNode
  }

const MyPostsPage: NextPage<iProps> = (props: iProps) => {
    const router = useRouter()
    const {posts} = props;
    const page = router?.query?.page || 1

    const handleNextPage = () => {
        router.push(`?page=${+page + 1}`)
      }
    
      const handlePreviousPage = () => {
        router.push(`?page=${+page - 1}`)
      }

  return (
    <ContentList items={posts} />
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session || !session.user || !session.user.email) {
      context.res.writeHead(302, { Location: '/login' })
      context.res.end()
      return { props: { posts: [], totalCount: 0 } }
    }

    const page = context.query?.page || 1
    const skip = (+page - 1) * 10
    let { posts, totalCount } = await getAllPostsByOwnerId(
      10,
      skip,
      session.user?.email
    )
    posts = JSON.parse(JSON.stringify(posts))
  
    return {
      props: {
        posts,
        totalCount,
      },
    }
  }

export default MyPostsPage