import requestIp from "request-ip"
import { isIpInRange } from "utils/generalUtils"

import prisma from "@lib/prisma"

export default async function handler(req, res) {
  const ip = requestIp.getClientIp(req)

  if (!ip) return res.status(404).send()

  try {
    const data = await prisma.ipUser.findMany({
      where: {
        publication: "qpb",
      },
    })

    const isWithinRange = data.some(({ ipLow, ipHigh }) => isIpInRange({ ip, rangeStart: ipLow, rangeEnd: ipHigh }))

    if (isWithinRange) {
      return res.status(200).send(true)
    } else {
      return res.status(200).send(false)
    }
  } catch (error) {
    res.status(500).send()
  }
}
