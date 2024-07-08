import { createFrames } from "frames.js/next";

export const baseUrl = process.env.OG_BASE_URL!;

export const frames = createFrames({
  basePath: baseUrl,
});
