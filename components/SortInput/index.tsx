import { TextField, MenuItem } from '@mui/material'
import React from 'react'

type iSort = {
  handleSort: (sortBy: string) => Promise<void>
  sortBy: string
  setSortBy: React.Dispatch<React.SetStateAction<string>>
}

const SortInput = ({ handleSort, sortBy, setSortBy } : iSort) => {
  const handleSortByChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setSortBy(event.target.value as string)
    handleSort(event.target.value as string)
  }

  const sortOptions = [
    {
      label: 'Most recent',
      value: 'createdAt',
    },
    {
      label: 'Most voted',
      value: 'likes',
    },
  ]

  return (
    <TextField
      select
      label="Sort By"
      value={sortBy}
      onChange={handleSortByChange}
      sx={{ width: '25ch' }}
    >
      {sortOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default SortInput
