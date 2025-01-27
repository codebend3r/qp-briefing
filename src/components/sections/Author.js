import Image from "next/image"

import { PortableText } from "@portabletext/react"

import { urlFor } from "@lib/sanity/sanity"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

const Author = ({ name, title, bio, image, backgroundColor = "#fff" }) => {
  return (
    <div className="author post-body">
      <div className="header">
        <div className="image-container">
          <Image
            src={urlFor(image).width(200).height(200).url()}
            alt=""
            width={200}
            height={200}
            style={{ filter: "grayscale(100%)" }}
          />
        </div>
        <div className="name">
          <h3>{name}</h3>
          <div className="title">{title}</div>
        </div>
      </div>
      <div className="info">
        <PortableText value={bio} />
      </div>
      <style jsx>{`
        .author {
          margin: 0 auto;
          background-color: ${backgroundColor};
          border-radius: ${theme.borderRadius.sm};
          box-shadow: ${theme.shadow.card};
          border-top: 5px solid ${theme.colors.redBrand};
          padding: ${theme.spacing.lg};
          display: flex;
          flex-direction: column;
        }
        .header {
          display: flex;
          align-items: center;
          margin-bottom: ${theme.spacing.lg};
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 100px;
          max-height: 100px;
          overflow: hidden;
          border-radius: 50%;
          box-shadow: ${theme.shadow.card};
          margin-right: ${theme.spacing.md};
        }
        .name {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .title {
          font-size: ${theme.fontSize.sm};
          color: ${colors.grey[500]};
          font-weight: 600;
        }
        .info {
          height: 100%;
        }
        h3 {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }

        @media (max-width: 450px) {
          .header {
            flex-direction: column;
            align-items: center;
          }
          .image-container {
            margin-right: 0;
          }
          .name {
            margin-top: ${theme.spacing.md};
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}

export default Author
