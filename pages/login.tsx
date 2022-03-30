import { signIn, signOut, useSession } from 'next-auth/react'

export default function Login() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <div>
      {!session && (
        <>
          Not signed in <br />
          <div id="my-signin2"></div>
          <button
            onClick={() =>
              signIn('google', {
                callbackUrl:
                  process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000',
              })
            }
          >
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user?.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  )
}
