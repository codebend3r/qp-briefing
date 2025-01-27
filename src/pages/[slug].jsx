import groq from "groq"

import MobileMenu from "@components/MobileMenu"
import Layout from "@components/layout"
import { Footer } from "@components/layout/Footer"
import { Header } from "@components/layout/Header"
import Nav from "@components/layout/Nav"
import { SectionController } from "@components/sections/SectionController"
import { Overlay, PageContainer, ViewPortContainer } from "@components/styled-components"

import { useMenuState } from "@hooks/useMenuState"

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

  return (
    <>
      <MobileMenu />
      <ViewPortContainer open={open} scrollY={scrollY} pageWidth={pageWidth}>
        <Header data={publication}>
          <Nav data={publication.mainMenu} />
        </Header>
        <main>
          {data.page?.sections?.map((section, index) => {
            return <SectionController key={index} section={section} index={index} />
          })}
        </main>
        <Footer data={data} />
        <Overlay open={open} onClick={onOverlayClick} pageWidth={pageWidth} />
      </ViewPortContainer>
    </>
  )
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
    `*[_type == "page" && references('452fd28b-edde-4887-9ff4-d4c7400f9978') && !(_id in path("drafts.**"))]{
      slug,
    }`,
  )
  return {
    paths: paths.map((post) => ({ params: { slug: post.slug.current } })),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview = false }) {
  const query = groq`*[_type == "page" && references('452fd28b-edde-4887-9ff4-d4c7400f9978') && slug.current == $slug && !(_id in path("drafts.**"))]{
    ...,
    "sections": sections[]{
      ...,
      "post": post->{...}
    }
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
  }`,
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
      publication: publication[0],
      preview,
    },
  }
}
