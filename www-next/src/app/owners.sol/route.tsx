import { NextResponse, NextRequest } from "next/server";
import { fetchAllOwners } from "@/service/fameClaimData";
import { zeroAddress, checksumAddress } from "viem";

export async function GET(req: NextRequest) {
  let data = await fetchAllOwners();
  data = data.filter((item) => item.owner && item.owner !== zeroAddress);

  const owners = new Set<string>();
  for (const item of data) {
    const address = checksumAddress(item.owner);
    owners.add(address);
  }

  const sol = `// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract FameLadySocietyOwners {
    function allOwners() public pure returns (address[] memory) {
        address[] memory owners = new address[](${owners.size});
${[...owners].map((owner, index) => `        owners[${index}] = ${owner};`).join("\n")}
        return owners;
    }
}

  `;
  const response = new NextResponse(sol, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": "attachment; filename=FameLadySocietyOwners.sol",
    },
  });
  return response;
}

export const dynamic = "force-dynamic";
