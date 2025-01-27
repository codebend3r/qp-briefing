import Image from "next/image"

import { urlFor } from "@lib/sanity/sanity"

import { theme } from "@styles/theme"

const ClientFlex = ({ section }) => {
  const { title, subtitle, clients } = section
  return (
    <section>
      <div className="container">
        <div className="text">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <div className="logos">
          {clients?.map((client) => (
            <div className="logo" key={client._key}>
              {client.logo ? (
                <Image src={urlFor(client.logo).url()} fill style={{ objectFit: "cover" }} alt={client.name} />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          ${section?.background?.backgroundGradient
            ? `background: linear-gradient(${section?.background?.backgroundGradient?.direction}, ${section?.background?.backgroundGradient?.from?.color}, ${section?.background?.backgroundGradient?.to?.color});`
            : `background-color: ${section?.backgroundColor?.color};`}
          padding: 60px;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .text {
          margin-bottom: ${theme.spacing.lg};
        }
        .image-container {
          position: relative;
        }

        div > h1 {
          margin-top: 0px;
        }
        .logos {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        }
        .logo {
          height: 100px;
          width: 100px;
          position: relative;
        }
        .logo:not(last-of-type) {
          margin-right: ${theme.spacing.md};
        }

        @media (max-width: 768px) {
          section {
            padding: 60px 0;
          }
          .container {
            padding: 0 ${theme.spacing.sm};
          }
        }
      `}</style>
    </section>
  )
}

export default ClientFlex
