import { NextResponse, NextRequest } from "next/server";
import { zeroAddress, checksumAddress } from "viem";
import { onChainCheckGasAddress } from "@/wagmi";
import { fetchAllOwnersIterable } from "@/service/fetchAllOwnersIterable";

export async function GET(req: NextRequest) {
  let data = await fetchAllOwnersIterable({
    contractAddress: onChainCheckGasAddress[1],
  });
  // data = data.filter((item) => item.owner && item.owner !== zeroAddress);
  const owners = [...data.keys()].filter((owner) => owner !== zeroAddress);

  const sol = `// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract OnChainCheckGasOwners {
    mapping(address => uint256) public balanceOf;

    constructor() {
${[...data]
  .map(([owner, amount]) => `        balanceOf[${owner}] = ${amount};`)
  .join("\n")}
    }
    function allOwners() public pure returns (address[] memory) {
        address[] memory owners = new address[](${data.size});
${[...data.keys()].map((owner, index) => `        owners[${index}] = ${owner};`).join("\n")}
        return owners;
    }
}

  `;
  const response = new NextResponse(sol, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": "attachment; filename=OnChainCheckGasOwners.sol",
    },
  });
  return response;
}

export const dynamic = "force-dynamic";
