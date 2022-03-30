import Link from 'next/link'
import AddBoxIcon from '@mui/icons-material/AddBox'

const ButtonList = () => {
  return (
    <div>
      <Link href="/posts/create" passHref>
        <AddBoxIcon sx={{ fontSize: '46px' }} color="primary" />
      </Link>
    </div>
  )
}

export default ButtonList
