/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import {
  client as mainnetClient,
  flsTokenAddress as mainnetFlsTokenAddress,
} from "@/viem/mainnet-client";
import { client as polygonClient } from "@/viem/polygon-client";
import {
  ALLOCATION_PER_SISTER_TOKEN,
  HUNNYS_CONTRACT,
  MERMAIDS_CONTRACT,
  METAVIXEN_BOOST,
  METAVIXEN_CONTRACT,
  OG_AGE_BOOST,
  OG_RANK_BOOST,
} from "@/features/claim/hooks/constants";
import { getFlsPoolAllocation } from "@/features/claim/hooks/useSnapshot";

import snapshot from "@/app/fame/admin/test-claim.json";
import { erc721Abi, formatEther } from "viem";
import { baseUrl } from "@/app/frames/frames";

function formatUnit(amount: bigint) {
  return Math.floor(Number(formatEther(amount)));
}

export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  const address = params.address as `0x${string}`;
  const [mainnetHunnys, mainnetMermaids, polygonMetavixens] = await Promise.all(
    [
      mainnetClient.readContract({
        abi: erc721Abi,
        address: HUNNYS_CONTRACT,
        functionName: "balanceOf",
        args: [address],
      }),
      mainnetClient.readContract({
        abi: erc721Abi,
        address: MERMAIDS_CONTRACT,
        functionName: "balanceOf",
        args: [address],
      }),
      polygonClient.readContract({
        abi: erc721Abi,
        address: METAVIXEN_CONTRACT,
        functionName: "balanceOf",
        args: [address],
      }),
    ]
  );

  const flsPoolAllocation = getFlsPoolAllocation(OG_RANK_BOOST, OG_AGE_BOOST);
  const lowerCaseAddress = address?.toLowerCase();
  const flsTokens = lowerCaseAddress
    ? snapshot
        .filter((item) => item.owner?.toLowerCase() === lowerCaseAddress)
        .map(({ tokenId }) => flsPoolAllocation.get(Number(tokenId))!)
    : [];
  const flsAllocation = flsTokens.reduce(
    (acc, allocation) => acc + allocation,
    0n
  );
  const hunnysAllocation = mainnetHunnys
    ? mainnetHunnys * ALLOCATION_PER_SISTER_TOKEN
    : 0n;
  const mermaidsAllocation = mainnetMermaids
    ? mainnetMermaids * ALLOCATION_PER_SISTER_TOKEN
    : 0n;
  const metavixensAllocation = polygonMetavixens
    ? polygonMetavixens * ALLOCATION_PER_SISTER_TOKEN * METAVIXEN_BOOST
    : 0n;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            justifyContent: "center",
            backgroundSize: "100% 100%",
            color: "black",
            fontFamily: "Roboto",
            fontWeight: 400,
            // red border
            border: "8px solid red",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              color: "black",
              flex: 1,
              overflow: "hidden",
            }}
          >
            <img
              src={`${baseUrl}/images/fame/banner.png`}
              style={{
                width: "100%",
                height: "35%",
              }}
            />
            <div
              style={{
                display: "block",
                flexGrow: 1,
              }}
            ></div>
            <p
              style={{
                fontSize: "64px",
                paddingLeft: "24px",
                paddingRight: "24px",
                width: "100%",
                margin: "0.125em 0",
              }}
            >
              {`FLS: ${formatUnit(flsAllocation).toLocaleString()}`}
            </p>
            <p
              style={{
                fontSize: "64px",
                paddingLeft: "24px",
                paddingRight: "24px",
                width: "100%",
                margin: "0.125em 0",
              }}
            >
              Hunnys: {formatUnit(hunnysAllocation).toLocaleString()}
            </p>
            <p
              style={{
                fontSize: "64px",
                paddingLeft: "24px",
                paddingRight: "24px",
                width: "100%",
                margin: "0.125em 0",
              }}
            >
              Mermaids: {formatUnit(mermaidsAllocation).toLocaleString()}
            </p>
            <p
              style={{
                fontSize: "64px",
                paddingLeft: "24px",
                paddingRight: "24px",
                width: "100%",
                margin: "0.125em 0",
              }}
            >
              Metavixens: {formatUnit(metavixensAllocation).toLocaleString()}
            </p>
            <p
              style={{
                fontSize: "64px",
                paddingLeft: "24px",
                paddingRight: "24px",
                width: "100%",
                margin: "0.125em 0",
              }}
            >
              Total $FAME:{" "}
              {formatUnit(
                flsAllocation +
                  hunnysAllocation +
                  mermaidsAllocation +
                  metavixensAllocation
              ).toLocaleString()}
            </p>
            <p
              style={{
                fontSize: "64px",
                paddingLeft: "24px",
                paddingRight: "24px",
                width: "100%",
                margin: "0.125em 0",
              }}
            >
              Total $FAME NFTs:{" "}
              {Math.floor(
                formatUnit(
                  flsAllocation +
                    hunnysAllocation +
                    mermaidsAllocation +
                    metavixensAllocation
                ) / 1_000_000
              )}
            </p>
            <div
              style={{
                display: "block",
                flexGrow: 1,
              }}
            ></div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1100,
      height: 1100,
    }
  );
}

export const dynamic = "force-dynamic";
