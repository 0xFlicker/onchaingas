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
import { erc721Abi } from "viem";
import { IMetadata, defaultDescription, imageUrl } from "@/utils/metadata";
import { fetchJson } from "@/ipfs/client";

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
    const [[owner, ensName, ensAvatar], metadata] = await Promise.all([
      viemClient
        .readContract({
          abi: erc721Abi,
          address: flsTokenAddress,
          functionName: "ownerOf",
          args: [BigInt(tokenId)],
        })
        .then(async (owner) => {
          const ensName = await viemClient.getEnsName({
            address: owner,
          });
          const ensAvatar = ensName
            ? await viemClient.getEnsAvatar({
                name: ensName,
              })
            : null;
          return [owner, ensName, ensAvatar];
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
    const chunks = metadata.description?.split(defaultDescription);
    let description: string | null = null;
    if (chunks && chunks.length > 1) {
      description = chunks[0].trim();
    }
    const ogRank = metadata.attributes?.find(
      (attr) => attr.trait_type === "OG Rank",
    );
    const paragraphs = (description ? description : defaultDescription).split(
      /\n+/,
    );
    let fontSize;
    if (description && description.length > 800) {
      fontSize = 14;
    } else if (description && description.length > 512) {
      fontSize = 16;
    } else {
      fontSize = 20;
    }

    fontSize -= Math.floor(paragraphs.length / 2);
    fontSize = Math.max(fontSize, 8);

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
              backgroundImage: `url('${imageUrl(tokenId)}')`,
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
                    textShadow: "2px 2px 6px #000000",
                  }}
                >
                  {metadata.name}
                </h1>
              </div>

              {paragraphs.map((paragraph, index) =>
                paragraph.trim() === "" ? (
                  <br key={index} style={{ marginBottom: "0.75em" }} />
                ) : (
                  <p
                    key={index}
                    style={{
                      fontSize: fontSize,
                      paddingLeft: "24px",
                      paddingRight: "24px",
                      width: "100%",
                      margin: "0.125em 0", // Adjust this value to change the line spacing
                    }}
                  >
                    {paragraph}
                  </p>
                ),
              )}
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
    return new NextResponse("Not Found", { status: 404 });
  }
}

export const dynamic = "force-dynamic";
