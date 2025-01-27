import Head from "next/head"

import groq from "groq"

import MobileMenu from "@components/MobileMenu"
import Layout from "@components/layout"
import { Footer } from "@components/layout/Footer"
import { Header } from "@components/layout/Header"
import Nav from "@components/layout/Nav"
import { Preloader } from "@components/loader/Preloader"
import { SectionController } from "@components/sections/SectionController"
import { Overlay, PageContainer, ViewPortContainer } from "@components/styled-components"

import { useMenuState } from "@hooks/useMenuState"

import { urlFor } from "@lib/sanity/sanity"
import { getClient } from "@lib/sanity/sanity.server"
import { filterDataToSingleItem } from "@lib/sanity/utils"

const Page = ({ data, publication }) => {
  const open = useMenuState((state) => state.open)
  const scrollY = useMenuState((state) => state.scrollY)
  const pageWidth = useMenuState((state) => state.pageWidth)
  const toggleMenu = useMenuState((state) => state.toggleMenu)

  const onOverlayClick = () => {
    toggleMenu()
  }

  if (!!data) {
    return (
      <>
        <Head>
          <title>{data.page?.seo?.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href={urlFor(publication.favicon).url()} />
          <meta name="description" content={data.page?.seo?.description} />
          <meta property="og:title" content={data.page?.seo?.title} />
          <meta property="og:description" content={data.page?.seo?.description} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="QP Briefing" />
          {data.page?.seo?.image && <meta property="og:image" content={urlFor(data.page?.seo?.image).url()} />}
        </Head>

        <MobileMenu />

        <ViewPortContainer open={open} scrollY={scrollY} pageWidth={pageWidth}>
          <Header data={publication}>
            <Nav data={publication.mainMenu} />
          </Header>
          {data.page?.sections?.map((section, index) => {
            return <SectionController key={index} section={section} index={index} />
          })}
          <Footer data={data} />
          <Overlay open={open} onClick={onOverlayClick} pageWidth={pageWidth} />
        </ViewPortContainer>
      </>
    )
  } else {
    return <Preloader />
  }
}

Page.getLayout = (page) => {
  return (
    <Layout data={page.props.publication}>
      <PageContainer>{page}</PageContainer>
    </Layout>
  )
}

export default Page

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `*[_type == "marketingPage" && references('452fd28b-edde-4887-9ff4-d4c7400f9978') && !(_id in path("drafts.**"))]{
      slug,
    }`,
  )
  return {
    paths: paths.map((post) => ({ params: { slug: post.slug.current } })),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview = false }) {
  const query = groq`*[_type == "marketingPage" && references('452fd28b-edde-4887-9ff4-d4c7400f9978') && slug.current == $slug && !(_id in path("drafts.**"))]{
   slug,
    seo,
    "sections": sections[]->{...,
      "newsletter": newsletter->{...},
      "authors": authors[]->{
        _id,
        _type,
        name,
        title,
        bio,
        image,
      },
      "items": items[]->{...},
    },
  }`

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

  const queryParams = { slug: params.slug }
  const data = await getClient().fetch(query, queryParams)

  if (!data) {
    return {
      notFound: true,
    }
  }

  const page = filterDataToSingleItem(data, preview)

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data: { page, query, queryParams },
      publication,
      preview,
    },
    revalidate: 60,
  }
}
