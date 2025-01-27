import Head from "next/head"
import Image from "next/image"

import { AdSlot } from "@components/ads/AdSlot"
import { TheWall } from "@components/paywall/TheWall"
import { PostDate } from "@components/posts/PostDate"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

const ArchiveView = ({ post, bigBoxAds }) => {
  return (
    <article>
      <Head>
        <title>{post.title}</title>
      </Head>
      {/* <div className='category'>{post.category}</div> */}
      <div className="warning">This post is from our archives and not all features will display correctly.</div>
      <div className="post-title">
        <h1>{post.title}</h1>
      </div>
      <div
        className="excerpt"
        dangerouslySetInnerHTML={{
          __html: post.excerpt,
        }}
      ></div>
      <div className="date">
        <PostDate date={post.date} />
      </div>
      {/* <Authors data={post.authors} /> */}
      {post?.featuredImage?.node ? (
        <div className="image-container">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </div>
      ) : null}

      {post.featuredImage?.node?.caption && (
        <div
          className="image-caption"
          dangerouslySetInnerHTML={{
            __html: post.featuredImage.node.caption,
          }}
        ></div>
      )}
      {bigBoxAds?.one.length > 0 && <AdSlot data={bigBoxAds.one} />}
      <TheWall wpContent={post.content} wpTeaser={post.content.slice(0, 3)} />
      {bigBoxAds?.two.length > 0 && <AdSlot data={bigBoxAds.two} />}
      <style jsx>{`
        article {
          max-width: 50rem;
          padding: ${theme.spacing.sm};
          margin: 0 auto;
        }
        .warning {
          background-color: ${colors.red[500]};
          color: #fff;
          padding: 10px;
          margin-bottom: 2.5rem;
          border-radius: 5px;
          text-align: center;
        }
        .post-title {
          margin: 0 auto;
          color: ${colors.blue[900]};
        }
        .excerpt {
          margin: 0 auto;
        }
        .image-container {
          position: relative;
          padding-top: 56.25%;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: ${theme.spacing.md};
        }
        .image-caption {
          font-size: 0.9rem;
          color: ${colors.grey[500]};
          margin: 0 auto;
          padding: 10px;
          margin-bottom: 2.5rem;
        }

        .body {
          margin: 0 auto;
        }
        .body a {
          color: ${colors.blue[900]};
          font-weight: 600;
          border-bottom: 1px solid ${colors.blue[900]};
        }
        .category {
          background-color: ${colors.sky[500]};
          padding: 5px 15px;
          border-radius: ${theme.borderRadius.lg};
          color: #fff;
          font-weight: 600;
          display: inline-block;
          line-height: 1;
        }
      `}</style>
    </article>
  )
}

export default ArchiveView
