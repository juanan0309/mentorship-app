import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { isString } from "../utils/utilFunctions"

import classes from './LoginPage.module.css'

export default function Login() {
  const router = useRouter()
  if (!router.query.redirect || !isString(router.query.redirect)) {
    router.query.redirect = '/'
  }
  let callbackUrl = router.query.redirect
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <div className={classes.container}>
      <h1>Welcome to Wizeviews!</h1>
      {!session && (
        <>
          <div id='my-signin2'></div>
          <Button
            variant='contained'
            color='primary'
            className='signin-button'
            onClick={() =>
              signIn('google', {
                callbackUrl:
                  callbackUrl || 'http://localhost:3000',
              })
            }
          >
            Sign in
          </Button>
        </>
      )}
      {session && (
        <>
          <p>Signed in as {session.user?.name}</p>
          <Button variant='contained' color='primary' onClick={() => signOut()}>
            Sign out
          </Button>
        </>
      )}
    </div>
  )
}
