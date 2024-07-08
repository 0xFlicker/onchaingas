/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import { baseUrl } from "@/app/frames/frames";

export async function GET(req: NextRequest) {
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
            overflow: "hidden", // hide the overflow
            position: "relative", // position relative to allow absolute positioning within
            color: "black",
            fontFamily: "Roboto",
            fontWeight: 400,
            border: "8px solid red",
          }}
        >
          <img
            src={`${baseUrl}/images/reveal/fls_wrap.png`}
            style={{
              position: "absolute", // absolute positioning
              height: "100%", // make the image fill the height
            }}
          />
        </div>
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
                display: "block",
                flexGrow: 1,
              }}
            ></div>
            <p
              style={{
                fontSize: "24px",
                paddingLeft: "24px",
                paddingRight: "24px",
                width: "100%",
                margin: "0.125em 0",
              }}
            >
              The Fame Lady Society (FLSoc) is a vibrant community of NFT
              collectors and creators dedicated to the original Fame Lady Squad
              (FLS) NFTs, the pioneering all-female generative PFP project on
              the Ethereum blockchain. With a strong focus on transparency,
              community governance, inclusivity, and women&apos;s empowerment,
              FLSoc aims to transform Web3 into &lsquo;webWE,&rsquo; fostering a
              collaborative and supportive environment.
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
    },
  );
}

export const dynamic = "force-dynamic";
