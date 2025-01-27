import prisma from "@lib/prisma"

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const {
          _count: subscriptionCount,
          _sum: { quantity: subscriptionQuantity },
        } = await prisma.subscription.aggregate({
          _count: true,
          _sum: {
            quantity: true,
          },
        })
        const { _count: paidUserCount } = await prisma.usersOnSubscriptions.aggregate({
          _count: true,
        })
        const { _count: totalUserCount } = await prisma.user.aggregate({
          _count: true,
        })
        const { _count: paidUsersNeverLoggedIn } = await prisma.user.aggregate({
          where: {
            actions: {
              none: {},
            },
          },
          _count: true,
        })

        const statsResponse = {
          subscriptionCount,
          subscriptionQuantity,
          paidUserCount,
          totalUserCount,
          paidUsersNeverLoggedIn,
        }

        res.status(200).send(statsResponse)
      } catch (error) {
        res.status(500).send({
          error: error.message,
          message: "Could not retrieve stats",
        })
      }

    default:
      res.status(200).send()
      break
  }
}
