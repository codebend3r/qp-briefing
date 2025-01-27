import Image from "next/image"

import { urlFor } from "@lib/sanity/sanity"

import { theme } from "@styles/theme"

export default function NewsletterHero({ section }) {
  const { backgroundGradient, title, subtitle, image, textColor, button } = section

  return (
    <section className="container">
      <div className="split">
        <div className="left">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="right">
          {!!image ? (
            <div className="image-container">
              <Image
                src={urlFor(image).url()}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "top center",
                }}
                alt=""
                priority
              />
            </div>
          ) : null}
        </div>
      </div>

      <style jsx>{`
        .container {
          padding: 0 ${theme.spacing.sm};
          background-image: ${`
            linear-gradient(${backgroundGradient.direction},
            ${backgroundGradient.from.color},
             ${backgroundGradient.to.color}
             )
          `};
        }

        .image-container {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: ${theme.spacing.md};
          max-width: 1140px;
          margin: 0 auto;
        }

        .left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: ${theme.spacing.md};
          max-width: 65ch;
          margin-left: auto;
          padding: 60px;
        }

        .right {
          max-height: 450px;
          overflow: hidden;
        }

        h1,
        p {
          color: ${textColor.color};
        }

        form {
          display: flex;
          margin-top: ${theme.spacing.md};
        }

        input {
          padding: ${theme.spacing.sm};
          font-size: 18px;
          border-radius: ${theme.borderRadius.sm} 0 0 ${theme.borderRadius.sm};
          border: none;
          width: 100%;
        }

        input:focus {
          outline: none;
        }
        button {
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          background-color: ${button?.backgroundColor.color};
          border: 1px solid ${button?.backgroundColor.color};
          border-radius: 0 ${theme.borderRadius.sm} ${theme.borderRadius.sm} 0;
          font-weight: 800;
          color: ${button?.color.color};
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: fit-content;
        }

        button:hover {
          background-color: ${button?.backgroundColorHover.color};
          color: ${button?.colorHover.color};
          border: 1px solid ${button?.backgroundColorHover.color};
        }

        @media screen and (max-width: 800px) {
          .split {
            grid-template-columns: 2fr 1fr;
          }

          .right {
            overflow: visible;
          }
        }
        @media screen and (max-width: 600px) {
          .split {
            display: block;
          }
          .right {
            display: none;
          }
          form {
            flex-direction: column;
          }
          input {
            margin-bottom: ${theme.spacing.sm};
            width: inherit;
            border-radius: ${theme.borderRadius.sm};
          }
          button {
            border-radius: ${theme.borderRadius.sm};
          }

          .left {
            padding: ${theme.spacing.md} ${theme.spacing.sm};
          }
        }
      `}</style>
    </section>
  )
}
