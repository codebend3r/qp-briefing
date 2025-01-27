import { useEffect, useState } from "react"

import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"

import { csrfToken, getSession, signIn } from "next-auth/react"

import { urlFor } from "@lib/sanity/sanity"
import { getClient } from "@lib/sanity/sanity.server"

import { colors } from "@styles/colors"
import { theme } from "@styles/theme"

function SignInPage({ publication }) {
  const router = useRouter()
  const { callbackUrl, error } = router.query
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    if (error) {
      switch (error) {
        case "EmailSignin":
          setErrorMessage("There was an error sending you the verifitication email, please try again later.")
          break
        case "CredentialsSignin":
          setErrorMessage("Error. Username and password not found.")
          break
        default:
          setErrorMessage("There was an error signing you in, please try again later.")
          break
      }
    }
  }, [error])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const thing = await signIn("email", {
        email,
        callbackUrl,
        redirect: false,
      })
      if (thing.ok) {
        setSuccess(true)
      } else {
        setErrorMessage("There was an error sending you the verifitication email, please try again later.")
      }
    } catch (e) {
      // no-op
    }
  }

  return (
    <main className="background">
      <div className="blur">
        <Head>
          <title>Sign in</title>
          <link rel="icon" href={urlFor(publication.favicon).url()} />
        </Head>

        <div className="card">
          <div className="content">
            <div className="logo">
              <Image src={urlFor(publication.logo).url()} width={200} height={50} alt={publication.title} />
            </div>
            {success ? (
              <p>We&apos;ve sent you an email with a link to sign in. Please check your inbox.</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                />
                <button type="submit">Sign in with Email</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        main {
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        .blur {
          min-height: 100vh;
          width: 100%;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card {
          max-width: 400px;
          margin: 0 auto;
          padding: ${theme.spacing.md};
          background-color: ${colors.slate[100]};
          border-top: 5px solid ${colors.sky[700]};
          border-radius: 0.5rem;
          box-shadow: ${theme.shadow.card};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }
        .logo {
          margin: 0 auto;
          margin-bottom: ${theme.spacing.md};
          text-align: center;
        }
        .error {
          color: ${colors.red[500]};
          margin-top: ${theme.spacing.xs};
          max-width: 15ch;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        input {
          padding: 0.5rem;
          margin-bottom: ${theme.spacing.sm};
          border: 1px solid ${colors.sky[400]};
          border-radius: 0.25rem;
        }
        button {
          padding: 0.5rem 1rem;
          width: 100%;
          background-color: ${colors.blue[900]};
          color: ${colors.white};
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s ease;
        }
        button:hover {
          background-color: ${colors.sky[700]};
        }
        @keyframes move {
          100% {
            transform: translate3d(0, 0, 1px) rotate(360deg);
          }
        }

        .background {
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          background: #1e3a8a;
          overflow: hidden;
          opacity: 0.8;
          background-image: url("/images/Queens_Park.jpg"),
            linear-gradient(180deg, rgba(30, 58, 138, 0.5), rgba(30, 58, 138, 0.5));
          background-blend-mode: multiply;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          backdrop-filter: blur(10px);
        }

        .background span {
          width: 50vmin;
          height: 50vmin;
          border-radius: 50vmin;
          backface-visibility: hidden;
          position: absolute;
          animation: move;
          animation-duration: 12;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          opacity: 0.5;
        }

        .background span:nth-child(0) {
          color: #0284c7;
          top: 49%;
          left: 18%;
          animation-duration: 342s;
          animation-delay: -101s;
          transform-origin: 18vw 19vh;
          box-shadow: 100vmin 0 12.643684899492747vmin currentColor;
        }
        .background span:nth-child(1) {
          color: #38bdf8;
          top: 100%;
          left: 50%;
          animation-duration: 36s;
          animation-delay: -222s;
          transform-origin: 3vw 25vh;
          box-shadow: 100vmin 0 12.740194265058113vmin currentColor;
        }
        .background span:nth-child(2) {
          color: #0ea5e9;
          top: 7%;
          left: 20%;
          animation-duration: 299s;
          animation-delay: -254s;
          transform-origin: -3vw 13vh;
          box-shadow: 100vmin 0 13.137967403383819vmin currentColor;
        }
        .background span:nth-child(3) {
          color: #0284c7;
          top: 10%;
          left: 63%;
          animation-duration: 20s;
          animation-delay: -136s;
          transform-origin: -7vw 25vh;
          box-shadow: -100vmin 0 12.541660595853456vmin currentColor;
        }
        .background span:nth-child(4) {
          color: #0ea5e9;
          top: 18%;
          left: 35%;
          animation-duration: 326s;
          animation-delay: -127s;
          transform-origin: 16vw -11vh;
          box-shadow: -100vmin 0 12.864396198346908vmin currentColor;
        }
        .background span:nth-child(5) {
          color: #0ea5e9;
          top: 97%;
          left: 45%;
          animation-duration: 189s;
          animation-delay: -39s;
          transform-origin: 12vw -7vh;
          box-shadow: 100vmin 0 13.281391769027373vmin currentColor;
        }
        .background span:nth-child(6) {
          color: #0284c7;
          top: 41%;
          left: 36%;
          animation-duration: 380s;
          animation-delay: -259s;
          transform-origin: -8vw -16vh;
          box-shadow: -100vmin 0 12.680359482868536vmin currentColor;
        }
        .background span:nth-child(7) {
          color: #0ea5e9;
          top: 34%;
          left: 23%;
          animation-duration: 342s;
          animation-delay: -165s;
          transform-origin: 9vw 12vh;
          box-shadow: 100vmin 0 12.510094086786404vmin currentColor;
        }
        .background span:nth-child(8) {
          color: #0ea5e9;
          top: 98%;
          left: 7%;
          animation-duration: 302s;
          animation-delay: -133s;
          transform-origin: 13vw -8vh;
          box-shadow: -100vmin 0 12.787438017546677vmin currentColor;
        }
        .background span:nth-child(9) {
          color: #0284c7;
          top: 70%;
          left: 6%;
          animation-duration: 88s;
          animation-delay: -306s;
          transform-origin: 13vw -4vh;
          box-shadow: -100vmin 0 12.755407576353157vmin currentColor;
        }
        .background span:nth-child(10) {
          color: #0ea5e9;
          top: 25%;
          left: 46%;
          animation-duration: 270s;
          animation-delay: -121s;
          transform-origin: 22vw -14vh;
          box-shadow: -100vmin 0 12.582069161776307vmin currentColor;
        }
        .background span:nth-child(11) {
          color: #38bdf8;
          top: 6%;
          left: 100%;
          animation-duration: 320s;
          animation-delay: -331s;
          transform-origin: -14vw -17vh;
          box-shadow: 100vmin 0 13.011964891103647vmin currentColor;
        }
        .background span:nth-child(12) {
          color: #0ea5e9;
          top: 73%;
          left: 62%;
          animation-duration: 160s;
          animation-delay: -121s;
          transform-origin: 12vw 17vh;
          box-shadow: -100vmin 0 13.383139736421084vmin currentColor;
        }
        .background span:nth-child(13) {
          color: #0284c7;
          top: 51%;
          left: 16%;
          animation-duration: 322s;
          animation-delay: -182s;
          transform-origin: 5vw -23vh;
          box-shadow: 100vmin 0 12.841005593929088vmin currentColor;
        }
        .background span:nth-child(14) {
          color: #38bdf8;
          top: 93%;
          left: 51%;
          animation-duration: 373s;
          animation-delay: -35s;
          transform-origin: -19vw -23vh;
          box-shadow: 100vmin 0 12.75620315811938vmin currentColor;
        }
        .background span:nth-child(15) {
          color: #0ea5e9;
          top: 52%;
          left: 14%;
          animation-duration: 174s;
          animation-delay: -325s;
          transform-origin: 3vw 20vh;
          box-shadow: -100vmin 0 13.319480763413214vmin currentColor;
        }
        .background span:nth-child(16) {
          color: #0284c7;
          top: 13%;
          left: 14%;
          animation-duration: 197s;
          animation-delay: -285s;
          transform-origin: -5vw 20vh;
          box-shadow: -100vmin 0 13.065870635372894vmin currentColor;
        }
        .background span:nth-child(17) {
          color: #0284c7;
          top: 46%;
          left: 27%;
          animation-duration: 141s;
          animation-delay: -276s;
          transform-origin: -9vw -13vh;
          box-shadow: -100vmin 0 13.163732581611898vmin currentColor;
        }
        .background span:nth-child(18) {
          color: #0284c7;
          top: 15%;
          left: 94%;
          animation-duration: 45s;
          animation-delay: -215s;
          transform-origin: -19vw -11vh;
          box-shadow: 100vmin 0 12.952122070255735vmin currentColor;
        }
        .background span:nth-child(19) {
          color: #0ea5e9;
          top: 70%;
          left: 81%;
          animation-duration: 259s;
          animation-delay: -261s;
          transform-origin: -11vw 19vh;
          box-shadow: 100vmin 0 13.465584179435067vmin currentColor;
        }
        .background span:nth-child(20) {
          color: #38bdf8;
          top: 14%;
          left: 71%;
          animation-duration: 116s;
          animation-delay: -1s;
          transform-origin: 3vw 10vh;
          box-shadow: -100vmin 0 13.211147009771524vmin currentColor;
        }
        .background span:nth-child(21) {
          color: #38bdf8;
          top: 6%;
          left: 79%;
          animation-duration: 18s;
          animation-delay: -83s;
          transform-origin: 12vw 0vh;
          box-shadow: -100vmin 0 13.353916800738165vmin currentColor;
        }
        .background span:nth-child(22) {
          color: #0284c7;
          top: 27%;
          left: 79%;
          animation-duration: 132s;
          animation-delay: -160s;
          transform-origin: -10vw -8vh;
          box-shadow: -100vmin 0 12.969723484692866vmin currentColor;
        }
        .background span:nth-child(23) {
          color: #38bdf8;
          top: 16%;
          left: 19%;
          animation-duration: 86s;
          animation-delay: -108s;
          transform-origin: -16vw 25vh;
          box-shadow: 100vmin 0 13.419709855875391vmin currentColor;
        }
        .background span:nth-child(24) {
          color: #38bdf8;
          top: 49%;
          left: 7%;
          animation-duration: 95s;
          animation-delay: -202s;
          transform-origin: -21vw -24vh;
          box-shadow: 100vmin 0 12.522009238222104vmin currentColor;
        }
        .background span:nth-child(25) {
          color: #0ea5e9;
          top: 76%;
          left: 60%;
          animation-duration: 138s;
          animation-delay: -289s;
          transform-origin: 21vw -21vh;
          box-shadow: 100vmin 0 12.981216882454884vmin currentColor;
        }
        .background span:nth-child(26) {
          color: #0ea5e9;
          top: 52%;
          left: 58%;
          animation-duration: 378s;
          animation-delay: -378s;
          transform-origin: -19vw 21vh;
          box-shadow: -100vmin 0 13.266007563680366vmin currentColor;
        }
        .background span:nth-child(27) {
          color: #0284c7;
          top: 78%;
          left: 53%;
          animation-duration: 195s;
          animation-delay: -184s;
          transform-origin: -11vw -14vh;
          box-shadow: -100vmin 0 12.623006808126737vmin currentColor;
        }
        .background span:nth-child(28) {
          color: #38bdf8;
          top: 94%;
          left: 15%;
          animation-duration: 207s;
          animation-delay: -337s;
          transform-origin: 13vw -18vh;
          box-shadow: -100vmin 0 12.954899233480226vmin currentColor;
        }
        .background span:nth-child(29) {
          color: #38bdf8;
          top: 31%;
          left: 79%;
          animation-duration: 213s;
          animation-delay: -39s;
          transform-origin: -10vw -21vh;
          box-shadow: 100vmin 0 12.819183673868894vmin currentColor;
        }
        .background span:nth-child(30) {
          color: #0ea5e9;
          top: 3%;
          left: 5%;
          animation-duration: 214s;
          animation-delay: -57s;
          transform-origin: -24vw 7vh;
          box-shadow: -100vmin 0 13.253764104886864vmin currentColor;
        }
        .background span:nth-child(31) {
          color: #38bdf8;
          top: 9%;
          left: 36%;
          animation-duration: 89s;
          animation-delay: -249s;
          transform-origin: -1vw -23vh;
          box-shadow: -100vmin 0 12.929641367850767vmin currentColor;
        }
        .background span:nth-child(32) {
          color: #0ea5e9;
          top: 45%;
          left: 4%;
          animation-duration: 340s;
          animation-delay: -123s;
          transform-origin: -19vw 1vh;
          box-shadow: -100vmin 0 13.096510850714441vmin currentColor;
        }
        .background span:nth-child(33) {
          color: #38bdf8;
          top: 6%;
          left: 78%;
          animation-duration: 212s;
          animation-delay: -278s;
          transform-origin: 11vw -24vh;
          box-shadow: -100vmin 0 13.375403137494567vmin currentColor;
        }
        .background span:nth-child(34) {
          color: #0ea5e9;
          top: 71%;
          left: 34%;
          animation-duration: 248s;
          animation-delay: -353s;
          transform-origin: 16vw -15vh;
          box-shadow: 100vmin 0 13.212084687953965vmin currentColor;
        }
      `}</style>
    </main>
  )
}

export default SignInPage

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: { destination: "/" },
    }
  }

  const publication = await getClient().fetch(
    `*[_id == "452fd28b-edde-4887-9ff4-d4c7400f9978"]
    {
      title,
      logo,
      description,
      favicon,
      "mainMenu": mainMenu->{
        title,
        slug,
        "links": links[]->{
          title,
          url,
          parent,
          "children": *[_type == "menuLink" && references(^._id)]{
            title,
            url,
          }
        }
      }
    }`,
  )

  return {
    props: {
      publication: publication[0],
    },
  }
}
