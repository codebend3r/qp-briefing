const unit = "px"

export const BREAKPOINTS = {
  SM: 568,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1920,
}

// @media screen and (min-width: 35.5rem) // 	≥568px
// @media screen and (min-width: 48rem) // ≥768px
// @media screen and (min-width: 64rem) // ≥1024px
// @media screen and (min-width: 80rem) // ≥1280px
// @media screen and (min-width: 120rem) // ≥1920px
// @media screen and (min-width: 160rem) // ≥2560px
// @media screen and (min-width: 240rem) // ≥3840px

export const MEDIA_QUERY = {
  SM_UP: `@media screen and (min-width: ${BREAKPOINTS.SM}${unit})`,
  SM_DOWN: `@media screen and (max-width: ${BREAKPOINTS.SM - 1}${unit})`,
  MD_UP: `@media screen and (min-width: ${BREAKPOINTS.MD}${unit})`,
  MD_DOWN: `@media screen and (max-width: ${BREAKPOINTS.MD - 1}${unit})`,
  LG_UP: `@media screen and (min-width: ${BREAKPOINTS.LG}${unit})`,
  LG_DOWN: `@media screen and (max-width: ${BREAKPOINTS.LG - 1}${unit})`,
  XL_UP: `@media screen and (min-width: ${BREAKPOINTS.XL}${unit})`,
  XL_DOWN: `@media screen and (max-width: ${BREAKPOINTS.XL - 1}${unit})`,
}
