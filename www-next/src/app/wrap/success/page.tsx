import { WrapSuccessPage } from "@/routes/WrapSuccess";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "It's a wrap!",
  description: "Thank you for wrapping your Fame Lady.",
};

export default async function Page() {
  return <WrapSuccessPage />;
}
