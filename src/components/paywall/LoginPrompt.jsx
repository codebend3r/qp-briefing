import styled from "@emotion/styled"

import LoginButton from "@components/buttons/LoginButton"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

const Container = styled.div`
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

const Title = styled.h2`
  color: ${colors.blue[900]};
  font-weight: 800;
  margin: 0 0 1rem 0;
`

const Text = styled.p`
  color: ${colors.grey[800]};
  margin-bottom: ${theme.spacing.sm};
  max-width: 35ch;
  margin: ${theme.spacing.sm} auto;
  font-weight: 500;
`

export const LoginPrompt = () => (
  <Container>
    <Title>Please log in.</Title>
    <Text>You must be logged in to access this page.</Text>
    <LoginButton />
  </Container>
)
