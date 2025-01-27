"use client"

import Head from "next/head"
import Image from "next/image"

import styled from "@emotion/styled"

import { AdSlot } from "@components/ads/AdSlot"
import { TheWall } from "@components/paywall/TheWall"
import { Authors } from "@components/posts/Authors"
import { PostDate } from "@components/posts/PostDate"

import { renderRichText, urlFor } from "@lib/sanity/sanity"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

export const Article = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  justify-items: start;
  justify-content: start;
  max-width: 50rem;
  padding: ${theme.spacing.sm};
  margin: 0 auto;
`
export const PostTitle = styled.article`
  margin: 0 auto;
  color: ${colors.blue[900]};
`

export const Excerpt = styled.div`
  margin: 0 auto;
`

export const ImageContainer = styled.div`
  position: relative;
  padding: 0;
  border-radius: 5px;
  width: 100%;
  height: auto;
  margin: 0;
  justify-self: normal;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`

export const Category = styled.div`
  background-color: ${colors.sky[500]};
  padding: 5px 15px;
  border-radius: ${theme.borderRadius.lg};
  color: #fff;
  font-weight: 600;
  display: inline-block;
  line-height: 1;
`

export const ImageCaption = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`

export const Caption = styled.p`
  font-size: 0.9rem;
  color: ${colors.grey[500]};
  margin: 0 auto;
  padding: 0;
`

export const ArticleView = ({ post, bigBoxAds }) => {
  const { authors = [], body = [], category, excerpt, free = false, mainImage, publishedAt, title } = post

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={excerpt} />
      </Head>

      <Article>
        <Category>{category}</Category>

        <PostTitle>
          <h1>{title}</h1>
        </PostTitle>

        <Excerpt>{renderRichText(excerpt)}</Excerpt>

        <PostDate date={publishedAt} />

        <Authors authors={authors} />

        <ImageCaption>
          {mainImage?.image && (
            <ImageContainer>
              <Image
                src={urlFor(mainImage?.image).url()}
                width={765}
                height={574}
                alt={title}
                style={{ objectFit: "cover" }}
                priority
              />
            </ImageContainer>
          )}

          {!!mainImage?.caption && <Caption>{mainImage.caption}</Caption>}
        </ImageCaption>

        {!!bigBoxAds?.one.length && <AdSlot data={bigBoxAds.one} />}

        <TheWall content={body} teaser={body.slice(0, 3)} free={free} />

        {!!bigBoxAds?.two?.length && <AdSlot data={bigBoxAds.two} />}
      </Article>
    </>
  )
}
