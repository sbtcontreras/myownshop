import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (req.method === 'GET') {
    if (session) {
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id
        },
        include: {
          shops: {
            select: {
              id: true,
              name: true,
              image: true,
              bio: true,
              status: true
            }
          }
        },
      })
      res.status(200).json(user)
    }
    else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  }

  else if (req.method === 'PATCH') {
    if (session) {
      const user = await prisma.user.update({
        where: {
          id: session.user.id
        },
        data: req.body
      })
      res.status(200).json({ message: 'Success' })
    }
    else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
}