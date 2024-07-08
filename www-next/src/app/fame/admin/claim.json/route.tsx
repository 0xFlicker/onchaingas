import { NextResponse, NextRequest } from "next/server";
import { fetchFameClaimData } from "@/service/fameClaimData";

export async function GET(req: NextRequest) {
  const data = await fetchFameClaimData();
  const response = new NextResponse(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": "attachment; filename=claim.json",
    },
  });
  return response;
}

export const dynamic = "force-dynamic";
