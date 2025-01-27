import styled from "@emotion/styled"
import dayjs from "dayjs"

import { colors } from "@styles/colors"

const Title = styled.p`
  font-size: 0.9rem;
  color: ${colors.slate[500]};
  margin: 0;
  padding: 0;
  line-height: 1;
`

export const PostDate = ({ date }) => {
  const displayDate = dayjs(date).format("MMM D, YYYY [at] h:mma")

  return <Title>Published {displayDate}</Title>
}
