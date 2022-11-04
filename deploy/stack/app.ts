#!/usr/bin/env node

import * as cdk from "aws-cdk-lib";
import { jsonFromSecret } from "./utils/files.js";

import { WwwStack } from "./www.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = new cdk.App();

new WwwStack(app, "onchain-www", {
  domain: "0xflick.xyz",
  serverlessBuildOutDir: path.resolve(__dirname, "../.layers"),
  withLogging: true,
  whiteListedHeaders: ["Authorization", "Host", "Content-Type", "Accept"],
  env: {
    region: "us-east-1",
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
