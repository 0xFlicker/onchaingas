import type { Metadata } from "next";
import { FameAdminPage } from "@/routes/FameAdmin";

export const metadata: Metadata = {
  title: "Fame admin page",
  description: "Admin page for Fame token launch",
};

export default async function Page({}: {}) {
  return <FameAdminPage />;
}

export const dynamic = "force-dynamic";
