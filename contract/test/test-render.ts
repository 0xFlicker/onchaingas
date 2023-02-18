import { ethers } from "hardhat";
import { expect } from "chai";
import fs from "fs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  StaticContractAddresses,
  staticContracts,
  upgradeRenderer,
  userMint,
} from "./utils";
import { OnchainGas__factory } from "../typechain";
import { utils } from "ethers";

describe("Render test", function () {
  let accounts: SignerWithAddress[];
  let staticContractAddresses: StaticContractAddresses;
  this.beforeAll(async () => {
    accounts = await ethers.getSigners();
    staticContractAddresses = await staticContracts(accounts[0]);
  });

  it("generates an svg", async () => {
    const { mintContract, rendererContract, owner, user } = await userMint(
      accounts,
      staticContractAddresses
    );
    // generate a random uint256
    const seed = utils.randomBytes(32);
    const gasPrice = 800123;
    fs.writeFileSync(
      "example.svg",
      await rendererContract.generateSvg(seed, gasPrice)
    );
  });

  describe("v2", () => {
    it("tokenURI", async () => {
      const { mintContract, rendererContract, owner, user } = await userMint(
        accounts,
        staticContractAddresses
      );

      const metadata = await mintContract.tokenURI(1);

      await upgradeRenderer({
        owner,
        rendererContract,
        staticContractAddresses,
      });

      expect(await mintContract.tokenURI(1)).to.equal(metadata);
    });
  });
});
