import axios from "axios"

const API_BASE_URL = process.env.API_BASE_URL

// * this axios instance will be used for authenticated requests
// * with Authorization header defined
export const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
