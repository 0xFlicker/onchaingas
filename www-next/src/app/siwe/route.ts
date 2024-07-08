import { NextRequest, NextResponse } from "next/server";
import { SiweErrorType, SiweMessage, generateNonce } from "siwe";
import { Address } from "viem";
import { z } from "zod";
import {
  SerializedSession,
  clearSession,
  persistSession,
  sessionFromCookies,
} from "@/service/session";

export async function GET(request: NextRequest) {
  const session = await sessionFromCookies(request.cookies);
  return NextResponse.json<SerializedSession>(session);
}

export async function PUT(request: NextRequest) {
  const session = await sessionFromCookies(request.cookies);
  if (!session.nonce) session.nonce = generateNonce();
  const response = new NextResponse(session.nonce);
  await persistSession(session, response);
  return response;
}

const VerifyMessageInput = z.object({
  message: z.string().min(1),
  signature: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const parseResult = VerifyMessageInput.safeParse(await request.json());
  if (!parseResult.success)
    return NextResponse.json("Invalid request body", { status: 422 });

  const { message, signature } = parseResult.data;
  const session = await sessionFromCookies(request.cookies);

  try {
    const siweMessage = new SiweMessage(message);
    const { data } = await siweMessage.verify({
      signature,
      nonce: session.nonce,
    });

    if (data.nonce !== session.nonce) {
      const response = new NextResponse("Invalid nonce.", { status: 422 });
      clearSession(response);
      return response;
    }

    session.address = data.address as Address;
    session.chainId = data.chainId;
  } catch (error) {
    switch (error) {
      case SiweErrorType.INVALID_NONCE:
      case SiweErrorType.INVALID_SIGNATURE: {
        const response = new NextResponse(String(error), { status: 422 });
        clearSession(response);
        return response;
      }
      default: {
        const response = new NextResponse(String(error), { status: 400 });
        clearSession(response);
        return response;
      }
    }
  }

  const response = new NextResponse();
  await persistSession(session, response);
  return response;
}

export async function DELETE(request: NextRequest) {
  const response = new NextResponse();
  clearSession(response);
  return response;
}
