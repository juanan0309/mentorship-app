import { Button } from '@mui/material'

import classes from './PaginationButtons.module.css'

type iProps = {
  handleNextPage: () => void
  handlePreviousPage: () => void
  nextButtonActive: boolean
  previousButtonActive: boolean
}

const PaginationButtons = (props: iProps) => {
  const {
    handleNextPage,
    handlePreviousPage,
    nextButtonActive,
    previousButtonActive,
  } = props

  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        color="primary"
        disabled={previousButtonActive}
        onClick={handlePreviousPage}
        style={{ width: '110px'}}
      >
        Previous
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={nextButtonActive}
        onClick={handleNextPage}
        style={{ width: '110px'}}
      >
        Next
      </Button>
    </div>
  )
}

export default PaginationButtons
