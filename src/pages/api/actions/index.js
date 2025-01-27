import { getServerSession } from "next-auth/next"

import { authOptions } from "@api/auth/[...nextauth]"

import prisma from "@lib/prisma"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  const { method } = req

  switch (method) {
    case "GET":
      try {
        if (!!session?.user) {
          const data = await prisma.actions.findMany({
            where: {
              publication: "qpb",
              userId: session?.user?.id,
              type: "articleview",
              created_at: {
                gte: new Date(new Date().setDate(new Date().getDate() - 7)),
              },
            },
          })
          const uniqueArticles = [...new Set(data.map((item) => item.description))]

          res.status(200).json(uniqueArticles.length > 1 ? false : true)
        } else {
          res.status(200).json(false)
        }
      } catch (error) {
        res.status(500).send()
      }
      break
    case "POST":
      try {
        const { type, description, referrer } = req.body

        const data = await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            actions: {
              create: [
                {
                  type,
                  description,
                  referrer,
                  publication: "qpb",
                },
              ],
            },
          },
        })
        res.status(200).json(data)
      } catch (error) {
        console.error(error)
        res.status(500).send()
      }
      break
  }
}
