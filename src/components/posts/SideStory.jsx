import Image from "next/image"
import Link from "next/link"

import styled from "@emotion/styled"

import { PostRelativeTime } from "@components/posts/PostRelativeTime"

import { urlFor } from "@lib/sanity/sanity"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

const ArticleContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${theme.spacing.sm};

  @media (max-width: 1200px) {
    gap: ${theme.spacing.sm};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ImageContainer = styled.div`
  position: relative;
  padding-top: 56.25%;
  border-radius: 5px;
  overflow: hidden;
`

const Content = styled.div`
  /* border: 2px solid red; */
  display: grid;
  grid-template-columns: 1fr;
  /* gap: 0; */
  gap: ${theme.spacing.sm};
`

const StoryTitle = styled.h1`
  font-size: 1.5rem;
  color: ${colors.blue[900]};
  font-weight: 800;
  line-height: 1;
  margin: 0;
  /* background-color: orange; */

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

const Category = styled.div`
  padding: 0;
  margin: 0;
  font-weight: 600;
  color: ${colors.sky[600]};
  /* background-color: greenyellow; */
`

const Date = styled.div`
  font-weight: 600;
  color: ${colors.stone[800]};
  font-size: 1rem;
  /* background-color: blue; */
`

export const SideStory = ({ data }) => (
  <Link href={`/news/${data?.slug?.current}`}>
    <ArticleContainer>
      <ImageContainer>
        {!!data?.mainImage?.image && (
          <Image
            src={urlFor(data.mainImage.image).url()}
            fill
            style={{ objectFit: "cover" }}
            alt={data.title}
            sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
          />
        )}
      </ImageContainer>
      <Content>
        <Category>{data.category}</Category>
        <StoryTitle>{data.title}</StoryTitle>
        <Date>
          <PostRelativeTime date={data.publishedAt} />
        </Date>
      </Content>
    </ArticleContainer>
  </Link>
)
