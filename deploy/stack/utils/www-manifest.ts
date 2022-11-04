import path from "path";
import fs from "fs";
import { readJSONSync } from "./files.js";
import {
  OriginRequestApiHandlerManifest,
  OriginRequestDefaultHandlerManifest,
  OriginRequestImageHandlerManifest,
  PreRenderedManifest,
  RoutesManifest,
} from "./www-types.js";

export function pathPattern(pattern: string, basePath: string): string {
  return basePath && basePath.length > 0
    ? `${basePath.slice(1)}/${pattern}`
    : pattern;
}

export function readRoutesManifest(
  serverlessBuildOutDir: string
): RoutesManifest {
  return readJSONSync(
    path.join(serverlessBuildOutDir, "default-lambda/routes-manifest.json")
  );
}

export function readDefaultManifest(
  serverlessBuildOutDir: string
): OriginRequestDefaultHandlerManifest {
  return readJSONSync(
    path.join(serverlessBuildOutDir, "default-lambda/manifest.json")
  );
}

export function readPrerenderManifest(
  serverlessBuildOutDir: string
): PreRenderedManifest {
  return readJSONSync(
    path.join(serverlessBuildOutDir, "default-lambda/prerender-manifest.json")
  );
}

export function readApiBuildManifest(
  serverlessBuildOutDir: string
): OriginRequestApiHandlerManifest | null {
  const apiPath = path.join(serverlessBuildOutDir, "api-lambda/manifest.json");
  if (!fs.existsSync(apiPath)) return null;
  return readJSONSync(apiPath);
}

export function readImageBuildManifest(
  serverlessBuildOutDir: string
): OriginRequestImageHandlerManifest | null {
  const imageLambdaPath = path.join(
    serverlessBuildOutDir,
    "image-lambda/manifest.json"
  );

  return fs.existsSync(imageLambdaPath) ? readJSONSync(imageLambdaPath) : null;
}
