import { configureClientSIWE } from "connectkit-next-siwe";

export const siweClient = configureClientSIWE({
  apiRoutePrefix: "/siwe", // Your API route directory
  statement: "Sign In With Ethereum to prove you control this wallet.", // optional
});
