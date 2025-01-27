"use client"

import { PortableText } from "@portabletext/react"
import createImageUrlBuilder from "@sanity/image-url"
import ReactPlayer from "react-player/lazy"
import { TwitterTweetEmbed } from "react-twitter-embed"

import { Figure } from "@components/objects/Figure"
import { FeaturedStory } from "@components/posts/FeaturedStory"
import { SideStory } from "@components/posts/SideStory"

import { theme } from "@styles/theme"

import { config } from "./config"

export const urlFor = (source) => createImageUrlBuilder(config).image(source)

export const renderSections = (sections) => {
  return sections.map((section, index) => {
    switch (section._type) {
      case "richText":
        return renderRichText(section)
      case "textBlock":
        return renderRichText(section.content)
      case "postEmbed":
        if (section.format === "full") {
          return <FeaturedStory post={section.post} key={index} />
        } else if (section.format === "compact") {
          return <SideStory post={section.post} key={index} />
        }
      case "figure":
        return <Figure figure={section} key={index} />
      default:
        return null
    }
  })
}
export const renderRichText = (content) => {
  const components = {
    types: {
      figure: Figure,
      postEmbed: ({ value }) => {
        if (value.format === "full") {
          return <FeaturedStory post={value.post} />
        } else if (value.format === "compact") {
          return (
            <div style={{ margin: "24px auto" }}>
              <SideStory post={value.post} />
            </div>
          )
        }
      },
      tweetEmbed: ({ value }) => {
        return <TwitterTweetEmbed tweetId={value.tweetId} />
      },
      mediaEmbed: ({ value }) => {
        return (
          <div className="player-wrapper">
            <ReactPlayer url={value.url} width="100%" height="100%" />
            <style jsx>{`
              .player-wrapper {
                position: relative;
                height: 450px;
                margin: ${theme.spacing.md} auto;
              }

              .react-player {
                position: absolute;
                top: 0;
                left: 0;
              }
              @media screen and (max-width: 600px) {
                .player-wrapper {
                  height: 50vw;
                }
              }
            `}</style>
          </div>
        )
      },
      code: ({ value }) => {
        if (value.language === "html") {
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: value.code,
              }}
            ></div>
          )
        } else {
          return null
        }
      },
    },
  }

  return <PortableText value={content} components={components} />
}
