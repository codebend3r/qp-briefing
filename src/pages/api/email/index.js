import client from "@sendgrid/client"

client.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
  const { email } = req.query
  const { listId } = req.body
  switch (req.method) {
    case "GET":
      if (!email) {
        res.status(400).end()
      }
      try {
        const request = {
          method: "POST",
          url: "/v3/marketing/contacts/search/emails",
          body: {
            emails: [email],
          },
        }
        const [response] = await client.request(request)
        res.status(200).json(response.body.result[email].contact.list_ids)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
      break
    case "POST":
      if (!email) {
        res.status(400).end()
      }
      if (!listId) {
        res.status(400).end()
      }
      try {
        const request = {
          method: "PUT",
          url: `/v3/marketing/contacts`,
          body: {
            list_ids: [listId],
            contacts: [
              {
                email,
              },
            ],
          },
        }
        const [response] = await client.request(request)
        res.status(200).json(response.body)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
      break
    case "DELETE":
      if (!email) {
        res.status(400).end()
      }
      if (!listId) {
        res.status(400).end()
      }
      try {
        const userRequest = {
          method: "POST",
          url: "/v3/marketing/contacts/search/emails",
          body: {
            emails: [email],
          },
        }
        const [userResponse] = await client.request(userRequest)
        const request = {
          method: "DELETE",
          url: `/v3/marketing/lists/${listId}/contacts`,
          qs: {
            contact_ids: userResponse.body.result[email].contact.id,
          },
        }
        const [response] = await client.request(request)
        res.status(200).json(response.body)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
      break
    default:
      res.status(405).end()
  }
}
