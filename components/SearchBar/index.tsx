import { Dispatch, SetStateAction, useState, KeyboardEvent } from 'react'
import { TextField, Button } from '@mui/material'

type searchBarProps = {
  setPosts: Dispatch<any>
  setTotalCount: Dispatch<SetStateAction<number>>
}

const SearchBar = ({setPosts, setTotalCount}: searchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchTermChange = (event: KeyboardEvent<HTMLInputElement>) => {
    console.log(event)
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
    <>
      <TextField
        id="outlined-basic"
        label="Search Interview"
        variant="outlined"
        value={searchTerm}
        onKeyPress={handleSearchTermChange}
        onChange={e => setSearchTerm(e.target.value)}
      />    
      <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
    </>
  )
}

export default SearchBar
