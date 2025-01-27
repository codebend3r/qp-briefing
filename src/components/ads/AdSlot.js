"use client"

import { useEffect, useState } from "react"

import Image from "next/image"
import { useRouter } from "next/router"

import { incrementAdClicks, incrementAdViews } from "@lib/ads"

import { theme } from "@styles/theme"

export const AdSlot = ({ ads }) => {
  const router = useRouter()
  const [ad] = useState(ads[Math.floor(Math.random() * ads.length)])

  useEffect(() => {
    const handleLoad = async () => {
      await incrementAdViews({ id: ad?._id })
    }
    handleLoad()
  }, [ad])

  const handleClick = async () => {
    await incrementAdClicks({ id: ad?._id })
    router.push(ad.link)
  }

  if (ad.format === "bigbox") {
    return (
      <div className="big-box">
        <a onClick={handleClick} target="_blank" rel="noreferrer noopener">
          <Image
            alt=""
            src={ad.image}
            width={300}
            height={250}
            quality={100}
            unoptimized={ad.image.endsWith(".gif")}
            sizes="(max-width: 800px) 95vw, 300px"
          />
        </a>
        <style jsx>{`
          .big-box {
            margin: ${theme.spacing.md} auto;
            text-align: center;
            max-width: 300px;
          }
          a {
            cursor: pointer;
          }
          @media screen and (max-width: 800px) {
            .big-box {
              margin: 12px auto;
            }
          }
        `}</style>
      </div>
    )
  }

  if (ad.format === "billboard") {
    return (
      <section className="billboard">
        <a onClick={handleClick} target="_blank" rel="noreferrer noopener">
          <Image
            alt="billboard"
            src={ad.image}
            fill
            style={{ objectFit: "contain" }}
            unoptimized={ad.image.endsWith(".gif")}
          />
        </a>
        <style jsx>{`
          .billboard {
            margin: ${theme.spacing.md} auto;
            max-width: 95%;
            display: flex;
            justify-content: center;
            position: relative;
            height: 250px;
          }

          a {
            cursor: pointer;
          }

          @media screen and (max-width: 1200px) {
            .billboard {
              margin: 0 auto ${theme.spacing.md} auto;
            }
          }

          @media screen and (max-width: 800px) {
            .billboard {
              margin: ${theme.spacing.sm} auto;
            }
          }
        `}</style>
      </section>
    )
  }

  if (ad.format === "leaderboard") {
    return (
      <section className="leaderboard">
        <a onClick={handleClick} target="_blank" rel="noreferrer noopener">
          <Image
            alt=""
            src={ad.image}
            fill
            style={{ objectFit: "contain" }}
            unoptimized={ad.image.endsWith(".gif")}
            sizes="(max-width: 800px) 95vw, 728px"
          />
        </a>
        <style jsx>{`
          .leaderboard {
            margin: ${theme.spacing.md} auto;
            max-width: 728px;
            display: flex;
            justify-content: center;
            position: relative;
            height: 90px;
          }
          a {
            cursor: pointer;
          }
          @media screen and (max-width: 800px) {
            .leaderboard {
              margin: ${theme.spacing.sm} auto;
            }
          }
        `}</style>
      </section>
    )
  }

  return
}
