import { type NextRequest, NextResponse } from "next/server";
import { type IMetadata } from "@/utils/metadata";

interface Params {
  tokenId: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { tokenId } = params;
  const { createHmac } = await import("crypto");

  return NextResponse.json<IMetadata>({
    id: Number(tokenId),
    name: `Schwing #${tokenId}`,
    image: `${process.env.OG_BASE_URL}/schwing/token.jpg`,
    animation_url: `${process.env.OG_BASE_URL}/schwing/index.html?id=0x${createHmac("sha256", process.env.SEED_SECRET!).update(tokenId).digest("hex")}`,
  });
}
