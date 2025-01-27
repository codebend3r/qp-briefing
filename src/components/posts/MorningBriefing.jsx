import Image from "next/image"
import Link from "next/link"

import styled from "@emotion/styled"
import dayjs from "dayjs"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

const Section = styled.section`
  display: grid;
  grid-template-columns: 100px 1fr;
  background: ${colors.slate[100]};
  border-top: 4px solid ${colors.sky[500]};
  border-radius: ${theme.borderRadius.sm};
  overflow: hidden;
  padding: ${theme.spacing.sm};
  box-shadow: ${theme.shadow.card};
  align-items: center;
  gap: ${theme.spacing.sm};
  margin: 0;
`

const MorningBriefTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  color: ${colors.blue[900]};
`

const DisplayDate = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`

const ButtonLabel = styled.p`
  background-color: ${colors.sky[500]};
  color: ${colors.slate[100]};
  padding: 5px 10px;
  border-radius: ${theme.borderRadius.sm};
  border: none;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.sky[600]};
  }
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  justify-items: start;
`

export const MorningBriefing = ({ morningBriefing }) => {
  const displayDate = dayjs(morningBriefing.updatedAt).format("dddd, MMMM D, YYYY")

  return (
    <Section>
      <Image src="/logos/MorningBriefing.svg" alt="" width={100} height={100} />
      <Content>
        <Link href={`/news/${morningBriefing.slug.current}`}>
          <MorningBriefTitle>Read today&apos;s Morning Briefing</MorningBriefTitle>
        </Link>
        <DisplayDate>{displayDate}</DisplayDate>
        <Link href={`/news/${morningBriefing.slug.current}`}>
          <ButtonLabel>Read now</ButtonLabel>
        </Link>
      </Content>
    </Section>
  )
}
