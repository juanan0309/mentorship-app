import { Dispatch, SetStateAction, useState, KeyboardEvent } from 'react'
import { TextField, Button } from '@mui/material'

import classes from './SearchBar.module.css'
import { PostTypes } from "../../utils/types"

type searchBarProps = {
  setPosts: Dispatch<PostTypes[]>
  setTotalCount: Dispatch<SetStateAction<number>>
}

const SearchBar = ({setPosts, setTotalCount}: searchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchTermChange = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') { 
      handleSearch()
      return
    }
  }

  const handleSearch = () => {
    fetch(`/api/posts/search?q=${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      setPosts(data.posts)
      setTotalCount(data.totalCount)
    })
  }
  return (
    <div className={classes.container}>
      <TextField
        id="outlined-basic"
        label="Search Interview"
        variant="outlined"
        value={searchTerm}
        onKeyPress={handleSearchTermChange}
        onChange={e => setSearchTerm(e.target.value)}
        className={classes['search-input']}
      />    
      <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
    </div>
  )
}

export default SearchBar
