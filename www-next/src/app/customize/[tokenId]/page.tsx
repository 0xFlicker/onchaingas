import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Customize Lady",
  description: "Customize your Fame Lady.",
};

export default async function Page(
  props: {
    params: Promise<{ tokenId: string; network: string }>;
  }
) {
  const params = await props.params;
  redirect(`/mainnet/customize/${params.tokenId}`);
}
