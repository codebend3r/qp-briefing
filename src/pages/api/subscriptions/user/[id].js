import prisma from "@lib/prisma"

export default async function handler(req, res) {
  const { method, body } = req
  const { id } = req.query

  if (method === "GET") {
    const subscriptions = await prisma.subscription.findMany({
      where: {
        users: {
          some: {
            userId: { equals: parseInt(id) },
          },
        },
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
        permissions: true,
      },
    })
    res.status(200).json(subscriptions)
  } else if (method === "PUT") {
    const { data } = body
    if (!data) {
      res.status(400).end()
    }
    if (!id) {
      res.status(400).end()
    }
    const subscription = await prisma.subscription.update({
      where: {
        id,
      },
      data,
    })
    res.status(200).json(subscription)
  } else {
    res.status(405).end()
  }
}
