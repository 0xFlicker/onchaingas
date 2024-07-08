import { NextResponse, NextRequest } from "next/server";
import { fetchAllOwners } from "@/service/fameClaimData";
import { zeroAddress } from "viem";

export async function GET(req: NextRequest) {
  let data = await fetchAllOwners();
  data = data.filter((item) => item.owner && item.owner !== zeroAddress);

  const owners = new Map<string, number>();
  for (const item of data) {
    owners.set(item.owner, (owners.get(item.owner) ?? 0) + 1);
  }

  let csvData = `owner,amount\n`;
  for (const [owner, amount] of [...owners.entries()].sort(
    (a, b) => b[1] - a[1],
  )) {
    if (!owner) continue;
    csvData += `${owner},${amount}\n`;
  }
  const response = new NextResponse(csvData, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": "attachment; filename=owners.csv",
    },
  });
  return response;
}

export const dynamic = "force-dynamic";
