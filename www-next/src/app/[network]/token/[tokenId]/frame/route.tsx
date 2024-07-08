/* eslint-disable react/jsx-key */
import { NextRequest, NextResponse } from "next/server";
import { baseUrl, frames } from "@/app/frames/frames";
import { Button } from "frames.js/next";

type Params = { network: string; tokenId: string };

const handleRequest = ({ network, tokenId }: Params) =>
  frames((ctx) => {
    if (ctx.pressedButton?.index === 1) {
      return {
        image: `${baseUrl}/${network}/og/token/${tokenId}/claim`,
        buttons: [
          <Button
            action="link"
            target={`${baseUrl}/${network}/token/${tokenId}`}
          >
            details
          </Button>,
        ],
      };
    }
    return {
      image: `${baseUrl}/${network}/og/token/${tokenId}`,
      buttons: [
        <Button
          action="post"
          target={`${baseUrl}/${network}/token/${tokenId}/frame`}
        >
          $FAME
        </Button>,
        <Button action="link" target={`${baseUrl}/${network}/token/${tokenId}`}>
          details
        </Button>,
      ],
    };
  });

export const GET = (req: NextRequest, { params }: { params: Params }) =>
  handleRequest(params)(req);
export const POST = (req: NextRequest, { params }: { params: Params }) =>
  handleRequest(params)(req);
