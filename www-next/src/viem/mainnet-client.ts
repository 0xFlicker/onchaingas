import {
  fameLadySocietyAddress,
  namedLadyRendererAddress as namedLadyRendererAddressAll,
  onChainCheckGasAddress as onChainCheckGasAddressAll,
  onChainGasAddress as onChainGasAddressAll,
} from "@/wagmi";
import { createPublicClient, http, fallback, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

export const client = createPublicClient({
  transport: fallback([
    http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL_1!, {
      batch: true,
      retryCount: 5,
      retryDelay: 500,
    }),
    http(`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`, {
      batch: true,
      retryCount: 5,
      retryDelay: 500,
    }),
    http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
      {
        batch: true,
        retryCount: 5,
        retryDelay: 500,
      }
    ),
  ]),
  chain: mainnet,
});

export const walletClient = createWalletClient({
  transport: fallback([
    http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL_1!, {
      batch: true,
      retryCount: 5,
      retryDelay: 500,
    }),
    http(`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`, {
      batch: true,
    }),
    http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
      {
        batch: true,
      }
    ),
  ]),
  chain: mainnet,
});

export const createSignerAccount = () =>
  privateKeyToAccount(process.env.MAINNET_SIGNER_PRIVATE_KEY! as `0x${string}`);

export const flsTokenAddress = fameLadySocietyAddress[mainnet.id];
export const namedLadyRendererAddress = namedLadyRendererAddressAll[mainnet.id];
export const onChainCheckGasAddress = onChainCheckGasAddressAll[mainnet.id];
export const onChainGasAddress = onChainGasAddressAll[mainnet.id];
