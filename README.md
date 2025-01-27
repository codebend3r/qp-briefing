# QP Briefing

This is the official QP Briefing web app.

[![Pull Requests](https://github.com/iPolitics-Ltd/qp-briefing/actions/workflows/pr.yml/badge.svg?branch=main)](https://github.com/iPolitics-Ltd/qp-briefing/actions/workflows/pr.yml)

## Getting Started

Install global dependencies

```sh
npm i -g pnpm # pnpm package manager
```

---

## Make Sure Everything Works

_all commands go through **bun**, bun is another package manager like npm and yarn_

> See more about bun: https://bun.io/

For example, this command will run all CI checks locally through bun

```sh
pnpm system-check
```

---

## Install Dependencies

```sh
pnpm i
```

---

## Run Local Dev Server

First, run the development server:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

---

## Build Project

Create a build

```sh
pnpm run build
```

If you want to simulate a build on Vercel (a production build), you can run this command:

```sh
pnpm build:production
```

This will run prisma generate and buld

---

## Lint

This will run ESLint on the entire project

```sh
pnpm lint
```

---

## Prettier

This will run Prettier on the entire project

```sh
pnpm prettier
```

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
