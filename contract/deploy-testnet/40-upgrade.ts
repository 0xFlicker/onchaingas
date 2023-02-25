import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network, run, ethers } = hre;
  const { deploy } = deployments as DeploymentsExtension;
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
  const onChainCheckGas = await deployments.get("OnchainCheckGas");
  const gasLib = await deploy("GasLibs", {
    from: deployer,
  });

  const v2RendererAnimationUrl = await deploy(
    "OnchainCheckRendererV2AnimationUrl",
    {
      from: deployer,
      libraries: { GasLibs: gasLib.address },
      args: [
        [
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
          onChainCheckGas.address,
        ],
      ],
    }
  );
  const v2RendererImage = await deploy("OnchainCheckRendererV2Image", {
    from: deployer,
    libraries: { GasLibs: gasLib.address },
  });
  const v2RendererMetadata = await deploy("OnchainCheckRendererV2Metadata", {
    from: deployer,
    libraries: { GasLibs: gasLib.address },
    args: [
      compiler.address,
      v2RendererAnimationUrl.address,
      v2RendererImage.address,
    ],
    waitConfirmations: 5,
  });

  try {
    await run("verify:verify", {
      address: gasLib.address,
      constructorArguments: gasLib.args,
    });\
  } catch (e) {
    console.log("Failed to verify GasLib", e);
  }
  try {
    await run("verify:verify", {
      address: v2RendererAnimationUrl.address,
      constructorArguments: v2RendererAnimationUrl.args,
      libraries: v2RendererAnimationUrl.libraries,
    });
  } catch (e) {
    console.log("Failed to verify v2RendererAnimationUrl", e);
  }
  try {
    await run("verify:verify", {
      address: v2RendererImage.address,
      constructorArguments: v2RendererImage.args,
      libraries: v2RendererImage.libraries,
    });
  } catch (e) {
    console.log("Failed to verify v2RendererImage", e);
  }
  try {
    await run("verify:verify", {
      address: v2RendererMetadata.address,
      constructorArguments: v2RendererMetadata.args,
      libraries: v2RendererMetadata.libraries,
    });
  } catch (e) {
    console.log("Failed to verify v2RendererMetadata", e);
  }
};
export default func;
func.tags = ["testnet", "upgrade"];
