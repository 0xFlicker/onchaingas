/* eslint-disable react/jsx-key */
import { NextRequest, NextResponse } from "next/server";
import { baseUrl, frames } from "@/app/frames/frames";
import { Button } from "frames.js/next";
import { isAddress } from "viem";

type State = {
  page?: number;
};

const handleRequest = frames(async (ctx) => {
  const state: State = (ctx.state || {}) as State;
  if (!ctx.state && ctx.pressedButton?.index === 1) {
    state.page = 1;
  } else if (ctx.pressedButton?.index === 2) {
    state.page = (state.page || 0) + 1;
  } else if (ctx.pressedButton?.index === 1 && state.page) {
    state.page--;
  }

  if (state.page === 0) {
    state.page = 1;
  }

  const addressOrTokenId = ctx.message?.inputText;
  if (addressOrTokenId && isAddress(addressOrTokenId)) {
    return {
      state,
      imageOptions: {
        aspectRatio: "1.91:1",
      },
      image: `${baseUrl}/fame/claim/${addressOrTokenId}/og`,
      textInput: "Address or tokenId",
      buttons: [
        <Button action="post" target={`${baseUrl}/fame/frame`}>
          back
        </Button>,
      ],
    };
  } else if (addressOrTokenId) {
    return {
      state,
      image: `${baseUrl}/mainnet/og/token/${addressOrTokenId}/claim`,
      textInput: "Address or tokenId",
      buttons: [
        <Button action="post" target={`${baseUrl}/fame/frame`}>
          back
        </Button>,
      ],
    };
  }

  if (state.page && state.page <= 3) {
    return {
      state,
      imageOptions: {
        aspectRatio: "1:1",
      },
      image: `${baseUrl}/fame/frame/page${state.page}`,
      textInput: "Address or tokenId",
      buttons: [
        <Button action="post" target={`${baseUrl}/fame/frame`}>
          back
        </Button>,
        <Button action="post" target={`${baseUrl}/fame/frame`}>
          next
        </Button>,
      ],
    };
  } else if (state.page && state.page === 4) {
    return {
      imageOptions: {
        aspectRatio: "1:1",
      },
      image: `${baseUrl}/images/fame/zepeto_square_sm.png`,
      textInput: "Address or tokenId",
      buttons: [
        <Button action="post" target={`${baseUrl}/fame/frame`}>
          back
        </Button>,
      ],
    };
  }
  return {
    imageOptions: {
      aspectRatio: "1:1",
    },
    image: `${baseUrl}/images/fame/fame.png`,
    textInput: "Address or tokenId",
    buttons: [
      <Button action="post" target={`${baseUrl}/fame/frame`}>
        info
      </Button>,
    ],
  };
});
export const GET = handleRequest;
export const POST = handleRequest;
