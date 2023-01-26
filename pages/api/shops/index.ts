import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions)

  /** Get all shops**/

  if (req.method === 'POST') {
    if (session) {
      const shop = await prisma.user.update({
        where: {
          id: session.user.id
        },
        data: {
          shops: {
            create: {
              name: req.body.name,
              email: req.body.email,
              telephone: req.body.telephone,
              address: req.body.address,
              image: req.body.image,
              bio: req.body.bio
            }
          }
        }
      })
      res.status(201).json(shop)
    }

    else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
  else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}