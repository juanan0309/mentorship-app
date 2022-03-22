import { Button } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

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
    <div>
      <Button
        variant="contained"
        color="primary"
        disabled={previousButtonActive}
        onClick={handlePreviousPage}
      >
        Previous
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={nextButtonActive}
        onClick={handleNextPage}
      >
        Next
      </Button>
    </div>
  )
}

export default PaginationButtons
