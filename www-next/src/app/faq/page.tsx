import { type Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.OG_BASE_URL!),
    title: "Fame Lady Society",
    description: "FAQ",
    openGraph: {
      siteName: "#itsawrap",
      title: "Fame Lady Society",
      description: "Fame Lady Society",
      images: [
        {
          url: "https://fameladysociety.com/images/fls-wrap.gif",
          width: 800,
          height: 600,
          alt: "Fame Lady Society",
        },
      ],
    },
    other: {
      ["twitter:title"]: "Fame Lady Society",
      ["twitter:description"]: "FAQ",
      ["twitter:image"]:
        "https://fameladysociety.com/images/Flsociety_morg_mock.jpeg",
      ["twitter:card"]: "summary_large_image",
      ["twitter:creator"]: "@FameLadySociety",
    },
  };
}

export { FaqPage as default } from "@/routes/Faq";
