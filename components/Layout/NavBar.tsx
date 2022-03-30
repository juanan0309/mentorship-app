import Image from 'next/image'
import Link from 'next/link'
import { Grid } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import ProfileWidget from './ProfileWidget'
import ButtonList from './ButtonList'
import wizeLogo from '../../public/images/wizeline-logo.png'

import classes from './NavBar.module.css'

const navBarItemRemovePadding = {
  padding: 0,
}

const NavBar = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        className={classes.container}
      >
        <Grid
          item
          xs={3}
          md={3}
          className={classes.container__item}
          style={navBarItemRemovePadding}
        >
          <Link href="/" passHref>
            <a>
              <Image src={wizeLogo} alt="logo" width={80} height={54} />
            </a>
          </Link>
        </Grid>
        <Grid
          item
          xs={6}
          md={8}
          justifyContent="center"
          className={classes.container__item}
          style={navBarItemRemovePadding}
        >
          <ButtonList />
        </Grid>
        <Grid
          item
          xs={3}
          md={1}
          className={classes.container__item}
          style={navBarItemRemovePadding}
        >
          <ProfileWidget />
        </Grid>
      </Grid>
    </StyledEngineProvider>
  )
}

export default NavBar
