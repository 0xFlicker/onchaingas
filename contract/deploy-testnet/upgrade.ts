import { HardhatRuntimeEnvironment } from "hardhat/types";
import fs from "fs";
import { DeployFunction } from "hardhat-deploy/types";
import {
  OnchainCheckgas__factory,
  OnchainCheckRenderer__factory,
} from "../typechain";
import { OnchainCheckGas__factory } from "../typechain/factories/contracts";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network, run, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const compiler = await deployments.get("DataChunkCompiler");
  const three1 = await deployments.get("ThreeDataChunk1");
  const three2 = await deployments.get("ThreeDataChunk2");
  const three3 = await deployments.get("ThreeDataChunk3");
  const three4 = await deployments.get("ThreeDataChunk4");
  const three5 = await deployments.get("ThreeDataChunk5");
  const three6 = await deployments.get("ThreeDataChunk6");
  const three7 = await deployments.get("ThreeDataChunk7");
  const three8 = await deployments.get("ThreeDataChunk8");
  const three9 = await deployments.get("ThreeDataChunk9");
  const onchainRenderer = await deployments.get("OnchainCheckRenderer");
  const gasLib = await deploy("GasLibs", {
    from: deployer,
  });

  const v2RendererAnimationUrl = await deploy(
    "OnchainCheckRendererV2AnimationUrl",
    {
      from: deployer,
      libraries: { "contracts/GasLibs.sol:GasLibs": gasLib.address },
      args: [
        compiler.address,
        three1.address,
        three2.address,
        three3.address,
        three4.address,
        three5.address,
        three6.address,
        three7.address,
        three8.address,
        three9.address,
      ],
    }
  );
  const v2RendererImage = await deploy("OnchainCheckRendererV2Image", {
    from: deployer,
    libraries: { "contracts/GasLibs.sol:GasLibs": gasLib.address },
  });
  const v2RendererMetadata = await deploy("OnchainCheckRendererV2Metadata", {
    from: deployer,
    libraries: { "contracts/GasLibs.sol:GasLibs": gasLib.address },
    args: [
      compiler.address,
      v2RendererAnimationUrl.address,
      v2RendererImage.address,
    ],
  });
  const or = new OnchainCheckRenderer__factory(deployer).attach(
    onchainRenderer.address
  );
  await or.setUpgradeContract(v2RendererMetadata.address);
};
export default func;
func.tags = ["testnet", "upgrade"];
