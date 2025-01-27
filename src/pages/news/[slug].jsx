import { useEffect } from "react"

import Head from "next/head"
import { useRouter } from "next/router"

import { toPlainText } from "@portabletext/react"
import { useMutation } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { groq } from "next-sanity"

import MobileMenu from "@components/MobileMenu"
import Layout from "@components/layout"
import { Footer } from "@components/layout/Footer"
import { Header } from "@components/layout/Header"
import Nav from "@components/layout/Nav"
import { Preloader } from "@components/loader/Preloader"
import { ArticleView } from "@components/posts/ArticleView"
import { Overlay, PageContainer, ViewPortContainer } from "@components/styled-components"

import { useMenuState } from "@hooks/useMenuState"

import { checkFreeAccess } from "@lib/auth/utils"
import { urlFor } from "@lib/sanity/sanity"
import { getClient } from "@lib/sanity/sanity.server"
import { filterDataToSingleItem } from "@lib/sanity/utils"

const useCheckFreeAccessMutation = () => {
  return useMutation({
    mutationFn: ({ description, referrer }) =>
      checkFreeAccess({
        type: "articleview",
        description,
        referrer,
      }),
  })
}

export const Article = ({ data = {}, publication = {}, preview = {} }) => {
  const post = filterDataToSingleItem(data.post, preview)
  const { data: session } = useSession()
  const router = useRouter()

  const open = useMenuState((state) => state.open)
  const scrollY = useMenuState((state) => state.scrollY)
  const pageWidth = useMenuState((state) => state.pageWidth)
  const toggleMenu = useMenuState((state) => state.toggleMenu)

  const { mutate: checkFreeAccess } = useCheckFreeAccessMutation()

  const onOverlayClick = () => {
    toggleMenu()
  }

  useEffect(() => {
    if (!!session && !!router) {
      checkFreeAccess({ description: router.asPath, referrer: document?.referrer ?? "" })
    }
  }, [session, router])

  if (!!post) {
    const postExcerpt = toPlainText(post?.excerpt ?? "N/A")

    return (
      <>
        <Head>
          <title>{post.title}</title>
          <link rel="icon" href={urlFor(publication.favicon).url()} />
          <meta name="description" content={postExcerpt} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={postExcerpt} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="QP Briefing" />
          <meta property="article:published_time" content={post.publishedAt} />
          <meta property="article:modified_time" content={post.updatedAt} />
          <meta property="article:section" content={post.category} />

          {!!post?.mainImage?.image ? (
            <meta property="og:image" content={urlFor(post.mainImage.image).url()} />
          ) : (
            <meta property="og:image" content={urlFor(publication.image).url()} />
          )}
          <meta property="og:url" content={`https://qpbriefing.com/news/${post.slug}`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@QPbriefing" />
          <meta name="twitter:creator" content="@QPbriefing" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={postExcerpt} />
          {!!post?.mainImage?.image ? (
            <meta name="twitter:image" content={urlFor(post.mainImage.image).url()} />
          ) : (
            <meta name="twitter:image" content={urlFor(publication.image).url()} />
          )}
        </Head>

        <MobileMenu />

        <ViewPortContainer open={open} scrollY={scrollY} pageWidth={pageWidth}>
          <Header data={publication}>
            <Nav data={publication?.mainMenu} />
          </Header>

          <main>
            <ArticleView post={post} />
          </main>

          <Footer data={data} />
        </ViewPortContainer>
        <Overlay open={open} onClick={onOverlayClick} pageWidth={pageWidth} />
      </>
    )
  } else {
    return <Preloader />
  }
}

Article.getLayout = (page) => {
  return (
    <Layout data={page.props.publication}>
      <PageContainer>{page}</PageContainer>
    </Layout>
  )
}

export default Article

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `*[_type == "post" && references('452fd28b-edde-4887-9ff4-d4c7400f9978') && !(_id in path("drafts.**"))]{
      slug,
    }`,
  )

  // * for some reason the some paths don't have a slug.current value
  const filteredPaths = paths.filter((post) => !!post?.slug?.current)

  return {
    paths: filteredPaths.map((post) => ({ params: { slug: post?.slug?.current } })),
    fallback: true,
  }
}

export async function getStaticProps({ params, preview = false }) {
  const query = groq`*[_type == "post" && references('452fd28b-edde-4887-9ff4-d4c7400f9978') && slug.current == $slug && !(_id in path("drafts.**"))]{
    _id,
    "authors": authors[]->,
    body,
    "category": category->title,
    excerpt,
    mainImage,
    publishedAt,
    slug,
    title,
    updatedAt,
    free
  }`

  const publication = await getClient().fetch(
    `*[_id == "452fd28b-edde-4887-9ff4-d4c7400f9978"]
    {
      title,
      logo,
      logoDark,
      description,
      image,
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
    }`,
  )

  const queryParams = { slug: params.slug }

  const data = await getClient().fetch(query, queryParams)

  if (!data) {
    return {
      notFound: true,
    }
  }

  const post = filterDataToSingleItem(data, preview)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data: { post, query, queryParams },
      publication: publication[0],
      preview,
    },
    revalidate: 60,
  }
}
