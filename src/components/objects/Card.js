import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

const Card = ({ children, backgroundColor = "#fff" }) => {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          margin: 0 auto;
          background-color: ${backgroundColor};
          border-radius: ${theme.borderRadius.sm};
          box-shadow: ${theme.shadow.card};
          border-top: 5px solid ${colors.blue[800]};
          padding: ${theme.spacing.lg};
        }
        @media (max-width: 768px) {
          div {
            padding: ${theme.spacing.md};
          }
        }
        @media (max-width: 480px) {
          div {
            padding: ${theme.spacing.sm};
          }
        }
      `}</style>
    </div>
  )
}

export default Card
