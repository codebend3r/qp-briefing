import { useEffect, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { hasDomainAccess, hasFreeAccess, hasIpAccess } from "@lib/auth/utils"

export const useTheWall = () => {
  const { data: session } = useSession()
  const [currentDomain, setCurrentDomain] = useState(null)

  const { data: hasDomainAccessData } = useQuery({
    queryKey: ["has-domain-access", currentDomain],
    queryFn: () => hasDomainAccess(currentDomain),
    select: ({ data }) => data,
    enabled: !!session?.user?.email && !!currentDomain,
  })

  const { data: hasIpAccessData } = useQuery({
    queryKey: ["has-ip-access"],
    queryFn: () => hasIpAccess(),
    select: ({ data }) => data,
    enabled: !!session?.user?.email,
  })

  const { data: hasFreeAccessData } = useQuery({
    queryKey: ["has-free-access"],
    queryFn: () => hasFreeAccess(),
    select: ({ data }) => data,
    enabled: !!session?.user?.email,
  })

  useEffect(() => {
    if (!!session?.user?.email) {
      const userEmail = session?.user?.email ?? ""
      const currentDomainByEmail = userEmail?.split("@")[1]

      setCurrentDomain(currentDomainByEmail)
    }
  }, [session])

  return {
    hasDomainAccessData,
    hasIpAccessData,
    hasFreeAccessData,
  }
}
