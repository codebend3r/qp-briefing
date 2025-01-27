import Head from "next/head"

import MobileMenu from "@components/MobileMenu"
import Layout from "@components/layout"
import { Footer } from "@components/layout/Footer"
import { Header } from "@components/layout/Header"
import Nav from "@components/layout/Nav"
import { Preloader } from "@components/loader/Preloader"
import ArchiveView from "@components/posts/ArchiveView"
import { Overlay, PageContainer, ViewPortContainer } from "@components/styled-components"

import { useMenuState } from "@hooks/useMenuState"

import { getQPBriefingPostWithSlug, getQPBriefingPosts } from "@lib/qpbWordpress"
import { getClient } from "@lib/sanity/sanity.server"

const ArchiveArticle = ({ post, publication, data }) => {
  const open = useMenuState((state) => state.open)
  const scrollY = useMenuState((state) => state.scrollY)
  const pageWidth = useMenuState((state) => state.pageWidth)
  const toggleMenu = useMenuState((state) => state.toggleMenu)

  const onOverlayClick = () => {
    toggleMenu()
  }

  if (!!post) {
    return (
      <>
        <Head>
          <title>{post.title}</title>
          {/* <link rel='icon' href={urlFor(publication.favicon).url()} /> */}
          <meta name="description" content={post.excerpt.replace(/<([^>]+)>/g, "")} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.excerpt.replace(/<([^>]+)>/g, "")} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="QP Briefing" />
          <meta property="article:published_time" content={post.date} />
          {/* <meta property='article:section' content={post.category} /> */}
          {post.featuredImage?.node?.sourceUrl && (
            <meta property="og:image" content={post.featuredImage.node.sourceUrl} />
          )}

          <meta property="og:url" content={`https://qpbriefing.com/news/${post.slug}`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@QPbriefing" />
          <meta name="twitter:creator" content="@QPbriefing" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.excerpt.replace(/<([^>]+)>/g, "")} />
          {post.featuredImage?.node?.sourceUrl && (
            <meta name="twitter:image" content={post.featuredImage.node.sourceUrl} />
          )}
        </Head>

        <MobileMenu />

        <ViewPortContainer open={open} scrollY={scrollY} pageWidth={pageWidth}>
          <Header data={publication}>
            <Nav data={publication.mainMenu} />
          </Header>
          <main>
            <ArchiveView post={post} />
          </main>
          <Footer data={data} />
          <Overlay open={open} onClick={onOverlayClick} pageWidth={pageWidth} />
        </ViewPortContainer>
      </>
    )
  } else {
    return <Preloader />
  }
}

ArchiveArticle.getLayout = (page) => {
  return (
    <Layout data={page.props.publication}>
      <PageContainer>{page}</PageContainer>
    </Layout>
  )
}
export default ArchiveArticle

export async function getStaticPaths() {
  const paths = await getQPBriefingPosts({ first: 1 })
  return {
    paths: paths.nodes.map((post) => ({ params: { slug: post.slug } })),
    fallback: true,
  }
}

export async function getStaticProps({ params, preview = false }) {
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

  const post = await getQPBriefingPostWithSlug({ postSlug: params.slug })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      publication: publication[0],
      preview,
    },
  }
}
