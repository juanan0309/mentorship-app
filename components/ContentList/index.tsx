import ItemCard from '../ItemCard'
import { Grid } from '@mui/material'
import { PostTypes } from "../../utils/types"

type iContentListProps = {
  items: PostTypes[]
}

const ContentList = ({ items }: iContentListProps) => {
  return items.length === 0 ? (
    <div>
      <h1>No items found</h1>
    </div>
  ) : (
    <Grid container spacing={2} justifyContent='center'>
      {items.map((item: PostTypes) => (
        <ItemCard key={item._id} {...item} />
      ))}
    </Grid>
  )
}

export default ContentList
