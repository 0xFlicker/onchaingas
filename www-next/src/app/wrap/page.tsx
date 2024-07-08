import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Wrap Your Lady",
  description: "Wrap your Fame Lady.",
};

export default async function Page({
  params,
}: {
  params: { network: string };
}) {
  redirect(`/mainnet/wrap`);
  return null;
}
