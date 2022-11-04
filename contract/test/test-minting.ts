import { ethers } from "hardhat";
import { expect } from "chai";
import fs from "fs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { userMint } from "./utils";
import { OnchainGas__factory } from "../typechain";
import { utils } from "ethers";

describe("Minting test", function () {
  let accounts: SignerWithAddress[];
  this.beforeAll(async () => {
    accounts = await ethers.getSigners();
  });

  it("presale must be active", async () => {
    const { mintContract, owner, user } = await userMint(accounts);
    fs.writeFileSync("example.svg", await mintContract.generateSvg(1), "utf8");
  });
});
