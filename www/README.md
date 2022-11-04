# 0xflick www

The frontend.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev:start
```

Open [https://localhost:9000](https://localhost:9000) with your browser to see the result. Secure context is needed for auth

## Structure

 - [app](./src/app/) -- Core redux app bindings
 - [context](./src/context/) -- Default providers for React context
 - [features](./src/features/) -- Groups of related redux, api, hooks and components
 - [graphql](./src/graphql/) -- Apollo client
 - [hooks](./src/hooks/) -- Global app hooks
 - [layouts](./src/layouts) --  Common page layouts
 - [locales](./src/locales/) -- Language files (still only in english)
 - [pages](./src/pages/) -- Next.JS routing
 - [styles]

## Building

Production build:
```
yarn build
```
