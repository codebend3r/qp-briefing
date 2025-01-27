import styled from "@emotion/styled"

import Author from "@components/sections/Author"

import { theme } from "@styles/theme"

const Section = styled.section`
  background: ${({ background }) =>
    `linear-gradient(${background?.backgroundGradient.direction}, ${
      background.backgroundGradient.from.color
    }, ${background.backgroundGradient.to.color})`};
  background-color: ${({ background }) => background.backgroundColor.color};
  padding: 60px 0;
`

const Container = styled.div`
  padding: 0 ${theme.spacing.sm};
  max-width: 1140px;
  margin: 0 auto;
`

const Title = styled.h1`
  text-align: center;
  margin-top: 0px;
`

const Authors = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 50px;
  margin-top: 50px;
`

export default function FeaturedAuthors({ section }) {
  const { title, authors, background, authorBackground } = section

  return (
    <Section background={background}>
      <Container>
        <Title>{title}</Title>
        <Authors>
          {authors.map((author) => (
            <Author key={author._id} {...author} backgroundColor={authorBackground.backgroundColor.color} />
          ))}
        </Authors>
      </Container>
    </Section>
  )
}
