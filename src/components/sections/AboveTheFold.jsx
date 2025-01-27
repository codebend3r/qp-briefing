import cx from "classnames"

import { AdSlot } from "@components/ads/AdSlot"
import { FeaturedStory } from "@components/posts/FeaturedStory"
import { MorningBriefing } from "@components/posts/MorningBriefing"
import { SideStory } from "@components/posts/SideStory"
import styling from "@components/sections/abovethefold.module.scss"

export const AboveTheFold = ({ posts, bigBoxAds, morningBriefing }) => (
  <section className={styling.section}>
    {!!posts && (
      <>
        <div className={styling.primary}>
          <FeaturedStory data={posts[0]} />

          <div className={cx(styling["show-mobile-only"])}>
            {/* only show on mobile */}
            {!!bigBoxAds?.one?.length && <AdSlot ads={bigBoxAds.one} />}
          </div>
        </div>

        <div className={styling.secondary}>
          {!!morningBriefing?.slug && <MorningBriefing morningBriefing={morningBriefing} />}

          {posts.slice(1, 3).map((post) => (
            <SideStory data={post} key={post?._id} />
          ))}

          <div className={cx(styling["show-tablet-up"])}>
            {/* only show on tablet */}
            {!!bigBoxAds?.two?.length && <AdSlot ads={bigBoxAds.two} />}
          </div>

          {posts.slice(3, 5).map((post) => (
            <SideStory data={post} key={post?._id} />
          ))}
        </div>

        <div className={styling.tertiary}>
          {/* only show on desktop */}
          {!!bigBoxAds?.one?.length && <AdSlot ads={bigBoxAds.one} />}
          {/* only show on desktop */}
          {!!bigBoxAds?.two?.length && <AdSlot ads={bigBoxAds.two} />}
        </div>
      </>
    )}
  </section>
)
