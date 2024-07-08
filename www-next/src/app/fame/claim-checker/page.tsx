import type { Metadata } from "next";
import FameClaimChecker from "@/routes/FameClaimChecker";

export const metadata: Metadata = {
  title: "Fame claim checker page",
  description: "Claim checker for Fame token launch",
};

export default async function Page({}: {}) {
  return <FameClaimChecker />;
}

export const dynamic = "force-dynamic";
