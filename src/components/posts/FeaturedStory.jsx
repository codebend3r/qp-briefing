import Image from "next/image"
import Link from "next/link"

import styled from "@emotion/styled"
import { PortableText } from "@portabletext/react"

import { PostRelativeTime } from "@components/posts/PostRelativeTime"

import { urlFor } from "@lib/sanity/sanity"

import { colors } from "@styles/colors"

const ArticleContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  padding: 0;
`

const StoryTitle = styled.h1`
  font-size: 1.8rem;
  color: ${colors.blue[900]};
  font-weight: 800;
  line-height: 1.2;
  margin: 0;
`

const ImageContainer = styled.div`
  position: relative;
  padding-top: 56.25%;
  border-radius: 5px;
  overflow: hidden;
`

const Category = styled.div`
  background-color: ${colors.sky[500]};
  font-size: 1rem;
  padding: 6px 10px;
  border-radius: 20px;
  color: #fff;
  font-weight: 600;
  display: inline-block;
`

const Content = styled.div`
  display: grid;
  justify-items: start;
  grid-template-columns: 1fr;
  padding: 1rem 0;
  gap: 1rem;
`

const Date = styled.div`
  color: ${colors.stone[800]};
  font-weight: 600;
  font-size: 1rem;
`

export const FeaturedStory = ({ data }) => (
  <Link href={`/news/${data.slug?.current}`}>
    <ArticleContainer>
      {data?.mainImage && (
        <ImageContainer>
          <Image
            src={urlFor(data.mainImage.image).url()}
            fill
            style={{ objectFit: "cover" }}
            alt={data.title}
            priority
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          />
        </ImageContainer>
      )}

      <Content>
        <Category>{data.category}</Category>
        <StoryTitle>{data.title}</StoryTitle>
        <div className="excerpt">
          <PortableText value={data.excerpt} />
        </div>
        <Date>
          <PostRelativeTime date={data.publishedAt} />
        </Date>
      </Content>
    </ArticleContainer>
  </Link>
)
