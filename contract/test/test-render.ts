import { ethers } from "hardhat";
import { expect } from "chai";
import fs from "fs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { userMint } from "./utils";
import { OnchainGas__factory } from "../typechain";
import { utils } from "ethers";

describe("Render test", function () {
  let accounts: SignerWithAddress[];
  this.beforeAll(async () => {
    accounts = await ethers.getSigners();
  });

  it.only("uint2str", async () => {
    const { mintContract, rendererContract, owner, user, oldNft } =
      await userMint(accounts);
    expect((await rendererContract.testUint2str3(0)).toNumber()).to.equal(0);
    const userMintContract = mintContract.connect(user);
    await userMintContract.mint(user.address, 10, {
      value: ethers.utils.parseEther("1"),
    });
    console.log(await mintContract.tokenURI("9"));
  });

  it("generates an svg", async () => {
    const { mintContract, rendererContract, owner, user } = await userMint(
      accounts
    );
    // generate a random uint256
    const seed = utils.randomBytes(32);
    const gasPrice = 800123;
    fs.writeFileSync(
      "example.svg",
      await rendererContract.generateSvg(seed, gasPrice)
    );
  });
});
