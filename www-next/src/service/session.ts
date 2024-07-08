import { sealData, unsealData, type IronSessionOptions } from "iron-session";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextResponse } from "next/server";
import { Address } from "viem";

const COOKIE_NAME = "siwe";
const TTL = 60 * 60 * 24 * 30; // 30 days

const SESSION_OPTIONS: IronSessionOptions = {
  cookieName: COOKIE_NAME,
  ttl: TTL,
  password: process.env.SESSION_SECRET!,
};

export type SerializedSession = {
  nonce?: string;
  chainId?: number;
  address?: Address;
};

export function createSession(session?: SerializedSession): SerializedSession {
  return {
    nonce: session?.nonce,
    chainId: session?.chainId,
    address: session?.address,
  };
}

export async function sessionFromCookies(
  cookies: RequestCookies | ReadonlyRequestCookies
): Promise<SerializedSession> {
  const sessionCookie = cookies.get(COOKIE_NAME)?.value;
  if (!sessionCookie) return createSession();
  return createSession(
    await unsealData<SerializedSession>(sessionCookie, SESSION_OPTIONS)
  );
}

export function clearSession(res: NextResponse): void {
  res.cookies.delete(COOKIE_NAME);
}

export function toJSON(session: SerializedSession): SerializedSession {
  return {
    nonce: session.nonce,
    address: session.address,
    chainId: session.chainId,
  };
}

export async function persistSession(
  session: SerializedSession,
  res: NextResponse
) {
  const data = await sealData(toJSON(session), SESSION_OPTIONS);
  res.cookies.set(COOKIE_NAME, data, {
    httpOnly: true,
    maxAge: TTL,
    secure: process.env.NODE_ENV === "production",
  });
}
