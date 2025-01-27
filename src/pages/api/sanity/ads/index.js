import { groq } from "next-sanity"

import { sanityClient } from "@lib/sanity/sanity.server"

export default async function handler(req, res) {
  try {
    const now = new Date()
    const today = now.toISOString().split("T")[0]
    const query = groq`*[_type == "adCampaign" && !(_id in path("drafts.**")) && end_date >= $today && start_date <= $today]{
    _id,
    name,
    paid,
    "ads": *[_type == "ad" && _id in ^.ads[]._ref && !(_id in path("drafts.**"))]{
      ...,
      "image": image.asset->url,
    }
    }`
    const params = { today }
    const campaigns = await sanityClient.fetch(query, params)
    const paidAds = campaigns
      .filter((campaign) => campaign.paid)
      .map((c) => c.ads)
      .flat()

    const freeAds = campaigns
      .filter((c) => c.paid == false)
      .map((c) => c.ads)
      .flat()

    const paidAdsOne = paidAds.filter((ad) => !!ad.position_1 && !ad.post_slug)
    const paidAdsTwo = paidAds.filter((ad) => !!ad.position_2 && !ad.post_slug)

    const freeAdsOne = freeAds.filter((ad) => !!ad.position_1 && !ad.post_slug)
    const freeAdsTwo = freeAds.filter((ad) => !!ad.position_2 && !ad.post_slug)

    res.status(200).json({
      leaderboardAds: {
        one:
          paidAdsOne?.filter((ad) => ad.format === "leaderboard").length > 0
            ? paidAdsOne.filter((ad) => ad.format === "leaderboard")
            : freeAdsOne.filter((ad) => ad.format === "leaderboard"),
        two:
          paidAdsTwo?.filter((ad) => ad.format === "leaderboard").length > 0
            ? paidAdsTwo.filter((ad) => ad.format === "leaderboard")
            : freeAdsTwo.filter((ad) => ad.format === "leaderboard"),
      },
      bigBoxAds: {
        one:
          paidAdsOne?.filter((ad) => ad.format === "bigbox").length > 0
            ? paidAdsOne.filter((ad) => ad.format === "bigbox")
            : freeAdsOne.filter((ad) => ad.format === "bigbox"),
        two:
          paidAdsTwo?.filter((ad) => ad.format === "bigbox").length > 0
            ? paidAdsTwo.filter((ad) => ad.format === "bigbox")
            : freeAdsTwo.filter((ad) => ad.format === "bigbox"),
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
