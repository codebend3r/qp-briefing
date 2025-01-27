import { useState } from "react"

import Image from "next/image"

import { Loading } from "@components/loading"

import { urlFor } from "@lib/sanity/sanity"

import { theme } from "@styles/theme"

export default function NewsletterHero({ section }) {
  const {
    newsletter: { sendgridListId },
    successMessage,
    errorMessage,
    backgroundGradient,
    title,
    subtitle,
    image,
    textColor,
    button,
    input,
    backgroundImage,
  } = section
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const data = new FormData(form)
    const payload = Object.fromEntries(data.entries())
    const res = await fetch(`/api/email/list/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        listId: sendgridListId,
      }),
    })
    setLoading(false)
    if (res.ok) {
      setMessage(successMessage)
    } else {
      setMessage(errorMessage)
    }
  }
  return (
    <section className="container">
      <div className="split">
        <div className="left">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          {!!loading ? (
            <Loading />
          ) : (
            <>
              {!!message ? (
                <p>{message}</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    type={input.type}
                    name={input.name}
                    required={input.required}
                    placeholder={input.placeholder}
                  />
                  <button role="submit">{button.text}</button>
                </form>
              )}
            </>
          )}
        </div>
        <div className="right">
          {!!image ? (
            <div className="image-container">
              <Image src={urlFor(image).url()} width={900} height={1650} alt="" priority />
            </div>
          ) : null}
        </div>
      </div>

      <style jsx>{`
        .container {
          padding: 0 ${theme.spacing.sm};
          background-image: ${
            backgroundImage
              ? `url(${urlFor(backgroundImage).url()});`
              : `linear-gradient(${backgroundGradient.direction},
            ${backgroundGradient.from.color},
             ${backgroundGradient.to.color});`
          }
          background-size: cover;
          min-height: 400px;
          display: flex;
          align-items: center;
        }

        .image-container {
          margin-top: ${theme.spacing.md};
          max-width: 650px;
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
          background-color: ${button.backgroundColor.color};
          border: 1px solid ${button.backgroundColor.color};
          border-radius: 0 ${theme.borderRadius.sm} ${theme.borderRadius.sm} 0;
          font-weight: 800;
          color: ${button.color.color};
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: fit-content;
        }

        button:hover {
          background-color: ${button.backgroundColorHover.color};
          color: ${button.colorHover.color};
          border: 1px solid ${button.backgroundColorHover.color};
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
