import type { Metadata } from "next";
import { FamePresale } from "@/routes/FamePresale";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.OG_BASE_URL!),
    title: "$FAME",
    description: "The FAMEus Presale",
  };
}

export default async function Page() {
  return <FamePresale network="sepolia" />;
}
