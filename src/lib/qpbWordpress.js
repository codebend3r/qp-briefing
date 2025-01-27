const API_URL = "https://old.qpbriefing.com/graphql"
async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    throw new Error("Failed to fetch API")
  }

  return json.data
}

export async function getQPBriefingPosts({ first }) {
  const data = await fetchAPI(
    `query AllPosts($first: Int!) {
      posts(first: $first, where: {
        orderby: { field: DATE, order: DESC },

      }) {
        ${postPreviewFields}
        pageInfo {
          endCursor
        }
      }
    }`,
    {
      variables: {
        first,
      },
    },
  )
  return data?.posts
}

export async function getQPBriefingPostsForiPolitics({ first }) {
  const data = await fetchAPI(
    `
    query AllPosts($first: Int!) {
      posts(first: $first, where: {
        orderby: { field: DATE, order: DESC },
        taxQuery: {
          taxArray: [
            {
              terms: ["ipolitics"],
              taxonomy: TAG,
              operator: IN,
              field: SLUG
            }
          ]
        }
      }) {
        ${postPreviewFields}
        pageInfo {
          endCursor
        }
      }
    }
  `,
    {
      variables: {
        first,
      },
    },
  )
  return data?.posts
}

export async function getQPBriefingPostWithSlug({ postSlug }) {
  const data = await fetchAPI(
    `
  query PostData($slug: String!) {
    postBy(slug: $slug) {
      ${postDetailFields}
    }
  }
  `,
    {
      variables: {
        slug: postSlug,
      },
    },
  )
  return data?.postBy
}

const postPreviewFields = `
nodes {
  title
  excerpt
  slug
  date
  uri
  featuredImage {
    node {
      sourceUrl
      mediaDetails {
        height
        width
      }
    }
  }
  categories {
    nodes {
      slug
    }
  }
  tags {
    nodes {
      slug
    }
  }
  author {
    node {
      name
      id
      nickname
      avatar {
        url
      }
    }
  }
}



`

const postDetailFields = `
  title
  date
  content
  excerpt
  featuredImage {
    node {
      caption
      sourceUrl
      mediaDetails {
        height
        width
      }
    }
  }
  categories {
    nodes {
      slug
    }
  }
  tags {
    nodes {
      slug
    }
  }
  author {
    node {
      name
      id
      avatar {
        url
      }
    }
  }

`
