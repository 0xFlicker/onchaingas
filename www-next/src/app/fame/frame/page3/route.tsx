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
            src={`${baseUrl}/images/fame/gm-bri-bam2.png`}
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
              Established on December 11, 2022, the Fame Lady Society continues
              to fight for the return of the original smart contract while
              offering an alternative through a newly created smart contract by
              0xflick. This effort ensures that the community can maintain
              ownership and governance of their assets, reinforcing the
              society&apos;s commitment to a decentralized and inclusive future.
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
