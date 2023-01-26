import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM  
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/profile/edit' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      session.user.email = user.email
      session.user.name = user.name
      session.user.lastName = user.lastName
      session.user.rut = user.rut
      session.user.telephone = user.telephone
      session.user.image = user.image
      session.user.bio = user.bio
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}
export default NextAuth(authOptions)