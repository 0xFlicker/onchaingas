import { createPublicClient, http, fallback } from "viem";
import { polygon } from "viem/chains";

export const client = createPublicClient({
  transport: fallback([
    http(`https://polygon-mainnet.infura.io/v3/${process.env.INFURA_KEY}`, {
      batch: true,
    }),
    http(process.env.NEXT_PUBLIC_POLYGON_RPC_URL_1!, {
      batch: true,
    }),
    http(process.env.NEXT_PUBLIC_POLYGON_RPC_URL_2!, {
      batch: true,
    }),
  ]),
  chain: polygon,
});
