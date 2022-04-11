import { Dispatch, SetStateAction } from 'react'
import ContentList from '../ContentList'
import PaginationButtons from '../PaginationButtons'
import SearchBar from '../SearchBar'
import SortInput from '../SortInput'

import classes from './Home.module.css'

interface iProps {
  posts: unknown
  setPosts: Dispatch<unknown>
  setTotalCount: Dispatch<SetStateAction<number>>
  sortBy: string
  setSortBy: Dispatch<SetStateAction<string>>
  isFetching: boolean
  handleSortChange: (sortBy: string) => Promise<void>
  handleNextPage: () => void
  handlePreviousPage: () => void
  nextButtonActive: boolean
  previousButtonActive: boolean
}

const Home = (props: iProps) => {
  const {
    posts,
    setPosts,
    setTotalCount,
    sortBy,
    setSortBy,
    isFetching,
    handleSortChange,
    handleNextPage,
    handlePreviousPage,
    nextButtonActive,
    previousButtonActive,
  } = props
  return (
    <div className={classes.container}>
      <div className={classes.options}>
        <SearchBar setPosts={setPosts} setTotalCount={setTotalCount} />
        <SortInput
          handleSort={handleSortChange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      {isFetching ? (
        <div className={classes.loading}>
          <p>Loading...</p>
        </div>
      ) : (
        <ContentList items={posts} />
      )}
      <PaginationButtons
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        nextButtonActive={nextButtonActive}
        previousButtonActive={previousButtonActive}
      />
    </div>
  )
}

export default Home
