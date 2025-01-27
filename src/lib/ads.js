import { groq } from "next-sanity"

import { sanityClient } from "./sanity/sanity.server"

export const getCurrentAds = async ({ format }) => {
  const now = new Date()
  const today = now.toISOString().split("T")[0]
  const query = groq`*[_type == "adCampaign" && !(_id in path("drafts.**")) && references('452fd28b-edde-4887-9ff4-d4c7400f9978') && end_date >= $today && start_date <= $today]{
    _id,
    name,
    paid,
    "ads": *[_type == "ad" && format == $format && _id in ^.ads[]._ref && !(_id in path("drafts.**"))]{
      ...,
      "image": image.asset->url,
    }
  }`
  const params = { format, today }
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

  return {
    one: paidAdsOne?.length > 0 ? paidAdsOne : freeAdsOne,
    two: paidAdsTwo?.length > 0 ? paidAdsTwo : freeAdsTwo,
  }
}

export const getAdsForPostSlug = async ({ slug }) => {
  const query = groq`*[_type == 'ad' && post_slug == $slug && !(_id in path("drafts.**"))]{
      ...,
      "image": image.asset->url,
      }`
  const ads = await sanityClient.fetch(query, { slug })
  return ads
}

export const getAdCampaignsByClientId = async ({ id }) => {
  const query = groq`*[_type == "adCampaign" && client._ref == $id]{
    ...,
  }`

  const params = { id }
  const campaigns = await sanityClient.fetch(query, params)
  return campaigns
}

export const shuffleAds = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export const incrementAdViews = async ({ id }) => {
  try {
    await fetch(`/api/sanity/ads/track/view?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    // no-op
  }
}

export const incrementAdClicks = async ({ id }) => {
  try {
    await fetch(`/api/sanity/ads/track/click?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    // no-op
  }
}
