"use client"

import Link from "next/link"

import styled from "@emotion/styled"
import { useSession } from "next-auth/react"

import { colors } from "@styles/colors"

export const SubscribeButtonStyled = styled(Link)`
  display: grid;
  width: auto;
  grid-template-columns: 1fr;
  justify-content: ${({ small = false }) => (small ? "start" : "center")};
  justify-items: ${({ small = false }) => (small ? "start" : "center")};
  color: #fff;
  background-color: ${colors.blue[900]};
  border: 1px solid ${colors.blue[900]};
  border-radius: 5px;
  padding: ${({ small = false }) => (small ? "12px 12px" : "12px 24px")};
  font-size: 1rem;
  font-weight: 600;
  height: auto;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.sky[500]};
    border: 1px solid ${colors.sky[500]};
  }
`

export const SubscribeButton = ({ small = false }) => {
  const { data: session } = useSession()

  return (
    !session && (
      <SubscribeButtonStyled href="/offers/subscription" small={small ? 1 : 0}>
        Subscribe
      </SubscribeButtonStyled>
    )
  )
}

export default SubscribeButton
