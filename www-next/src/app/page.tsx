import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.OG_BASE_URL!),
  title: "Fame Lady Society",
  description: "Unstoppable",
  openGraph: {
    images: ["https://fameladysociety.com/images/fls-wrap.gif"],
    siteName: "#itsawrap",
    title: "Fame Lady Society",
    description: "Unstoppable",
  },
  other: {
    ["twitter:title"]: "Fame Lady Society",
    ["twitter:description"]: "FAQ",
    ["twitter:image"]:
      "https://fameladysociety.com/images/Flsociety_morg_mock.jpeg",
    ["twitter:card"]: "summary_large_image",
    ["twitter:site"]: "@FameLadySociety",
    ["twitter:creator"]: "@0xflick",
  },
};

export { default } from "@/routes/Home";
