import { renderRichText } from "@lib/sanity/sanity"

import { theme } from "@styles/theme"

const TextBlock = ({ section }) => {
  return (
    <section>
      <div className="post-body">{renderRichText(section.content)}</div>

      <style jsx>{`
        section {
          padding: ${theme.spacing.md};
          max-width: 800px;
          margin: 0 auto;
        }
      `}</style>
    </section>
  )
}

export default TextBlock
