export default function PrismaAdapter(p) {
  return {
    createUser: (data) => p.user.create({ data }),
    getUser: (id) => p.user.findUnique({ where: { id } }),
    getUserByEmail: (email) => p.user.findUnique({ where: { email } }),
    async getUserByAccount(provider_providerAccountId) {
      var _a
      const account = await p.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: true },
      })
      return (_a = account === null || account === void 0 ? void 0 : account.user) !== null && _a !== void 0 ? _a : null
    },
    updateUser: ({ id, ...data }) => p.user.update({ where: { id }, data }),
    deleteUser: (id) => p.user.delete({ where: { id } }),
    linkAccount: (data) => p.account.create({ data }),
    unlinkAccount: (provider_providerAccountId) =>
      p.account.delete({
        where: { provider_providerAccountId },
      }),
    async getSessionAndUser(sessionToken) {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      })
      if (!userAndSession) return null
      const { user, ...session } = userAndSession
      return { user, session }
    },
    createSession: (data) => p.session.create({ data }),
    updateSession: (data) => p.session.update({ where: { sessionToken: data.sessionToken }, data }),
    deleteSession: (sessionToken) => p.session.delete({ where: { sessionToken } }),
    async createVerificationToken(data) {
      const verificationToken = await p.verificationToken.create({ data })
      // @ts-expect-errors // MongoDB needs an ID, but we don't
      // if (verificationToken.id)
      //     delete verificationToken.id;
      return verificationToken
    },
    async useVerificationToken(identifier_token) {
      try {
        const verificationToken = await p.verificationToken.findUnique({
          where: { identifier_token },
        })
        // @ts-expect-errors // MongoDB needs an ID, but we don't
        // if (verificationToken.id)
        // delete verificationToken.id;
        return verificationToken
      } catch (error) {
        // If token already used/deleted, just return null
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        if (error.code === "P2025") return null
        throw error
      }
    },
  }
}
