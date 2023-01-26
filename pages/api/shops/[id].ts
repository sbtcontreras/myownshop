import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions)
  const id = parseInt(req.query.id as string)

  if (req.method === 'GET') {
    const shop = await prisma.shop.findUnique({
      where: {
        id: id,
      },
      include: {
        products: {
          select: {
            id: true,
            description: true,
            name: true,
            price: true,
            quantity: true,
            discountPercent: true,
            image: true
          }
        },
        user: {
          select: {
            id: true,
            email: true
          }
        },
      }
    })
    res.status(200).json(shop)
  }

  else if (req.method === 'PATCH') {
    if (session) {
      const shop = await prisma.user.update({
        where: {
          id: session.user.id
        },
        data: {
          shops: {
            update: {
              where: {
                id: id
              },
              data: req.body
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