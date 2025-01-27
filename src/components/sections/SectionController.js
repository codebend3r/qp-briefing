import { FeaturedStory } from "@components/posts/FeaturedStory"
import { SideStory } from "@components/posts/SideStory"
import ClientFlex from "@components/sections/ClientFlex"
import FeaturedAuthors from "@components/sections/FeaturedAuthors"
import { Grid } from "@components/sections/Grid"
import Hero from "@components/sections/Hero"
import NewsletterHero from "@components/sections/NewsletterHero"
import TextBlock from "@components/sections/TextBlock"

/**
 * A function to render different types of sections based on their _type property.
 *
 * @param {Object} props - The props object containing the section data.
 * @param {Object} props.section - The section data object.
 * @param {string} props.section._type - The type of the section.
 * @param {Object} props.section.newsletterHero - The data for the newsletterHero section.
 * @param {Object} props.section.featuredAuthors - The data for the featuredAuthors section.
 * @param {Object} props.section.clientFlex - The data for the clientFlex section.
 * @param {Object} props.section.hero - The data for the hero section.
 * @param {Object} props.section.grid - The data for the grid section.
 * @param {Object} props.section.textBlock - The data for the textBlock section.
 * @param {Object} props.section.postEmbed - The data for the postEmbed section.
 * @param {string} props.section.postEmbed.format - The format of the postEmbed section.
 * @param {Object} props.section.postEmbed.post - The post data for the postEmbed section.
 *
 * @returns {JSX.Element} - The rendered section component based on the _type property.
 */
export function SectionController({ section }) {
  switch (section._type) {
    case "newsletterHero":
      return <NewsletterHero section={section} />
    case "featuredAuthors":
      return <FeaturedAuthors section={section} />
    case "clientFlex":
      return <ClientFlex section={section} />
    case "hero":
      return <Hero section={section} />
    case "grid":
      return <Grid section={section} />
    case "textBlock":
      return <TextBlock section={section} />
    case "postEmbed":
      if (section.format === "full") {
        return <FeaturedStory data={section.post} key={section._key} />
      } else if (section.format === "compact") {
        return <SideStory data={section.post} key={section._key} />
      } else {
        return null
      }
    default:
      return (
        <>
          <h1>Section not found</h1>
        </>
      )
  }
}
