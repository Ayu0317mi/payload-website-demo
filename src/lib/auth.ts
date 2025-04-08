import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('Sign in attempt:', { email: user.email, provider: account?.provider })
      
      if (account?.provider === 'google' && profile) {

        const payload = await getPayload({ config: configPromise })

        const existingUser = await payload.find({
          collection: 'clients',
          where: {
            email: {
              equals: user.email,
            },
          },
        })

        if (existingUser.docs.length === 0) {
          const newUser = await payload.create({
            collection: 'clients',
            data: {
              id: user.id,
              name: profile.name as string,
              email: profile.email as string,
            },
            user: {
              email: profile.email as string,
            },
          })

          if (newUser) {
            console.log('New user created successfully:', { id: newUser.id, email: newUser.email })
            user.id = String(newUser.id)
            return true
          } else {
            console.error('Failed to create new user from Google sign-in')
            return false
          }
        } else {
          user.id = existingUser.docs[0] ? String(existingUser.docs[0].id) : ''
        }
        return true
      }
      return true
    },
    async session({ session, token}) {
      console.log('Session created:', { user: session?.user, tokenId: token.sub })
      if (session?.user && token.sub) {
        session.user.email = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirecting after login:', { url, baseUrl })
      // Allows relative callback URLs
      //if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      //else if (new URL(url).origin === baseUrl) return url
      // Redirect to the base URL by default
      return `${baseUrl}/posts`
    },
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)

export const handlers = { GET: handler, POST: handler }