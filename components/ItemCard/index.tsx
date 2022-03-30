import Link from 'next/link'
import { Card, CardActionArea, CardContent } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import classes from './ItemCard.module.css'

type ItemCardProps = {
  title: string
  _id: string
  likes: {
    count: number
    users: string[]
  }
}

const ItemCard = (props: ItemCardProps) => {
  const { title, _id, likes } = props
  return (
    <Card sx={{ minWidth: 275 }} className={classes.container}>
      <Link href={`/posts/${_id}`} passHref>
        <CardActionArea>
          <CardContent>
            <h2>{title}</h2>
            <p>{}</p>
            <div className={classes['likes-container']}>
              <p>{likes.count} </p>
              <span>
                <ThumbUpIcon />
              </span>
            </div>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default ItemCard
