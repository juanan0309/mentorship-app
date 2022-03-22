import Link from 'next/link'
import { Card, CardActionArea, CardContent } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

type ItemCardProps = {
  title: string
  _id: string
  likes: number
}

const ItemCard = (props: ItemCardProps) => {
  const { title, _id, likes } = props
  return (
    <Card sx={{ minWidth: 275 }}>
      <Link href={`/posts/${_id}`} passHref>
        <CardActionArea>
          <CardContent>
            <h2>{title}</h2>
            <div>

            <p>{likes} <span><ThumbUpIcon/></span></p>
            </div>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default ItemCard
