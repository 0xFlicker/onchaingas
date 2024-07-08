import { NextResponse, NextRequest } from "next/server";
import { fetchFameClaimData } from "@/service/fameClaimData";

export async function GET(req: NextRequest) {
  const data = await fetchFameClaimData();
  let csvData = `tokenId,ogRank,blockHeightMinted,blockTimestampMinted,owner\n`;
  for (const item of data) {
    csvData += `${item.tokenId},${item.ogRank},${item.blockHeightMinted ?? ""},${item.blockTimestampMinted ?? ""},${item.owner ?? ""}\n`;
  }
  const response = new NextResponse(csvData, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": "attachment; filename=claim.csv",
    },
  });
  return response;
}

export const dynamic = "force-dynamic";
