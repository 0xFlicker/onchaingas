#!/usr/bin/env node
import "source-map-support/register.js";
import { parse } from "dotenv"
import { spawnSync } from 'child_process';
import { unlinkSync, writeFileSync, renameSync } from "fs";
import pkg from '@sls-next/lambda-at-edge';
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const { Builder } = pkg;
const __dirname = dirname(fileURLToPath(import.meta.url));

const deployment = process.argv[2];
if (!deployment) {
  console.log("Please provide a domain name");
  process.exit(1);
}
if (!["fls.0xflick.com", "fameladysociety.com"].includes(deployment)) {
  throw new Error(`Invalid domain ${deployment}`);
}

try {
  renameSync(resolve(__dirname, "./.env.local"), resolve(__dirname, "./.env.backup"));
  const { stdout } = spawnSync("sops", ["--decrypt", `.env.${deployment}.enc`], {
    env: process.env,
    cwd: __dirname,
  });
  const env = parse(stdout);
  process.env = { ...process.env, ...env, DEPLOYMENT: deployment };
  const builder = new Builder(
    ".",
    "../../deploy/.layers/fls",
    {
      args: ["build", "--no-lint"],

    }
  );
  await builder
    .build();
  console.log("Build complete");
} catch (error) {
  console.error(error);
} finally {
  renameSync(resolve(__dirname, "./.env.backup"), resolve(__dirname, "./.env.local"));
}
