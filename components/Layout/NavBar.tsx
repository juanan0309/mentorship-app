import Image from 'next/image'
import Link from 'next/link'
import { Grid } from '@mui/material'
import ProfileWidget from './ProfileWidget'
import ButtonList from './ButtonList'
import wizeLogo from '../../public/images/wizeline-logo.png'

const NavBar = () => {
  return (
    <Grid container spacing={2} justifyContent="space-between">
      <Grid item xs={4} md={3}>
        <Link href="/" passHref>
          <a>
            <Image src={wizeLogo} alt="logo" width={80} height={54} />
          </a>
        </Link>
      </Grid>
      <Grid item xs={6} md={8} justifyContent="center">
        <ButtonList />
      </Grid>
      <Grid item xs={2} md={1}>
        <ProfileWidget />
      </Grid>
    </Grid>
  )
}

export default NavBar
