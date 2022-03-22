import { useContext } from 'react'
import ItemCard from '../ItemCard'

type iContentListProps = {
  items: any
}

const ContentList = ({ items }: iContentListProps) => {
  return (
    <>
      {items.map((item: any) => (
        <ItemCard key={item._id} {...item} />
      ))}
    </>
  )
}

export default ContentList
