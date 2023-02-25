import { HardhatRuntimeEnvironment } from "hardhat/types";
import fs from "fs";
import { DeployFunction } from "hardhat-deploy/types";
import { gasRpc } from "../utils/network";
import {
  OnchainCheckRendererV2AnimationUrl__factory,
  OnchainCheckRenderer__factory,
} from "../typechain";
import { OnchainCheckGas__factory } from "../typechain/factories/contracts";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network, run, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const rpc = gasRpc(network.name);
  const onchainRenderer = await deployments.get("OnchainCheckRenderer");
  const v2RendererMetadata = await deployments.get(
    "OnchainCheckRendererV2Metadata"
  );
  const ownerSigner = await ethers.getSigner(deployer);
  const or = new OnchainCheckRenderer__factory(ownerSigner).attach(
    onchainRenderer.address
  );
  if ((await or.upgradeContract()) !== v2RendererMetadata.address) {
    console.log("Upgrading renderer to v2");
    await or.setUpgradeContract(v2RendererMetadata.address);
  }

  // set rpc
  const v2RendererAnimationUrl = await deployments.get(
    "OnchainCheckRendererV2AnimationUrl"
  );
  const rendererContract = OnchainCheckRendererV2AnimationUrl__factory.connect(
    v2RendererAnimationUrl.address,
    ownerSigner
  );
  console.log("Setting renderer rpc to", rpc);
  await rendererContract.setRpc(rpc);
};
export default func;
func.tags = ["mainnet", "verify"];
