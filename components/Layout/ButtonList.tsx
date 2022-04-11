import Link from 'next/link'
import AddBoxIcon from '@mui/icons-material/AddBox'

const ButtonList = () => {
  return (
    <div className="add-button">
      <Link href="/posts/create" passHref>
        <AddBoxIcon
          sx={{ fontSize: '46px', cursor: 'pointer' }}
          color="primary"
        />
      </Link>
    </div>
  )
}

export default ButtonList
