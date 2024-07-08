import { NextResponse, NextRequest } from "next/server";
import { fetchAllOwners } from "@/service/fameClaimData";
import { zeroAddress } from "viem";

export async function GET(req: NextRequest) {
  let data = await fetchAllOwners();
  data = data.filter((item) => item.owner && item.owner !== zeroAddress);
  data.sort((a, b) => Number(a.tokenId) - Number(b.tokenId));

  let csvData = `tokenId,owner\n`;
  for (const item of data) {
    if (!item.owner) continue;
    csvData += `${item.tokenId},${item.owner}\n`;
  }
  const response = new NextResponse(csvData, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": "attachment; filename=addresses.csv",
    },
  });
  return response;
}

export const dynamic = "force-dynamic";
