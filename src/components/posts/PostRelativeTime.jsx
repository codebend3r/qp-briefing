import { useEffect, useState } from "react"

import dayjs from "dayjs"
import RelativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(RelativeTime)

export const PostRelativeTime = ({ date }) => {
  const [displayDate, setDisplayDate] = useState()

  useEffect(() => {
    setDisplayDate(dayjs().to(date))
  }, [date])
  return <>{displayDate}</>
}
