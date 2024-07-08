/* eslint-disable @next/next/no-img-element */
import { asNetwork } from "@/routes/utils";
import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";
import {
  client as mainnetClient,
  flsTokenAddress as mainnetFlsTokenAddress,
} from "@/viem/mainnet-client";
import {
  client as sepoliaClient,
  flsTokenAddress as sepoliaFlsTokenAddress,
} from "@/viem/sepolia-client";
import { ContractFunctionExecutionError, erc721Abi, formatEther } from "viem";
import { IMetadata, thumbnailImageUrl } from "@/utils/metadata";
import { fetchJson } from "@/ipfs/client";
import { getFlsPoolAllocation } from "@/features/claim/hooks/useSnapshot";
import { OG_AGE_BOOST, OG_RANK_BOOST } from "@/features/claim/hooks/constants";
import { isBannedToken } from "@/service/bannedTokenIds";

export async function GET(
  req: NextRequest,
  { params }: { params: { tokenId: string; network: string } },
) {
  const network = asNetwork(params.network);
  if (network === null) {
    console.log("network not found");
    return new NextResponse("Not Found", { status: 404 });
  }
  const viemClient = network === "mainnet" ? mainnetClient : sepoliaClient;
  const flsTokenAddress =
    network === "mainnet" ? mainnetFlsTokenAddress : sepoliaFlsTokenAddress;

  const tokenId = params.tokenId;

  try {
    let isWrapped = true;
    const [[ensName, ensAvatar], metadata] = await Promise.all([
      viemClient
        .readContract({
          abi: erc721Abi,
          address: flsTokenAddress,
          functionName: "ownerOf",
          args: [BigInt(tokenId)],
        })
        .catch((err) => {
          if (err instanceof ContractFunctionExecutionError) {
            isWrapped = false;
            return null;
          }
          throw err;
        })
        .then(async (owner) => {
          if (owner) {
            const ensName = await viemClient.getEnsName({
              address: owner,
            });
            const ensAvatar = ensName
              ? await viemClient.getEnsAvatar({
                  name: ensName,
                })
              : null;
            return [ensName, ensAvatar] as const;
          }
          return [null, null] as const;
        }),
      viemClient
        .readContract({
          abi: erc721Abi,
          address: flsTokenAddress,
          functionName: "tokenURI",
          args: [BigInt(tokenId)],
        })
        .then(async (tokenUri) => {
          const metadata = await fetchJson<IMetadata>({
            cid: tokenUri.replace("ipfs://", ""),
          });
          return metadata;
        }),
    ]);

    const ogRank = metadata.attributes?.find(
      (attr) => attr.trait_type === "OG Rank",
    );

    const flsTokenAllocation = getFlsPoolAllocation(
      OG_RANK_BOOST,
      OG_AGE_BOOST,
    );
    const t = Number(tokenId);
    const allocation = flsTokenAllocation.get(t) ?? 0n;
    const allocationStr = `Allocation: ${Number(formatEther(allocation).split(".")[0]).toLocaleString("en").replaceAll(",", " ")} $FAME`;
    const fontSize = allocationStr.length > 26 ? "24px" : "32px";
    const banned = isBannedToken(t);

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
              backgroundImage: `url('${thumbnailImageUrl(tokenId)}')`,
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
                alignItems: "center",
                color: "black",
                flex: 1,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignContent: "flex-start",
                  width: "100%",
                }}
              >
                <h1
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: "24px",
                    // shadow
                    textShadow: "2px 2px 3px #000000",
                  }}
                >
                  {metadata.name}
                </h1>
              </div>
              <div
                style={{
                  display: "block",
                  flexGrow: 1,
                }}
              ></div>
              {!isWrapped && !banned && (
                <p
                  style={{
                    fontSize: "24px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    width: "100%",
                    margin: "0.125em 0",
                  }}
                >
                  This token needs to be wrapped to be eligible for a claim to
                  $FAME
                </p>
              )}
              <p
                style={{
                  fontSize,
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  width: "100%",
                  margin: "0.125em 0", // Adjust this value to change the line spacing
                }}
              >
                {banned
                  ? "This token was owned by the prior team and is not eligible for a claim to $FAME"
                  : allocationStr}
              </p>
              <div
                style={{
                  display: "block",
                  flexGrow: 1,
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "flex-end",
                  width: "100%",
                  paddingBottom: "24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {ensAvatar && (
                    <img
                      src={ensAvatar}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        alignSelf: "center",
                        justifySelf: "center",
                        marginLeft: "24px",
                      }}
                      alt=""
                    />
                  )}
                  {ensName ? (
                    <p
                      style={{
                        marginLeft: "24px",
                        fontSize: ensName.length > 18 ? "24px" : "32px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {ensName}
                    </p>
                  ) : null}
                </div>
                {ogRank && (
                  <>
                    <p
                      style={{
                        justifySelf: "center",
                        alignSelf: "center",
                        marginRight: "12px",
                        fontSize: "24px",
                      }}
                    >
                      Rank
                    </p>

                    <div
                      style={{
                        backgroundImage: `url(${process.env.OG_BASE_URL}/images/badge.png)`,
                        backgroundSize: "100% 100%",
                        // image is 400, but scale to 100x100
                        width: "100px",
                        height: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "24px",
                        fontSize:
                          ogRank.value.toString().length > 2 ? "24px" : "32px",
                      }}
                    >
                      <p>{`#${ogRank.value}`}</p>
                    </div>
                  </>
                )}
              </div>
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
    // no owner, token does not exist
    // do better
    console.error(error);
    return new NextResponse("Not Found", { status: 404 });
  }
}

export const dynamic = "force-dynamic";
