import styled from "@emotion/styled"

import { urlFor } from "@lib/sanity/sanity"

const ImageContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`

const FigureContainer = styled.figure`
  position: relative;
`

export const Figure = ({ value }) => {
  return (
    <ImageContainer>
      <FigureContainer>
        <img src={urlFor(value.image).url()} alt={value.alt} style={{ width: "100%", height: "auto" }} />
        <figcaption>{value.caption}</figcaption>
      </FigureContainer>
    </ImageContainer>
  )
}
