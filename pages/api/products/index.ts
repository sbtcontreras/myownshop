import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const session = await unstable_getServerSession(req, res, authOptions)
   const id = parseInt(req.query.id as string)

   if (req.method === 'POST') {
      if (session) {
         const shop = await prisma.user.update({
            where: {
               id: session.user.id
            },
            data: {
               shops: {
                  update: {
                     where: {
                        id: req.body.shop.id
                     },
                     data: {
                        products: {
                           create: {
                              name: req.body.product.name,
                              price: req.body.product.price,
                              description: req.body.product.description,
                              quantity: req.body.product.quantity,
                              image: req.body.product.image,
                              discountPercent: req.body.product.discountPercent
                           }
                        }
                     }
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