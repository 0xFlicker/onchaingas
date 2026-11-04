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

export const GET = async (req: NextRequest, props: { params: Promise<Params> }) => {
  const params = await props.params;
  return handleRequest(params)(req);
};
export const POST = async (req: NextRequest, props: { params: Promise<Params> }) => {
  const params = await props.params;
  return handleRequest(params)(req);
};
