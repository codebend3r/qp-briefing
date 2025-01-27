/* eslint-disable no-case-declarations */
import prisma from "@lib/prisma"

export default async function handler(req, res) {
  const { method, body } = req
  const { id, uid } = req.query

  switch (method) {
    case "GET":
      const subscriptions = await prisma.subscription.findMany({
        where: {
          ownerId: parseInt(uid, 10),
        },
        include: {
          users: true,
          permissions: true,
        },
      })

      res.status(200).json(subscriptions)
      break
    case "PUT":
      const { role } = body

      if (!uid) {
        res.status(400).end()
      }
      if (!id) {
        res.status(400).end()
      }
      if (!role) {
        res.status(400).end()
      }
      try {
        const sub = await prisma.usersOnSubscriptions.update({
          where: {
            userId_subscriptionId: {
              userId: parseInt(uid),
              subscriptionId: parseInt(id),
            },
          },
          data: {
            role,
          },
        })
        res.status(200).json(sub)
      } catch (error) {
        res.status(400).end(error)
      }
      break
    case "DELETE":
      if (!uid) {
        res.status(400).end()
      }
      if (!id) {
        res.status(400).end()
      }
      try {
        const subscription = await prisma.usersOnSubscriptions.delete({
          where: {
            userId_subscriptionId: {
              userId: parseInt(uid),
              subscriptionId: parseInt(id),
            },
          },
        })
        res.status(202).json(subscription)
      } catch (error) {
        res.status(400).end(error)
      }

      break
    default:
      res.status(405).end()
  }
}
