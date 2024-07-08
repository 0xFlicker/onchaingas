This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, create a new local .env.local file

```bash
cp .env.example .env.local
```

### RPC keys

Signup for infura.io and alchemy.com (free accounts). Create an ethereum RPC for each and get API keys.

### optional

The etherscan.io API key, which is only needed to generate new wagmi generated files, for example when a new smart contract is added to [wagmi.config.ts](./wagmi.config.ts). For must development, this can be left blank.

Finally, run the development server:

```bash

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
