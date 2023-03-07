import * as dotenv from "dotenv";

import { HardhatUserConfig, task, types } from "hardhat/config";
import "hardhat-deploy";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { node_url, accounts, addForkConfiguration } from "./utils/network";
import { BigNumber, utils } from "ethers";
import { OnchainCheckGas__factory, OnchainGas__factory } from "./typechain";
dotenv.config();

task("claims", "count the number of claims remaining", async (args, hre) => {
  const onChainGas = OnchainGas__factory.connect(
    "0x25Ec84aBe25174650220b83841E0cfB39D8Aab87",
    hre.ethers.provider
  );
  const onChainCheckGas = OnchainCheckGas__factory.connect(
    "0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D",
    hre.ethers.provider
  );

  const totalSupply = (await onChainGas.totalSupply()).toNumber();
  let totalClaims = 0;
  for (let i = 1; i <= totalSupply; i++) {
    const claim = await onChainCheckGas.claimed(i);
    if (claim) {
      totalClaims++;
    }
  }
  console.log("totalClaims", totalClaims);
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
    },
  },
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
    signer: 10,
  },
  networks: addForkConfiguration({
    hardhat: {
      initialBaseFeePerGas: 0, // to fix : https://github.com/sc-forks/solidity-coverage/issues/652, see https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136
      accounts: accounts("hardhat"),
      tags: ["local"],
      forking: {
        enabled: true,
        url: node_url("mainnet"),
      },
    },
    sepolia: {
      url: node_url("sepolia"),
      accounts: accounts("sepolia"),
      gasPrice: utils.parseUnits("10", "gwei").toNumber(),
      tags: ["testnet"],
    },
    mainnet: {
      url: node_url("mainnet"),
      accounts: accounts("mainnet"),
      // gasPrice: utils.parseUnits("15", "gwei").toNumber(),
      deploy: ["deploy-mainnet/"],
      tags: ["mainnet"],
    },
    goerli: {
      url: node_url("goerli"),
      accounts: accounts("goerli"),
      deploy: ["deploy-testnet/"],
      tags: ["testnet"],
    },
    // for testnet
    "base-goerli": {
      url: "https://goerli.base.org",
      accounts: accounts("base-goerli"),
      deploy: ["deploy-base-goerli/"],
      tags: ["testnet"],
    },
  }),
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    gasPrice: 4,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  etherscan: {
    // @ts-ignore this is for the verifier
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY_MAINNET || "",
      goerli: process.env.ETHERSCAN_API_KEY_GOERLI || "",
      sepolia: process.env.ETHERSCAN_API_KEY_SEPOLIA || "",
      ["base-goerli"]: process.env.ETHERSCAN_API_KEY_BASE_GOERLI || " ",
    },
    customChains: [
      {
        network: "base-goerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org",
        },
      },
    ],
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
