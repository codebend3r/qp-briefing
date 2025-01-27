import Head from "next/head"
import { useRouter } from "next/router"

import dayjs from "dayjs"

import MobileMenu from "@components/MobileMenu"
import { AdSlot } from "@components/ads/AdSlot"
import Layout from "@components/layout"
import { Footer } from "@components/layout/Footer"
import { Header } from "@components/layout/Header"
import Nav from "@components/layout/Nav"
import { FeaturedStory } from "@components/posts/FeaturedStory"
import { AboveTheFold } from "@components/sections/AboveTheFold"
import { PostGrid } from "@components/sections/PostGrid"
import { Overlay, PageContainer, ViewPortContainer } from "@components/styled-components"

import { useMenuState } from "@hooks/useMenuState"

import { getCurrentAds } from "@lib/ads"
import { urlFor } from "@lib/sanity/sanity"
import { getClient } from "@lib/sanity/sanity.server"

const sortByDate = (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)

export const Home = ({ posts, bigBoxAds, morningBriefing, billboardAds, leaderboardAds, publication, data }) => {
  const router = useRouter()
  const open = useMenuState((state) => state.open)
  const scrollY = useMenuState((state) => state.scrollY)
  const pageWidth = useMenuState((state) => state.pageWidth)
  const toggleMenu = useMenuState((state) => state.toggleMenu)

  const { debug = "false" } = router.query

  // * check if we're in debug mode
  // const isDebug = debug === "true"

  const onOverlayClick = () => {
    toggleMenu()
  }

  return (
    <>
      <Head>
        <title>QP Briefing</title>
        <meta name="description" content={publication.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={urlFor(publication.favicon).url()} />
      </Head>

      <MobileMenu />

      <ViewPortContainer open={open} scrollY={scrollY} pageWidth={pageWidth}>
        <Header data={publication}>
          <Nav data={publication.mainMenu} />
        </Header>
        <main>
          <AboveTheFold posts={posts.slice(0, 4)} morningBriefing={morningBriefing} bigBoxAds={bigBoxAds} />
          {!!billboardAds?.one?.length > 0 && <AdSlot ads={billboardAds.one} />}
          {!!leaderboardAds?.one?.length > 0 ? <AdSlot ads={leaderboardAds.one} /> : null}
          <PostGrid>
            {posts.slice(4, 7).map((post) => (
              <FeaturedStory key={post._id} data={post} />
            ))}
          </PostGrid>
          {!!billboardAds?.two?.length > 0 && <AdSlot ads={billboardAds.two} />}
          {!!leaderboardAds?.two?.length > 0 && <AdSlot ads={leaderboardAds.two} />}
          <PostGrid>
            {posts.slice(7, 16).map((post) => (
              <FeaturedStory key={post._id} data={post} />
            ))}
          </PostGrid>
        </main>
        <Footer data={data} />
      </ViewPortContainer>
      <Overlay open={open} onClick={onOverlayClick} pageWidth={pageWidth} />
    </>
  )
}

Home.getLayout = (page) => {
  return (
    <Layout data={page.props.publication}>
      <PageContainer>{page}</PageContainer>
    </Layout>
  )
}

export default Home

export async function getStaticProps({ preview = false }) {
  // * get 24 new posts
  const posts = await getClient().fetch(
    `*[_type == "post" && !(_id in path("drafts.**"))
      && references('452fd28b-edde-4887-9ff4-d4c7400f9978')
      && !(references('e97e03c5-c43c-4088-8bc8-577055275ab8'))
      && !(references('c3bc5345-5b8f-4648-9cd7-6f8bdd02a4a1'))] | order(publishedAt desc)
      {
        _id,
        authors,
        "category": category->title,
        excerpt,
        mainImage,
        publishedAt,
        slug,
        title,
        updatedAt,
      }[0...24]`,
  )

  const morningBriefing = await getClient().fetch(
    `*[_type == "post" && !(_id in path("drafts.**"))
      && references('452fd28b-edde-4887-9ff4-d4c7400f9978')
      && references('e97e03c5-c43c-4088-8bc8-577055275ab8')] | order(publishedAt desc)[0]
      {
        _id,
        authors,
        "category": category->title,
        excerpt,
        mainImage,
        publishedAt,
        slug,
        title,
        updatedAt,
    }`,
  )

  const publication = await getClient().fetch(
    `*[_id == "452fd28b-edde-4887-9ff4-d4c7400f9978"]
    {
      title,
      logo,
      logoDark,
      description,
      favicon,
      "mainMenu": mainMenu->{
        title,
        slug,
        "links": links[]->{
          title,
          url,
          parent,
          "children": *[_type == "menuLink" && references(^._id)]{
            title,
            url,
          }
        }
      }
    }[0]`,
  )

  // * get the last 2 sponsored posts no matter the date
  const sponsoredPostsRaw = await getClient().fetch(
    `*[_type == "post"  && !(_id in path("drafts.**"))
      && references('452fd28b-edde-4887-9ff4-d4c7400f9978')
      && references('c3bc5345-5b8f-4648-9cd7-6f8bdd02a4a1')] {
        _id,
        authors,
        "category": category->title,
        excerpt,
        mainImage,
        publishedAt,
        sponsoredEndDate,
        slug,
        title,
        updatedAt,
      } | order(publishedAt desc)[0...2]`,
  )

  const sponsoredPosts =
    sponsoredPostsRaw?.filter(({ publishedAt, sponsoredEndDate = null }, index) => {
      // * default to 7 days ago
      const today = dayjs()
      const defaultEndDate = dayjs(publishedAt).add(7, "day")

      // * sponsoredEndDate dayjs object
      const sponsoredEndDateDay = dayjs(sponsoredEndDate)

      // * check if the sponsoredEndDate is valid date
      const isValidEndDate = sponsoredEndDateDay.isValid()

      // * get the published date, should always be defined
      const publishedDate = dayjs(publishedAt)

      // * check if the today's date is before the sponsoredEndDate
      const isBeforeEndDate = today.isBefore(sponsoredEndDateDay)
      const isBeforeDefaultEndDate = today.isBefore(defaultEndDate)

      // console.log({
      //   index,
      //   today: today.format("YYYY-MM-DD"),
      //   publishedDate: publishedDate.format("YYYY-MM-DD"),
      //   sevenDayAfterPublishedDate: defaultEndDate.format("YYYY-MM-DD"),
      //   sponsoredEndDateDay: sponsoredEndDateDay.format("YYYY-MM-DD"),
      //   isValidEndDate,
      //   isBeforeEndDate,
      //   isBefore7DaysAgo: isBeforeDefaultEndDate,
      //   willShow: isValidEndDate ? isBeforeEndDate : isBeforeDefaultEndDate,
      // })

      return isValidEndDate ? isBeforeEndDate : isBeforeDefaultEndDate
    }) ?? []

  const [sponsoredArticle1 = null, sponsoredArticle2 = null] = sponsoredPosts ?? []

  const nonNullPosts = [...posts].filter(({ title }) => !!title)
  const sortedPosts = [...nonNullPosts].sort(sortByDate)

  // * featured article first
  // * (box with Morning Brief)
  // * article OR "sponsored" if tagged (locked is spot 48hr or 7 days), If no sponsored article tagged, regular article shows
  // * article OR "sponsored" if more than one tagged (locked in spot for 48hr or 7 days) If no sponsored article tagged, regular article shows
  // * then rest of articles
  const computedPosts = [
    ...sortedPosts.slice(0, 1),
    ...(!!sponsoredArticle1 ? [sponsoredArticle1] : []),
    ...(!!sponsoredArticle2 ? [sponsoredArticle2] : []),
    ...sortedPosts.slice(1),
  ]

  // console.log({
  //   computedPosts: computedPosts.map((post) => post.title),
  // })

  const bigBoxAds = await getCurrentAds({ format: "bigbox" })
  const billboardAds = await getCurrentAds({ format: "billboard" })
  const leaderboardAds = await getCurrentAds({ format: "leaderboard" })

  return {
    props: {
      posts: computedPosts,
      morningBriefing,
      publication,
      bigBoxAds,
      billboardAds,
      leaderboardAds,
      preview,
    },
    revalidate: 1,
  }
}
