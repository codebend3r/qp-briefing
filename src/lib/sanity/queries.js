export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0]{
    "slug": slug.current,
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0]{
    "slug": slug.current,
  }
`

export const offerBySlugQuery = `
  *[_type == "marketingPage" && slug.current == $slug][0]{
    "slug": slug.current,
  }
`
