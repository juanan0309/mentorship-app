import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { validateString } from '../../../utils/utilFunctions'


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: validateString(process.env.GOOGLE_ID, 'GOOGLE_ID'),
      clientSecret: validateString(process.env.GOOGLE_SECRET, 'GOOGLE_SECRET'),
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
      maxAge: 60* 60 * 24 * 30
  },
  callbacks: {
    session: async ({ session }) => {
      return session
    },
  },
})
