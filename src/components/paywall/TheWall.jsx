"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/router"

import { useTheWall } from "@/hooks/useTheWall"
import styled from "@emotion/styled"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { Lock } from "@components/paywall/Lock"

import { hasDomainAccess, hasFreeAccess, hasIpAccess } from "@lib/auth/utils"
import { renderRichText } from "@lib/sanity/sanity"

export const Content = styled.div`
  padding: 0;
  margin: 0;
`

export const TheWall = ({ content, wpContent, teaser, wpTeaser, free = false }) => {
  const { hasDomainAccessData, hasIpAccessData, hasFreeAccessData } = useTheWall()
  const { data: session } = useSession()

  const router = useRouter()

  const { paywall } = router.query

  const allowFullArticleRead =
    paywall === "nowall" ||
    session?.permissions?.includes("can_read_qpb") ||
    session?.user?.role === "admin" ||
    free ||
    hasDomainAccessData ||
    hasIpAccessData ||
    hasFreeAccessData

  const FullArticle = () => (
    <Content>
      {wpContent ? (
        <div
          className="body post-body"
          dangerouslySetInnerHTML={{
            __html: wpContent,
          }}
        ></div>
      ) : (
        <div className="body post-body">{renderRichText(content)}</div>
      )}
    </Content>
  )

  const PreviewArticle = () => (
    <Content>
      {wpContent ? (
        <div
          className="body post-body"
          dangerouslySetInnerHTML={{
            __html: wpTeaser,
          }}
        ></div>
      ) : (
        <div className="body post-body locked">{renderRichText(teaser)}</div>
      )}
      <Lock />
    </Content>
  )

  return allowFullArticleRead ? <FullArticle /> : <PreviewArticle />
}
