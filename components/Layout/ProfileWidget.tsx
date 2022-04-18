import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import NoteIcon from '@mui/icons-material/Note'
import Logout from '@mui/icons-material/Logout'
import dummyImage from '../../public/images/dummy-user.webp'

import classes from './ProfileWidget.module.css'

const ProfileWidget = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (!session) {
    return (
      <div>
        <Link href={'/login'} passHref>
          <Image
            src={dummyImage}
            alt={'username'}
            width={70}
            height={70}
            onClick={handleClick}
          />
        </Link>
      </div>
    )
  }

  return (
    <div className={classes.widgetContainer}>
      <Tooltip title='menu'>
        <div>
          <Image
            src={session.user?.image || dummyImage}
            alt={session.user?.name || 'username'}
            width={70}
            height={70}
            onClick={handleClick}
          />
        </div>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
        <MenuItem onClick={() => router.push('/posts/my-posts')}>
          <ListItemIcon>
            <NoteIcon fontSize='small' />
          </ListItemIcon>
          My Posts
        </MenuItem>
      </Menu>
    </div>
  )
}

export default ProfileWidget
