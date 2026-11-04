import Wrap from "@/routes/Wrap";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Wrap Your Lady",
  description: "Wrap your Fame Lady.",
};

export default async function Page(
  props: {
    params: Promise<{ network: string }>;
  }
) {
  const params = await props.params;
  const { network } = params;
  let resolvedNetwork: "sepolia" | "mainnet";
  switch (network) {
    case "sepolia": {
      resolvedNetwork = "sepolia";
      break;
    }
    case "mainnet": {
      resolvedNetwork = "mainnet";
      break;
    }
    default: {
      redirect(`/mainnet/wrap`);
    }
  }
  return <Wrap network={resolvedNetwork} />;
}
