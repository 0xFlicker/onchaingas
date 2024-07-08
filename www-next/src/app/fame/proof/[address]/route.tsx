import { NextRequest, NextResponse } from "next/server";
import { MerkleTree } from "merkletreejs";
import { isAddress, keccak256, toHex, toBytes, getAddress } from "viem";
import flsOwners from "./fls-snapshot.json";

type Props = {
  params: {
    address: string;
  };
};

export async function GET(req: NextRequest, { params }: Props) {
  let { address } = params;
  if (!isAddress(address)) {
    return new NextResponse("Invalid address", { status: 400 });
  }
  address = getAddress(address);
  let leaf: null | string = null;
  const leafs: `0x${string}`[] = [];
  for (const owner of flsOwners) {
    const that = keccak256(toBytes(owner));
    if (getAddress(owner) === address) {
      leaf = that;
    }
    leafs.push(that);
  }

  const tree = new MerkleTree(
    flsOwners.map((x) => keccak256(toBytes(x))),
    keccak256,
    {
      sort: true,
    },
  );

  const proof = leaf ? tree.getHexProof(leaf) : [];

  return new NextResponse(JSON.stringify(proof), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
