import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
