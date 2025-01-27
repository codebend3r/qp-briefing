import prisma from "@lib/prisma"

export default async function handler(req, res) {
  const { publication, domainName } = req.query

  const data = await prisma.allowedDomain.findMany({
    where: {
      publication: publication,
      domainName: {
        contains: domainName,
        mode: "insensitive",
      },
    },
  })

  switch (req.method) {
    case "GET":
      res.status(200).json(!!data.length)
      break
    // case 'DELETE':
    //   await prisma.allowedDomain.delete({ where: { domainName } })
    //   res.status(204).send()
    // case 'POST':
    //   if (domainName && clientName) {
    //     const data = await prisma.allowedDomain.create({
    //       data: {
    //         domainName,
    //         clientName,
    //         publication,
    //       },
    //     })
    //     res.status(201).send({ data })
    //   } else {
    //     res.status(400).send()
    //   }
    default:
      res.status(200).send()
      break
  }
}
