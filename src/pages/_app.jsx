import { useEffect } from "react"

import { Lato } from "next/font/google"
import { useRouter } from "next/router"
import Script from "next/script"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"

import * as gtag from "@lib/gtag"

import "@styles/globals.scss"

import "normalize.css/normalize.css"

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
})

const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
    },
  },
}

const queryClient = new QueryClient(queryClientConfig)

const App = ({ Component, pageProps }) => {
  const { session } = pageProps
  const getLayout = Component.getLayout || ((page) => page)

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = async (url) => {
      gtag.pageview(url)
    }

    // * make sure it loads on the first hit
    handleRouteChange(router.asPath)

    router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router])

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <main className={lato.className}>{getLayout(<Component {...pageProps} />)}</main>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export const QPBriefingApp = ({ Component, pageProps }) => (
  <>
    <Script
      strategy="afterInteractive"
      id="gtag-import"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
    />
    <Script
      strategy="afterInteractive"
      id="gtag-init"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `,
      }}
    />

    <App Component={Component} pageProps={pageProps} />
  </>
)

export default QPBriefingApp
