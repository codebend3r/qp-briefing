"use client"

import styled from "@emotion/styled"
import { signIn, signOut, useSession } from "next-auth/react"

import { colors } from "@styles/colors"

export const LoginButtonStyled = styled.button`
  display: grid;
  width: auto;
  grid-template-columns: 1fr;
  justify-content: ${({ small = false }) => (small ? "start" : "center")};
  justify-items: ${({ small = false }) => (small ? "start" : "center")};
  color: ${colors.blue[900]};
  background-color: #ffffff;
  border: 1px solid ${colors.blue[900]};
  border-radius: 5px;
  padding: ${({ small = false }) => (small ? "12px 12px" : "12px 24px")};
  height: ${({ small = false }) => (small ? "3rem" : "auto")};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.blue[900]};
    border: 1px solid ${colors.blue[900]};
    color: #ffffff;
  }
`

export const LoginButton = ({ small = false }) => {
  const { data: session } = useSession()

  return !!session ? (
    <LoginButtonStyled onClick={signOut} small={small ? 1 : 0}>
      Sign out
    </LoginButtonStyled>
  ) : (
    <LoginButtonStyled onClick={signIn} small={small ? 1 : 0}>
      Sign in
    </LoginButtonStyled>
  )
}

export default LoginButton
