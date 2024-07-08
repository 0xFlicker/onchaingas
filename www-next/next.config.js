/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    LOG_LEVEL: "debug",
    OG_BASE_URL: process.env.OG_BASE_URL || "https://fls-www.vercel.app",
  },
  webpack: (config) => {
    // config.externals.push("tls", "net", "fs", "path");
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname:
          "fls-prod-imagestoragef1b24905-1ftqhtk2cy7nl.s3.amazonaws.com",
      },
      {
        hostname: "ipfs.io",
        pathname:
          "/ipfs/bafybeifrehxmpmvh4hiywtpmuuuvt4lotol7wl7dnxlsxikfevn2ivvm7m/*.png",
      },
      {
        hostname: "ipfs.fameladysociety.com",
      },
    ],
  },
};

// Injected content via Sentry wizard below

// const { withSentryConfig } = require("@sentry/nextjs");

// module.exports = withSentryConfig(
//   module.exports,
//   {
//     // For all available options, see:
//     // https://github.com/getsentry/sentry-webpack-plugin#options

//     // Suppresses source map uploading logs during build
//     silent: true,
//     org: "bitflick",
//     project: "fls-nextjs",
//   },
//   {
//     // For all available options, see:
//     // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

//     // Upload a larger set of source maps for prettier stack traces (increases build time)
//     widenClientFileUpload: true,

//     // Transpiles SDK to be compatible with IE11 (increases bundle size)
//     transpileClientSDK: true,

//     // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
//     // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
//     // side errors will fail.
//     tunnelRoute: "/monitoring",

//     // Hides source maps from generated client bundles
//     hideSourceMaps: true,

//     // Automatically tree-shake Sentry logger statements to reduce bundle size
//     disableLogger: true,

//     // Enables automatic instrumentation of Vercel Cron Monitors.
//     // See the following for more information:
//     // https://docs.sentry.io/product/crons/
//     // https://vercel.com/docs/cron-jobs
//     automaticVercelMonitors: true,
//   },
// );
