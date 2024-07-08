import { NextResponse, NextRequest } from "next/server";
import { fetchBannedTokenIds } from "@/service/fetchAllocationData";

export async function GET(req: NextRequest) {
  const data = await fetchBannedTokenIds();
  const response = new NextResponse(JSON.stringify(data.map(Number)), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": "attachment; filename=banned.json",
    },
  });
  return response;
}

export const dynamic = "force-dynamic";
