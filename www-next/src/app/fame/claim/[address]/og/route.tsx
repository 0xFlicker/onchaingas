/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";
import { client as mainnetClient } from "@/viem/mainnet-client";
import { client as baseClient } from "@/viem/base-client";
import { formatEther, isAddress, parseEther } from "viem";
import { fetchAllocationData } from "@/service/fetchAllocationData";
import { CSSProperties } from "react";
import { baseUrl } from "@/app/frames/frames";
import { fameSaleAbi, fameSaleTokenAbi } from "@/wagmi";
import {
  fameSaleAddress,
  fameSaleTokenAddress,
} from "@/features/fame/contract";
import { presaleAmountToTokens } from "@/utils/fame";

const formatAllocationString = (amount: bigint) =>
  `${Number(formatEther(amount).split(".")[0]).toLocaleString("en").replaceAll(",", " ")} $FAME`;
function formatUnit(amount: bigint) {
  return Math.floor(Number(formatEther(amount)));
}
export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } },
) {
  const viemClient = mainnetClient;

  if (!isAddress(params.address)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    const ensName = await viemClient.getEnsName({
      address: params.address,
    });
    const ensAvatar = ensName
      ? await viemClient.getEnsAvatar({
          name: ensName,
        })
      : null;

    const [
      {
        flsAllocation,
        squadTotal,
        hunnysAllocation,
        mermaidsAllocation,
        metavixensAllocation,
        total: allocationTotal,
      },
      presaleBalance,
      maxRaise,
    ] = await Promise.all([
      fetchAllocationData({
        address: params.address,
      }),
      baseClient.readContract({
        abi: fameSaleTokenAbi,
        address: fameSaleTokenAddress(8453),
        functionName: "balanceOf",
        args: [params.address],
      }),
      baseClient.readContract({
        abi: fameSaleAbi,
        address: fameSaleAddress(8453),
        functionName: "maxRaise",
      }),
    ]);

    const flsAllocationStr = formatAllocationString(flsAllocation);
    const squadAllocationStr = formatAllocationString(squadTotal);
    const hunnysAllocationStr = formatAllocationString(hunnysAllocation);
    const mermaidsAllocationStr = formatAllocationString(mermaidsAllocation);
    const metavixensAllocationStr =
      formatAllocationString(metavixensAllocation);

    const presaleTokens = presaleAmountToTokens(presaleBalance, maxRaise);

    const total = allocationTotal + presaleTokens;
    const totalAllocationStr = formatAllocationString(total);
    const totalNftsStr = `${Math.floor(formatUnit(total) / 1_000_000)}`;

    const fontSize =
      Math.max(
        flsAllocationStr.length,
        squadAllocationStr.length,
        hunnysAllocationStr.length,
        mermaidsAllocationStr.length,
        metavixensAllocationStr.length,
        totalAllocationStr.length,
      ) > 26
        ? "24px"
        : "32px";

    const commonStyle = {
      fontSize,
      paddingLeft: "24px",
      margin: "0.125em 0", // Adjust this value to change the line spacing
    };

    const flexColumnStyle: CSSProperties = {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    } as const;

    const flexGrowStyle = {
      display: "block",
      flexGrow: 1,
    };

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
              width: "50%",
              height: "100%",
              backgroundColor: "slate-700",
              justifyContent: "center",
              backgroundImage: `url('${ensAvatar || `${baseUrl}/images/fame/bala.png`}')`,
              backgroundSize: "100% 100%",
              color: "black",
              fontFamily: "Roboto",
              fontWeight: 400,
              // red border
              border: "8px solid red",
            }}
          />
          <div
            style={{
              display: "flex",
              width: "50%",
              height: "100%",
              backgroundColor: "white",
              justifyContent: "center",
              backgroundSize: "100% 100%",
              color: "black",
              fontFamily: "Roboto",
              fontWeight: 400,
              // red border
              borderTop: "8px solid red",
              borderBottom: "8px solid red",
              borderRight: "8px solid red",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
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
              <div style={{ ...flexGrowStyle }} />
              {flsAllocation && flsAllocationStr ? (
                <div style={{ ...flexColumnStyle }}>
                  <p style={{ ...commonStyle }}>FL Society:</p>
                  <p style={{ ...commonStyle }}>{flsAllocationStr}</p>
                </div>
              ) : null}

              {squadTotal && squadAllocationStr ? (
                <div style={{ ...flexColumnStyle }}>
                  <p style={{ ...commonStyle }}>FL Squad:</p>
                  <p style={{ ...commonStyle }}>{squadAllocationStr}</p>
                </div>
              ) : null}
              {squadTotal ? (
                <p style={{ ...commonStyle }}>(if wrapped)</p>
              ) : null}

              {hunnysAllocation && hunnysAllocationStr ? (
                <div style={{ ...flexColumnStyle }}>
                  <p style={{ ...commonStyle }}>Hunnys:</p>
                  <p style={{ ...commonStyle }}>{hunnysAllocationStr}</p>
                </div>
              ) : null}

              {mermaidsAllocation && mermaidsAllocationStr ? (
                <div style={{ ...flexColumnStyle }}>
                  <p style={{ ...commonStyle }}>Mermaid:</p>
                  <p style={{ ...commonStyle }}>{mermaidsAllocationStr}</p>
                </div>
              ) : null}

              {metavixensAllocation && metavixensAllocationStr ? (
                <div style={{ ...flexColumnStyle }}>
                  <p style={{ ...commonStyle }}>Metavixen:</p>
                  <p style={{ ...commonStyle }}>{metavixensAllocationStr}</p>
                </div>
              ) : null}

              {presaleTokens ? (
                <div style={{ ...flexColumnStyle }}>
                  <p style={{ ...commonStyle }}>Presale:</p>
                  <p style={{ ...commonStyle }}>
                    {formatAllocationString(presaleTokens)}
                  </p>
                </div>
              ) : null}

              {total && totalAllocationStr ? (
                <div style={{ ...flexColumnStyle }}>
                  <p style={{ ...commonStyle }}>Total:</p>
                  <p style={{ ...commonStyle }}>{totalAllocationStr}</p>
                </div>
              ) : (
                <p style={{ ...commonStyle, width: "100%" }}>No allocation</p>
              )}

              {total >= parseEther("1000000") && totalNftsStr ? (
                <div style={{ ...flexColumnStyle }}>
                  <p style={{ ...commonStyle }}>Total Society NFTs:</p>
                  <p style={{ ...commonStyle }}>{totalNftsStr}</p>
                </div>
              ) : null}
              <div style={{ ...flexGrowStyle }} />
            </div>
          </div>
        </div>
      ),
      {
        width: 1100,
        height: 576,
      },
    );
  } catch (error) {
    console.error("Error while fetching data for address", error);
    return new NextResponse("Not Found", { status: 404 });
  }
}

export const dynamic = "force-dynamic";
