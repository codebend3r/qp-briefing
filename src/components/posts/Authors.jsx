"use client"

import Image from "next/image"

import styled from "@emotion/styled"

import { urlFor } from "@lib/sanity/sanity"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

export const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
`

export const AuthorImages = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const ImageContainer = styled.div`
  height: ${theme.spacing.md};
  min-width: ${theme.spacing.md};
  border-radius: 100px;
  overflow: hidden;
`

export const ByLine = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${colors.grey[800]};
  margin: 0 5px;
`

export const AuthorNameContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`

export const AuthorNames = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  color: ${colors.grey[800]};
`

export const Authors = ({ authors = [] }) => {
  const authorsFiltered =
    authors?.filter((author) => {
      const { _id } = author ?? { _id: null }

      return !!_id
    }) ?? []

  return (
    <AuthorContainer>
      <AuthorImages>
        {authorsFiltered?.map((author) => {
          const { image, name } = author ?? { image: null, name: null }

          return (
            !!image &&
            !!name && (
              <div key={name}>
                <ImageContainer key={`${name}-img`}>
                  <Image src={urlFor(image).url()} alt={name} width={40} height={40} />
                </ImageContainer>
              </div>
            )
          )
        })}
      </AuthorImages>
      <ByLine>By</ByLine>
      <AuthorNameContainer>
        {authorsFiltered?.map((author, index) => {
          const { name } = author ?? { name: null }

          return !!name && <AuthorNames key={name}>{index === 0 ? name : ` & ${name}`}</AuthorNames>
        })}
      </AuthorNameContainer>
    </AuthorContainer>
  )
}
