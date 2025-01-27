import { useEffect, useState } from "react"

import { useRouter } from "next/router"

import { useSession } from "next-auth/react"

export const useAuthRedirect = () => {
  const [authorizedStatusCode, setAuthorizedStatusCode] = useState(0)
  const router = useRouter()
  const { data: session } = useSession()

  let sessionTimeout

  const checkSession = () => {
    sessionTimeout = setTimeout(() => {
      if (authorizedStatusCode !== 2) {
        router.push("/")
      }
    }, 2000)
  }

  useEffect(() => {
    if (!!session && !!session?.user) {
      if (session?.user?.role === "admin") {
        setAuthorizedStatusCode(2) // 2 is admin
      } else {
        setAuthorizedStatusCode(1) // 1 is non-admin
      }
    }

    return () => {
      clearTimeout(sessionTimeout)
    }
  }, [session?.user?.role])

  useEffect(() => {
    checkSession()

    return () => {
      clearTimeout(sessionTimeout)
    }
  }, [authorizedStatusCode])

  return {
    isAuthorized: authorizedStatusCode,
  }
}

export default useAuthRedirect
