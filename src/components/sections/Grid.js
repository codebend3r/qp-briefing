import { Subscription } from "@components/objects/Subscription"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

export const Grid = ({ section }) => {
  const { columns = 1, title = "" } = section
  return (
    <section>
      <h2>{title}</h2>
      <div className="grid">
        {section?.items?.map((item) => {
          switch (item._type) {
            case "subscription":
              return <Subscription {...item} key={item._id} />
            default:
              return <></>
          }
        })}
      </div>
      <style jsx>{`
        section {
          ${section?.background?.backgroundGradient
            ? `background: linear-gradient(${section?.background.backgroundGradient.direction}, ${section?.background?.backgroundGradient?.from?.color}, ${section?.background?.backgroundGradient?.to?.color});`
            : `background-color: ${section?.background?.backgroundColor?.color};`}
          padding: 60px;
        }
        h2 {
          text-align: center;
          color: ${colors.blue[900]};
          font-weight: 900;
          margin: 0 0 ${theme.spacing.lg} 0;
        }
        .grid {
          max-width: 1140px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: ${`repeat(${columns}, 1fr)`};
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
          section {
            padding: 30px;
          }
        }
        @media (max-width: 480px) {
          section {
            padding: 15px;
          }
        }
      `}</style>
    </section>
  )
}

export default Grid
