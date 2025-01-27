import prisma from "@lib/prisma"

export default async function handler(req, res) {
  const { method, body } = req
  const { id } = req.query

  if (method === "GET") {
    // get subscription with users
    try {
      const subscription = await prisma.subscription.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          users: {
            select: {
              user: true,
              role: true,
            },
          },
        },
      })
      res.status(200).json(subscription)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  if (method === "POST") {
    // add user to subscription
    const newUser = await prisma.user.upsert({
      where: {
        email: body.email,
      },
      update: {},
      create: {
        email: body.email,
      },
    })
    const subscription = await prisma.usersOnSubscriptions.upsert({
      where: {
        userId_subscriptionId: {
          userId: newUser.id,
          subscriptionId: parseInt(id),
        },
      },
      update: {},
      create: {
        userId: newUser.id,
        subscriptionId: parseInt(id),
        role: body.role,
      },
    })
    res.status(200).json(subscription)
  }
  if (method === "DELETE") {
    // remove user from subscription
    const subscription = await prisma.usersOnSubscriptions.delete({
      where: {
        userId_subscriptionId: {
          userId: parseInt(uid),
          subscriptionId: parseInt(id),
        },
      },
    })
    res.status(200).json(subscription)
  }
  res.status(405).end()
}
