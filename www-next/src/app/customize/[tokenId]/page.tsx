import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Customize Lady",
  description: "Customize your Fame Lady.",
};

export default async function Page({
  params,
}: {
  params: { tokenId: string; network: string };
}) {
  redirect(`/mainnet/customize/${params.tokenId}`);
}
