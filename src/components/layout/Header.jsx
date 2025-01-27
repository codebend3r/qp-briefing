import Image from "next/image"
import Link from "next/link"

import styled from "@emotion/styled"
import { useSession } from "next-auth/react"
import { FaUser } from "react-icons/fa"

import { HamburgerMenu } from "@components/buttons/Hamburger"
import LoginButton from "@components/buttons/LoginButton"
import SubscribeButton from "@components/buttons/SubscribeButton"
import styling from "@components/layout/header.module.scss"
import { AccountLink } from "@components/styled-components"

import { useMenuState } from "@hooks/useMenuState"

import { urlFor } from "@lib/sanity/sanity"

import { theme } from "@styles/theme"

const HeaderContainer = styled.header`
  padding-top: 0;
  text-align: center;
  box-shadow: ${theme.shadow.sm};
  z-index: 100;
  position: sticky;
  background: white;
  top: ${(props) => (props.open ? `${props.scrollY}px` : "0")};
`

export const Header = ({ data }) => {
  const { data: session } = useSession()
  const open = useMenuState((state) => state.open)
  const scrollY = useMenuState((state) => state.scrollY)

  return (
    <>
      <HeaderContainer open={open} scrollY={scrollY}>
        <HamburgerMenu />
        <div className={styling["top-shtuff"]}>
          <div></div>
          <div className={styling["branding"]}>
            <div className={styling["logo"]}>
              {data?.logo && (
                <Link href="/">
                  <Image src={urlFor(data?.logo).url()} alt="QP Briefing" width={250} height={50} />
                </Link>
              )}
            </div>
          </div>
          <div className={styling["login"]}>
            <div className={styling["button-grid"]}>
              <LoginButton />
              <SubscribeButton />
              {!!session && (
                <AccountLink href="/account">
                  <FaUser />
                </AccountLink>
              )}
            </div>
          </div>
        </div>
      </HeaderContainer>
    </>
  )
}
