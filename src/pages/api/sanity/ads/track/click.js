import { sanityClient } from "@lib/sanity/sanity.server"

export default async function handler(req, res) {
  const { id } = req.query
  try {
    await sanityClient.patch(id).inc({ clicks: 1 }).commit()
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false })
  }
}
