import styled from "@emotion/styled"
import { signIn } from "next-auth/react"

import { LoginButtonStyled } from "@components/buttons/LoginButton"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

export const PaywallLockContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  justify-items: center;
  margin: 0 auto;
  max-width: 800px;
  padding: ${theme.spacing.sm};
  text-align: center;
  background: ${colors.slate[100]};
  border-top: 5px solid ${colors.sky[500]};
  border-radius: 5px;
  margin-bottom: 2.5rem;
  box-shadow: ${theme.shadow.card};
`

export const LockLoginButton = styled(LoginButtonStyled)`
  background-color: ${colors.blue[900]};
  border: 1px solid ${colors.blue[900]};
  width: 150px;
  color: #ffffff;

  &:hover {
    background-color: ${colors.sky[500]};
    border: 1px solid ${colors.sky[500]};
  }
`

export const Header = styled.h2`
  color: ${colors.blue[900]};
  font-weight: 800;
  margin: 0 0 1rem 0;
`

export const Paragraph = styled.p`
  color: ${colors.grey[800]};
  margin-bottom: ${theme.spacing.sm};
  max-width: 35ch;
  margin: ${theme.spacing.sm} auto;
  font-weight: 500;
`

export const Lock = () => (
  <PaywallLockContainer>
    <Header>Read this for free.</Header>
    <Paragraph>Log in below to get access to this article. One free per week.</Paragraph>
    <LockLoginButton onClick={signIn}>Sign in</LockLoginButton>
  </PaywallLockContainer>
)
