import Link from 'next/link'
import { Card, CardActionArea, CardContent, Grid } from '@mui/material'
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
    <Grid item className={classes.container}>
      <Card sx={{ minWidth: 275, height: '100%' }} data-testid="card-element">
        <Link href={`/posts/${_id}`} passHref>
          <CardActionArea>
            <CardContent>
              <div className={classes['card-title__container']}>
                <h2>{title}</h2>
              </div>
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
    </Grid>
  )
}

export default ItemCard
