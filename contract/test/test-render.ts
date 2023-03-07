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
import {
  GasLibs__factory,
  OnChainBaseRendererV2Image__factory,
} from "../typechain";
import { utils } from "ethers";

describe("Render test", function () {
  let accounts: SignerWithAddress[];
  let staticContractAddresses: StaticContractAddresses;
  this.beforeAll(async () => {
    accounts = await ethers.getSigners();
    staticContractAddresses = await staticContracts(accounts[0]);
  });

  it("base - generate an svg", async () => {
    const [owner] = accounts;
    const gasLibFactory = new GasLibs__factory(owner);
    const gasLib = await gasLibFactory.deploy();
    // Create v2 renderer, image and animationURL
    const imageRendererFactory = new OnChainBaseRendererV2Image__factory(
      { "contracts/GasLibs.sol:GasLibs": gasLib.address },
      owner
    );
    const imageRenderer = await imageRendererFactory.deploy();
    const seed = utils.randomBytes(32);
    const gasPrice = 512123;
    const isCheckRendered = await gasLib.getIsCheckRendered(seed, gasPrice);
    fs.writeFileSync(
      "example.svg",
      await imageRenderer.generateSvg(seed, isCheckRendered)
    );
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
        nftContract: mintContract.address,
        staticContractAddresses,
      });

      expect(await mintContract.tokenURI(1)).to.equal(metadata);
    });
  });
});
