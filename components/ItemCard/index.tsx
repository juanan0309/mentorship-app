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
  client?: string
  ownerId: string
}

const ItemCard = (props: ItemCardProps) => {
  const { title, _id, likes, client, ownerId } = props
  return (
    <Grid item className={classes.container}>
      <Card sx={{ minWidth: 275, height: '100%' }} data-testid='card-element'>
        <Link href={`/posts/${_id}`} passHref>
          <CardActionArea style={{height: '100%'}}>
            <CardContent style={{height: '100%'}}>
              <div className={classes['card-content__container']}>
                <div className={classes['card-title__container']}>
                  <h2>{title}</h2>
                </div>
                <div className={classes['card-text__container']}>
                  <p>By: {ownerId}</p>
                </div>
                <div className={classes['card-text__container']}>
                  <p>Client: {client}</p>
                </div>
                <div className={classes['card-likes__container']}>
                  <p>{likes.count} </p>
                  <span>
                    <ThumbUpIcon />
                  </span>
                </div>
              </div>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </Grid>
  )
}

export default ItemCard
