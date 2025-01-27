import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { createTransport } from "nodemailer"

import { html, text } from "@lib/auth/emails"
import PrismaAdapter from "@lib/auth/prismaAdapter"
import prisma from "@lib/prisma"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const host = new URL(url)
        const transport = createTransport(provider.server)
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: "Sign in to QP Briefing",
          html: html({ url, host }),
          text: text({ url, host }),
        })
        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
          throw new Error("SEND_EMAIL_ERROR")
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session }) {
      const { email } = session.user
      if (email) {
        try {
          const data = await prisma.user.findUnique({
            where: {
              email,
            },
            include: {
              subscriptions: {
                include: {
                  subscription: {
                    include: {
                      permissions: true,
                    },
                  },
                },
              },
            },
          })
          if (data) {
            session.permissions = data.subscriptions
              .map((sub) => {
                return sub.subscription.permissions.map((perm) => perm.name)
              })
              .flat()
            session.user.role = data.role
            session.user.id = data.id
          }
        } catch (error) {
          // no-op
        }
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
