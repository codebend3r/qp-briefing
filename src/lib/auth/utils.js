import { API } from "@axios/axiosInstance"

export const hasDomainAccess = async (currentDomain) =>
  await API.get("/api/auth/domain", {
    params: {
      publication: "qpb",
      domainName: currentDomain,
    },
  })

export const hasIpAccess = async () => await API.get("/api/auth/ip")

export const hasFreeAccess = async () => await API.get("/api/actions")

export const checkFreeAccess = async ({ type, description, referrer }) =>
  await API.post("/api/actions", {
    type,
    description,
    referrer,
  })
