/* eslint-disable react/jsx-key */
import { NextRequest, NextResponse } from "next/server";
import { baseUrl, frames } from "@/app/frames/frames";
import { Button } from "frames.js/next";

type Params = { address: string };

const handleRequest = ({ address }: Params) =>
  frames((ctx) => {
    return {
      image: `${baseUrl}/fame/claim/${address}/og`,
      buttons: [
        <Button action="post" target={`${baseUrl}/fame`}>
          $FAME
        </Button>,
        <Button action="link" target={`${baseUrl}/fame/claim/${address}`}>
          claim
        </Button>,
      ],
    };
  });

export const GET = (req: NextRequest, { params }: { params: Params }) =>
  handleRequest(params)(req);
export const POST = (req: NextRequest, { params }: { params: Params }) =>
  handleRequest(params)(req);
