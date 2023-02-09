#!/usr/bin/env node
import pkg from '@sls-next/lambda-at-edge';
import 'dotenv/config';
const { Builder } = pkg;

try {
  const builder = new Builder(
    ".",
    "../deploy/.layers",
    {
      args: ["build", "--no-lint"],
    }
  );
  await builder
    .build();
  console.log("Build complete");
} catch (error) {
  console.error(error);
}
