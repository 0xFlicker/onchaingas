import {
  OnchainCheckRenderer__factory,
  OnchainCheckGas__factory,
  OnchainGas__factory,
  OnchainCheckRendererV2Metadata__factory,
  OnchainCheckRendererV2AnimationUrl__factory,
  OnchainCheckRendererV2Image__factory,
  GasLibs__factory,
  FFlateDataChunk1__factory,
  FFlateDataChunk2__factory,
  DataChunkCompiler__factory,
  ThreeDataChunk1__factory,
  ThreeDataChunk2__factory,
  ThreeDataChunk3__factory,
  ThreeDataChunk4__factory,
  ThreeDataChunk5__factory,
  ThreeDataChunk6__factory,
  ThreeDataChunk7__factory,
  ThreeDataChunk8__factory,
  ThreeDataChunk9__factory,
  OnchainCheckRenderer,
} from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { constants } from "ethers";

export type StaticContractAddresses = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export async function userMint(
  accounts: SignerWithAddress[],
  staticContractAddresses: StaticContractAddresses
) {
  const [owner, signer, beneficiary, user] = accounts;
  const oldNftFactory = new OnchainGas__factory(owner);
  const rendererFactory = new OnchainCheckRenderer__factory(owner);
  const rendererContract = await rendererFactory.deploy(
    ...staticContractAddresses
  );
  const oldNft = await oldNftFactory.deploy(...staticContractAddresses);
  const mintFactory = new OnchainCheckGas__factory(owner);
  const mintContract = await mintFactory.deploy(
    rendererContract.address,
    oldNft.address
  );
  await mintContract.setMintActive(true);
  await oldNft.setMintActive(true);
  // Call mint function with the same values as the signature and the signature
  await oldNft.gift(user.address, 1);
  const tx = await mintContract.gift(user.address, 1);

  return {
    mintContract,
    rendererContract,
    oldNft,
    owner,
    user,
  };
}

export async function staticContracts(owner: SignerWithAddress) {
  const fflate1Factory = new FFlateDataChunk1__factory(owner);
  const fflate1 = await fflate1Factory.deploy();
  const fflate2Factory = new FFlateDataChunk2__factory(owner);
  const fflate2 = await fflate2Factory.deploy();
  const compilerFactory = new DataChunkCompiler__factory(owner);
  const compiler = await compilerFactory.deploy(
    fflate1.address,
    fflate2.address
  );
  const threeDataChunk1Factory = new ThreeDataChunk1__factory(owner);
  const threeDataChunk1 = await threeDataChunk1Factory.deploy();
  const threeDataChunk2Factory = new ThreeDataChunk2__factory(owner);
  const threeDataChunk2 = await threeDataChunk2Factory.deploy();
  const threeDataChunk3Factory = new ThreeDataChunk3__factory(owner);
  const threeDataChunk3 = await threeDataChunk3Factory.deploy();
  const threeDataChunk4Factory = new ThreeDataChunk4__factory(owner);
  const threeDataChunk4 = await threeDataChunk4Factory.deploy();
  const threeDataChunk5Factory = new ThreeDataChunk5__factory(owner);
  const threeDataChunk5 = await threeDataChunk5Factory.deploy();
  const threeDataChunk6Factory = new ThreeDataChunk6__factory(owner);
  const threeDataChunk6 = await threeDataChunk6Factory.deploy();
  const threeDataChunk7Factory = new ThreeDataChunk7__factory(owner);
  const threeDataChunk7 = await threeDataChunk7Factory.deploy();
  const threeDataChunk8Factory = new ThreeDataChunk8__factory(owner);
  const threeDataChunk8 = await threeDataChunk8Factory.deploy();
  const threeDataChunk9Factory = new ThreeDataChunk9__factory(owner);
  const threeDataChunk9 = await threeDataChunk9Factory.deploy();

  return [
    compiler.address,
    threeDataChunk1.address,
    threeDataChunk2.address,
    threeDataChunk3.address,
    threeDataChunk4.address,
    threeDataChunk5.address,
    threeDataChunk6.address,
    threeDataChunk7.address,
    threeDataChunk8.address,
    threeDataChunk9.address,
  ] as const;
}

export async function upgradeRenderer({
  rendererContract,
  owner,
  staticContractAddresses,
}: {
  rendererContract: OnchainCheckRenderer;
  owner: SignerWithAddress;
  staticContractAddresses: StaticContractAddresses;
}) {
  // compiler and threejs...

  const gasLibFactory = new GasLibs__factory(owner);
  const gasLib = await gasLibFactory.deploy();
  // Create v2 renderer, image and animationURL
  const imageRendererFactory = new OnchainCheckRendererV2Image__factory(
    { "contracts/GasLibs.sol:GasLibs": gasLib.address },
    owner
  );
  const imageRenderer = await imageRendererFactory.deploy();
  const animationUrlRendererFactory =
    new OnchainCheckRendererV2AnimationUrl__factory(
      { "contracts/GasLibs.sol:GasLibs": gasLib.address },
      owner
    );
  const animationUrlRenderer = await animationUrlRendererFactory.deploy(
    ...staticContractAddresses
  );

  const metadataRendererFactory = new OnchainCheckRendererV2Metadata__factory(
    owner
  );
  const metadataRenderer = await metadataRendererFactory.deploy(
    staticContractAddresses[0],
    animationUrlRenderer.address,
    imageRenderer.address
  );

  // Update existing renderer
  await rendererContract.setUpgradeContract(metadataRenderer.address);
}
