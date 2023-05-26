import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { isValidSignature } from '@/utils/signature'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Web3 Credentials',
      credentials: {
        address: {
          label: 'Address',
          type: 'text'
        },
        message: {
          label: 'Message',
          type: 'text'
        },
        signature: {
          label: 'Signature',
          type: 'text'
        },
      },
      async authorize(credentials) {
        await cryptoWaitReady()
        const isValid = isValidSignature(
          credentials?.message!,
          credentials?.signature!,
          credentials?.address!,
        )

        return isValid ? { id: credentials?.address!, isValid } : null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token?.sub
      }

      return session
    },
    async jwt({ token, user }) {
      return token
    }
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
}

export default NextAuth(authOptions)
