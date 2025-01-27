import Head from "next/head"

import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { API } from "@axios/axiosInstance"

import MobileMenu from "@components/MobileMenu"
import { Account } from "@components/accounts/Account"
import Layout from "@components/layout"
import { Footer } from "@components/layout/Footer"
import { Header } from "@components/layout/Header"
import Nav from "@components/layout/Nav"
import { Preloader } from "@components/loader/Preloader"
import { LoginPrompt } from "@components/paywall/LoginPrompt"
import { Overlay, PageContainer, ViewPortContainer } from "@components/styled-components"

import { useMenuState } from "@hooks/useMenuState"

import { urlFor } from "@lib/sanity/sanity"
import { getClient } from "@lib/sanity/sanity.server"

export const getSubscriptions = async (userId) => await API.get(`/api/subscriptions/user/${userId}`)

const AccountPage = ({ publication, data }) => {
  const { data: session } = useSession()

  const {
    data: subscriptionData,
    error: subscriptionError,
    status,
  } = useQuery({
    queryKey: ["subscriptions", session?.user?.id],
    queryFn: getSubscriptions.bind(null, session?.user?.id),
    select: ({ data }) => data,
    enabled: !!session?.user,
  })

  const AccountBase = () => {
    const open = useMenuState((state) => state.open)
    const scrollY = useMenuState((state) => state.scrollY)
    const pageWidth = useMenuState((state) => state.pageWidth)

    const onOverlayClick = () => {
      toggleMenu()
    }

    return (
      <>
        <MobileMenu />

        {!!subscriptionError ? (
          <p>Error retrieving stats</p>
        ) : (
          <ViewPortContainer open={open} scrollY={scrollY} pageWidth={pageWidth}>
            <Header data={publication}>
              <Nav data={publication.mainMenu} />
            </Header>
            <main>
              <Account subscriptions={subscriptionData} session={session} />
            </main>
            <Footer data={data} />
            <Overlay open={open} onClick={onOverlayClick} pageWidth={pageWidth} />
          </ViewPortContainer>
        )}
      </>
    )
  }

  const SubscriptionBase = () => (status === "pending" ? <Preloader /> : <AccountBase />)

  const BaseView = () => {
    return (
      <>
        <Head>
          <title>Account - QP Briefing</title>
          <meta name="description" content={publication.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href={urlFor(publication.favicon).url()} />
        </Head>
        {session === null ? <LoginPrompt /> : <SubscriptionBase />}
      </>
    )
  }

  return <BaseView />
}

AccountPage.getLayout = (page) => {
  return (
    <Layout data={page.props.publication}>
      <PageContainer>{page}</PageContainer>
    </Layout>
  )
}

export default AccountPage

export async function getStaticProps() {
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

  return {
    props: { publication },
  }
}
