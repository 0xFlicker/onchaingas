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
            src={`${baseUrl}/images/fame/bala1fameus.png`}
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
              Fame Lady Society&apos;s mission is to ensure that every member
              has a voice in shaping the project&apos;s future, promoting true
              decentralization and sustainability for the benefit of the entire
              community. FLSoc emerged from the challenges faced by the original
              FLS, including a fraudulent foundation and a community-driven
              takeover led by passionate members determined to reclaim and honor
              the project&apos;s promise.
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
