const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "./src/styles")],
  },
  images: {
    domains: ["cdn.sanity.io", "old.qpbriefing.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/:year(\\d{1,})/:month(\\d{1,})/:day(\\d{1,})/:slug",
        destination: "/archives/:slug",
        permanent: true,
      },
      {
        source: "/subscribe",
        destination: "/offers/subscription",
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.resolve.alias["@styles"] = path.resolve(__dirname, "./src/styles")

    return config
  },
}

module.exports = nextConfig
