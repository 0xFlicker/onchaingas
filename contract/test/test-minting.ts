import { ethers } from "hardhat";
import chai, { expect } from "chai";
import fs from "fs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { solidity } from "ethereum-waffle";
import { userMint, staticContracts, StaticContractAddresses } from "./utils";
import { OnchainGas__factory } from "../typechain";
import { utils } from "ethers";

chai.use(solidity);

describe("Minting test", function () {
  let accounts: SignerWithAddress[];
  let staticContractAddresses: StaticContractAddresses;
  this.beforeAll(async () => {
    accounts = await ethers.getSigners();
    staticContractAddresses = await staticContracts(accounts[0]);
  });

  it("can claim", async () => {
    const { mintContract, owner, user } = await userMint(
      accounts,
      staticContractAddresses
    );
    const userMintContract = mintContract.connect(user);
    await userMintContract.claim([1]);
    expect(
      (await userMintContract.balanceOf(user.address)).toNumber()
    ).to.equal(2);
  });

  it("can claim and mint", async () => {
    const { mintContract, owner, user } = await userMint(
      accounts,
      staticContractAddresses
    );
    const userMintContract = mintContract.connect(user);
    await userMintContract.claimAndMint([1], 1, {
      value: ethers.utils.parseEther("0.1"),
    });
    expect(
      (await userMintContract.balanceOf(user.address)).toNumber()
    ).to.equal(3);
  });

  it("can mint", async () => {
    const { mintContract, owner, user } = await userMint(
      accounts,
      staticContractAddresses
    );
    const userMintContract = mintContract.connect(user);
    await userMintContract.mint(user.address, 1, {
      value: ethers.utils.parseEther("0.1"),
    });
    expect(
      (await userMintContract.balanceOf(user.address)).toNumber()
    ).to.equal(2);
  });

  it("requires payment", async () => {
    const { mintContract, owner, user } = await userMint(
      accounts,
      staticContractAddresses
    );
    const userMintContract = mintContract.connect(user);
    await expect(userMintContract.mint(user.address, 1)).to.be.revertedWith(
      "Not enough ETH"
    );
    await expect(userMintContract.claimAndMint([1], 1)).to.be.revertedWith(
      "Not enough ETH"
    );
  });
});
