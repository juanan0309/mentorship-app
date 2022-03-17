import { TextField, Button } from '@mui/material'

const SearchBar = () => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search Interview"
        variant="outlined"
      />    
      <Button variant="contained" color="primary">Search</Button>
    </>
  )
}

export default SearchBar
