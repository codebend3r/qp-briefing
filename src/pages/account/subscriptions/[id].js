import { useSession } from "next-auth/react"

import MobileMenu from "@components/MobileMenu"
import Layout from "@components/layout"
import { Footer } from "@components/layout/Footer"
import { Header } from "@components/layout/Header"
import Nav from "@components/layout/Nav"
import { Overlay, PageContainer, ViewPortContainer } from "@components/styled-components"

import { getClient } from "@lib/sanity/sanity.server"
import { capitalizeFirstLetter } from "@lib/utils"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

const SubscriptionPage = ({ data, subscription, publication }) => {
  const { data: session } = useSession()

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
        {subscription.users.some((user) => user.user.email === session?.user.email) && (
          <>
            <h1>Manage Users</h1>
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{subscription.name}</h2>
                <div className="status">Status: {capitalizeFirstLetter(subscription.status)}</div>
                <div className="licenses">
                  {subscription?.users?.length} of {subscription.quantity} licenses in use
                </div>
                <div className="status-bar">
                  <div className="status-bar--bar"></div>
                </div>
                <div className="add-user">
                  <h3>Add a user</h3>
                  <form>
                    <input type="email" placeholder="Email" />
                    <select>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                    <button type="submit" className="button">
                      Add user
                    </button>
                  </form>
                </div>
                <div className="users">
                  <h3>Users</h3>
                  <ul>
                    {subscription?.users?.map((user) => (
                      <li key={user.id}>
                        <div className="user">
                          <div className="details">
                            <div className="email">{user.user.email}</div>
                            <div className="role">{capitalizeFirstLetter(user.role)}</div>
                          </div>

                          <div className="remove">
                            <button>Remove</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <style jsx>{`
              .card {
                margin: 0 auto;
                max-width: 800px;
                background-color: ${colors.blue[50]};
                padding: ${theme.spacing.lg};
                border-top: 4px solid ${colors.sky[500]};
                border-radius: ${theme.borderRadius.sm};
                box-shadow: ${theme.shadow.card};
                margin-bottom: ${theme.spacing.lg};
              }
              h2 {
                margin-top: 0;
                color: ${colors.blue[900]};
                font-size: 1.5rem;
                font-weight: 800;
              }
              h3 {
                color: ${colors.blue[900]};
              }
              .status {
                padding: ${theme.spacing.xs} ${theme.spacing.sm};
                border-radius: 20px;
                color: #fff;
                font-weight: 600;
                line-height: 1;
                display: inline-block;
                background-color: ${subscription.status === "active" ? colors.sky[500] : "#f00"};
                margin-bottom: ${theme.spacing.sm};
              }
              .licenses {
                margin-top: 0.5rem;
                font-size: 0.8rem;
                color: ${colors.grey[600]};
              }
              .status-bar {
                height: 10px;
                background-color: #fff;
                margin-top: 0.5rem;
                border-radius: 2rem;
                overflow: hidden;
              }
              .status-bar--bar {
                height: 100%;
                width: ${(subscription?.users?.length / subscription.quantity) * 100}%;
                background-color: ${colors.sky[500]};
              }
              .add-user {
                margin-top: 1rem;
              }
              .add-user form {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-gap: ${theme.spacing.sm};
              }
              .add-user form input {
              }
              .add-user form select {
              }
              .add-user form button {
              }
              .users {
                margin-top: 1rem;
              }
              .users ul {
                list-style: none;
                padding: 0;
              }
              .users li {
                margin-top: ${theme.spacing.sm};
              }
              .users li .user {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #fff;
                padding: ${theme.spacing.xs} ${theme.spacing.sm};
                border-radius: ${theme.borderRadius.sm};
                border-bottom: 2px solid ${colors.sky[500]};
                transition: all 0.2s ease-in-out;
              }
              .users li .user:hover {
                background-color: ${colors.sky[100]};
              }
              .users li .user .details {
                display: flex;
                flex-direction: column;
              }
              .users li .user .email {
                font-weight: 600;
                margin-bottom: 0.5rem;
              }
              .users li .user .role {
                color: ${colors.grey[500]};
              }
              .users li .user .remove {
                font-size: 0.8rem;
              }
              .users li .user .remove button {
              }
            `}</style>
          </>
        )}
        <Footer data={data} />
        <Overlay open={open} onClick={onOverlayClick} pageWidth={pageWidth} />
      </ViewPortContainer>
    </>
  )
}

SubscriptionPage.getLayout = (page) => {
  return (
    <Layout data={page.props.publication}>
      <PageContainer>{page}</PageContainer>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const subscription = await data.json()

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
      subscription,
      publication,
    },
  }
}

export default SubscriptionPage
