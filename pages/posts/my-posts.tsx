import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { getAllPostsByOwnerId } from '../../utils/api/dbUtils'
import ContentList from '../../components/ContentList'
import PaginationButtons from '../../components/PaginationButtons'

import classes from './MyPostsPage.module.css'
import { PostTypes } from "../../utils/types"

type iProps = {
  posts: PostTypes[]
  totalCount: number
  children?: ReactNode
}

const MyPostsPage: NextPage<iProps> = (props: iProps) => {
  const router = useRouter()
  const { posts, totalCount } = props
  const page = router?.query?.page || 1

  let nextButtonActive = +page === Math.ceil(totalCount / 12) ? true : false
  let previousButtonActive = +page === 1 ? true : false

  const handleNextPage = () => {
    router.push(`?page=${+page + 1}`)
  }

  const handlePreviousPage = () => {
    router.push(`?page=${+page - 1}`)
  }

  return (
    <div className={classes.container}>
      <ContentList items={posts} />
      {totalCount > 0 && (
        <PaginationButtons
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          nextButtonActive={nextButtonActive}
          previousButtonActive={previousButtonActive}
        />
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session || !session.user || !session.user.email) {
    context.res.writeHead(302, {
      Location: `/login?redirect=${context.req.url}`,
    })
    context.res.end()
    return { props: { posts: [], totalCount: 0 } }
  }

  const page = context.query?.page || 1
  const skip = (+page - 1) * 12
  let { posts, totalCount } = await getAllPostsByOwnerId(
    12,
    skip,
    session.user?.email,
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
