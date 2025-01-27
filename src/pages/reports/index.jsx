import Head from "next/head"

import styled from "@emotion/styled"
import { useQuery } from "@tanstack/react-query"

import { API } from "@axios/axiosInstance"

import Layout from "@components/layout"
import { Header } from "@components/layout/Header"
import Nav from "@components/layout/Nav"
import { Preloader } from "@components/loader/Preloader"

import { useAuthRedirect } from "@hooks/useAuthRedirect"

import { getClient } from "@lib/sanity/sanity.server"

export const getReport = async () => await API.get("/api/analytics/users")

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 1000px;
  align-content: start;
`

const StatsTable = styled.table`
  width: 100%;
  text-align: left;

  td,
  th {
    padding: 0 1rem;
  }

  tr:nth-child(even) {
    background-color: #eeeeee;
  }
`

const StatValue = styled.pre`
  font-size: 1.25rem;
`

const ReportsIndex = () => {
  const { isAuthorized } = useAuthRedirect()

  const {
    data: stats,
    error: statsError,
    status,
  } = useQuery({
    queryKey: ["report"],
    queryFn: getReport,
    select: ({ data }) => data,
  })

  const Stats = () => (
    <StatsContainer>
      <h1>Analytics for QP Briefing</h1>
      {!!statsError ? (
        <p>Error retrieving stats</p>
      ) : (
        <StatsTable>
          <thead>
            <tr>
              <th>Stat Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Subscription Count</td>
              <td>
                <StatValue>{stats.subscriptionCount}</StatValue>
              </td>
            </tr>
            <tr>
              <td>Subscription Quantity</td>
              <td>
                <StatValue>{stats.subscriptionQuantity}</StatValue>
              </td>
            </tr>
            <tr>
              <td>Paid User Count</td>
              <td>
                <StatValue>{stats.paidUserCount}</StatValue>
              </td>
            </tr>
            <tr>
              <td>Total User Count</td>
              <td>
                <StatValue>{stats.totalUserCount}</StatValue>
              </td>
            </tr>
            <tr>
              <td>Paid User Who Never Logged In</td>
              <td>
                <StatValue>{stats.paidUsersNeverLoggedIn}</StatValue>
              </td>
            </tr>
          </tbody>
        </StatsTable>
      )}
    </StatsContainer>
  )

  return status === "pending" ? (
    <Preloader />
  ) : (
    !!stats && isAuthorized === 2 && (
      <>
        <Stats />
      </>
    )
  )
}

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
    }`,
  )

  return {
    props: {
      publication: publication[0],
    },
  }
}

ReportsIndex.getLayout = (page) => (
  <>
    <Head>
      <title>Reports | QP Briefing</title>
    </Head>
    <Layout>
      <Header data={page.props.publication}>
        <Nav />
      </Header>
      {page}
    </Layout>
  </>
)

export default ReportsIndex
