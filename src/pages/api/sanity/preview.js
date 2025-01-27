import { offerBySlugQuery, pageBySlugQuery, postBySlugQuery } from "@lib/sanity/queries"
import { previewClient } from "@lib/sanity/sanity.server"

function redirectToPreview(res, Location) {
  // Enable preview mode by setting the cookies
  res.setPreviewData({})

  // Redirect to a preview capable route
  res.writeHead(307, { Location })
  res.end()
}

export default async function preview(req, res) {
  const { secret, slug, type } = req.query

  if (!secret) {
    return res.status(401).json({ message: "No secret token" })
  }

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid secret" })
  }

  if (!slug) {
    return redirectToPreview(res, "/")
  }

  if (!type) {
    return res.status(401).json({ message: "Invalid page type" })
  }

  const page = await previewClient.fetch(pageBySlugQuery, { slug })
  const post = await previewClient.fetch(postBySlugQuery, { slug })
  const offer = await previewClient.fetch(offerBySlugQuery, { slug })

  // Check if the article with the given `slug` exists
  switch (type) {
    case "page":
      if (!page) {
        return res.status(401).json({ message: "Invalid slug" })
      }
      return redirectToPreview(res, `/page/${page.slug}`)
    case "post":
      if (!post) {
        return res.status(401).json({ message: "Invalid slug" })
      }
      return redirectToPreview(res, `/news/${post.slug}`)
    case "marketingPage":
      if (!offer) {
        return res.status(401).json({ message: "Invalid slug" })
      }
      return redirectToPreview(res, `/offers/${offer.slug}`)
    default:
      return res.status(401).json({ message: "Invalid slug" })
  }
}
