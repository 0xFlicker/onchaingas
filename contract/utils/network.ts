import "dotenv/config";
import {
  HDAccountsUserConfig,
  HttpNetworkUserConfig,
  NetworksUserConfig,
} from "hardhat/types";

export function ens_signer(networkName: string): string {
  if (networkName) {
    const name =
      process.env[`ENS_RESOLVER_SIGNER_${networkName.toUpperCase()}`];
    if (name && name !== "") {
      console.log("Using ens signer from env: ", name);
      return name;
    }
  }
  return "TEST";
}

export function ens_gateway(networkName: string): string {
  if (networkName) {
    const name = process.env[`ENS_GATEWAY_${networkName.toUpperCase()}`];
    if (name && name !== "") {
      console.log("Using gateway from env: ", name);
      return name;
    }
  }
  return "TEST";
}

export function nft_name(networkName: string): string {
  if (networkName) {
    const name = process.env[`NFT_NAME_${networkName.toUpperCase()}`];
    if (name && name !== "") {
      console.log("Using token name from env: ", name);
      return name;
    }
  }
  return "TEST";
}

export function nft_symbol(networkName: string): string {
  if (networkName) {
    const name = process.env[`NFT_SYMBOL_${networkName.toUpperCase()}`];
    if (name && name !== "") {
      console.log("Using short token name from env: ", name);
      return name;
    }
  }
  return "TST";
}

export function nft_mint_price(networkName: string): string {
  if (networkName) {
    const name = process.env[`MINT_PRICE_${networkName.toUpperCase()}`];
    if (name && name !== "") {
      console.log("Using token price from env: ", name);
      return name;
    }
  }
  return "0.01 ether";
}

export function metadata_url(networkName: string): string {
  if (networkName) {
    const uri = process.env[`METADATA_URI_${networkName.toUpperCase()}`];
    if (uri && uri !== "") {
      console.log("Using metadata uri from env: ", uri);
      return uri;
    }
  }
  return "http://localhost:8080/";
}

export function node_url(networkName: string): string {
  if (networkName) {
    const uri = process.env["ETH_NODE_URI_" + networkName.toUpperCase()];
    if (uri && uri !== "") {
      console.log("Using node url from env: ", uri);
      return uri;
    }
  }

  if (networkName === "ganache") {
    return "http://localhost:7545";
  }
  if (networkName === "hardhat-node") {
    return "http://localhost:8545";
  }

  let uri = process.env.ETH_NODE_URI;
  if (uri) {
    uri = uri.replace("{{networkName}}", networkName);
  }
  if (!uri || uri === "") {
    return "";
  }
  if (uri.indexOf("{{") >= 0) {
    throw new Error(
      `invalid uri or network not supported by node provider : ${uri}`
    );
  }
  return uri;
}

export function getMnemonic(networkName?: string): string {
  if (networkName) {
    const mnemonic = process.env["MNEMONIC_" + networkName.toUpperCase()];
    if (mnemonic && mnemonic !== "") {
      return mnemonic;
    }
  }

  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic || mnemonic === "") {
    return "buffalo fame urge broccoli habit barrel high kind hurry own gesture plate";
  }
  return mnemonic;
}

export function isLocalNetwork(networkName: string): boolean {
  return ["hardhat", "ganache", "hardhat-node"].some((s) => networkName === s);
}
export function accounts(networkName?: string): { mnemonic: string } {
  return { mnemonic: getMnemonic(networkName) };
}

export function addForkConfiguration(
  networks: NetworksUserConfig
): NetworksUserConfig {
  // While waiting for hardhat PR: https://github.com/nomiclabs/hardhat/pull/1542
  if (process.env.HARDHAT_FORK) {
    process.env["HARDHAT_DEPLOY_FORK"] = process.env.HARDHAT_FORK;
  }

  const currentNetworkName = process.env.HARDHAT_FORK;
  let forkURL: string | undefined =
    currentNetworkName && node_url(currentNetworkName);
  let hardhatAccounts: HDAccountsUserConfig | undefined;
  if (currentNetworkName && currentNetworkName !== "hardhat") {
    const currentNetwork = networks[
      currentNetworkName
    ] as HttpNetworkUserConfig;
    if (currentNetwork) {
      forkURL = currentNetwork.url;
      if (
        currentNetwork.accounts &&
        typeof currentNetwork.accounts === "object" &&
        "mnemonic" in currentNetwork.accounts
      ) {
        hardhatAccounts = currentNetwork.accounts;
      }
    }
  }
  const newNetworks = {
    ...networks,
    hardhat: {
      ...networks.hardhat,
      ...{
        accounts: hardhatAccounts,
        forking: forkURL
          ? {
              url: forkURL,
              blockNumber: process.env.HARDHAT_FORK_NUMBER
                ? parseInt(process.env.HARDHAT_FORK_NUMBER)
                : undefined,
            }
          : undefined,
        mining: process.env.MINING_INTERVAL
          ? {
              auto: false,
              interval: process.env.MINING_INTERVAL.split(",").map((v) =>
                parseInt(v)
              ) as [number, number],
            }
          : undefined,
      },
    },
  };
  return newNetworks;
}
