import { getServerSession } from "next-auth/next"

import { authOptions } from "@api/auth/[...nextauth]"

import prisma from "@lib/prisma"

export default async function handler(req, res) {
  const session = await getServerSession({ req, res, authOptions })
  if (!session) {
    res.status(401).end()
  }
  const { method, body } = req
  const { id } = req.query

  if (method === "GET") {
    const subscriptions = await prisma.subscription.findMany({
      where: {
        ownerId: parseInt(id),
      },
      include: {
        users: true,
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
