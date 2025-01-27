import Image from "next/image"
import Link from "next/link"

import styled from "@emotion/styled"

import { urlFor } from "@lib/sanity/sanity"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

const FooterContainer = styled.footer`
  padding: 60px;
  background-color: ${colors.blue[900]};
`

const Header2 = styled.h2`
  font-size: 1.5rem;
`

const Anchor = styled.a`
  color: ${colors.sky[400]};
  border-bottom: 2px solid ${colors.sky[400]};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${colors.sky[500]};
    border-bottom: 2px solid ${colors.sky[500]};
  }
`

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  color: ${colors.white};
  display: grid;
  grid-template-columns: 5fr 2fr;
  grid-template-areas: "branding contact" "legal legal";
  gap: ${theme.spacing.md};

  p {
    font-size: 1rem;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
  }
`

const Person = styled.div`
  margin: 0;
  /* line-height: 1.6; */
  font-size: 1rem;
`

const Desc = styled.div`
  font-weight: 400;
  font-size: 1rem;
`

const Contact = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  align-content: start;
  grid-area: contact;
`

const Branding = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  align-content: start;
  grid-area: branding;
`

const Name = styled.div`
  font-weight: 400;
  font-size: 1rem;
`

const Title = styled.div`
  font-weight: 700;
`

const Email = styled.div`
  padding: 0;
`

const Legal = styled.div`
  grid-area: legal;
  font-size: 0.8rem;
`

export const Footer = ({ data }) => (
  <FooterContainer>
    <Container>
      <Branding>
        <div className="logo">
          {data?.logoDark && (
            <Link href="/">
              {data?.logoDark && <Image src={urlFor(data?.logoDark).url()} alt="QP Briefing" width={250} height={50} />}
            </Link>
          )}
        </div>
        <h2>About QP Briefing</h2>
        <p>
          Queen&apos;s Park Briefing is a membership-based information source, covering all political and legislative
          movements at the provincial level. QP Briefing memberships are held by stakeholders, professionals, business
          leaders, and Ontario parliamentarians.
        </p>
        <p>
          Our team provides deep analytic content for a wide array of high level decision makers standing at the
          intersection of private and public sector affairs. QP Briefing&apos;s in-depth coverage keeps our members at
          the forefront of complex policy issues, political advancements and private sector affairs.
        </p>
        <p>
          QP Briefing is an invaluable information tool and is a passionate resource for members of the Ontario Public
          Service, Public Affairs Firms and Strategists, Government Agencies, MP&apos;s and all those claiming a stake
          in provincial politics.
        </p>
      </Branding>

      <Contact>
        <Header2>Contact us</Header2>

        <Person>
          <Desc>Subscriptions and Account Management</Desc>
          <Email>
            <Anchor href="mailto:sales@ipolitics.ca">sales@ipolitics.ca</Anchor>
          </Email>
        </Person>
        <Person>
          <Desc>Advertising</Desc>
          <Email>
            <Anchor href="mailto:advertising@ipolitics.ca">advertising@ipolitics.ca</Anchor>
          </Email>
        </Person>
        <Person>
          <Desc>Partnerships and Events</Desc>
          <Name>Laura Pennell</Name>
          <Title>Publisher</Title>
          <Email>
            <Anchor href="mailto:laurapennell@ipolitics.ca">laurapennell@ipolitics.ca</Anchor>
          </Email>
        </Person>
        <Person>
          <Desc>Editorial Inquiries</Desc>
          <Email>
            <Anchor href="mailto:service@qpbriefing.com">editor@qpbriefing.com</Anchor>
          </Email>
        </Person>
        <Person>
          <Desc>Have a tip?</Desc>
          <Email>
            <Anchor href="mailto:tips@qpbriefing.com">tips@qpbriefing.com</Anchor>
          </Email>
        </Person>
      </Contact>
      <Legal>QP Briefing © {new Date().getFullYear()}. An iPolitics publication.</Legal>
    </Container>
  </FooterContainer>
)
