import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Wallet } from "ethers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network, run, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const nftArgs = [
    "0xeC8EF4c339508224E063e43e30E2dCBe19D9c087",
    "0xA32bb79b33B29e483d0949C99EC0C439b29e2B33",
    "0x0d104Dea962b090bC46c67a12e800ff16eeffB75",
    "0x1D11a1c75e439A50734AEF3469aed9ca4fFe39fc",
    "0x6bAb43D4F3587f9f3ca1152C63E52BF7F8de2Dc1",
    "0x57beAe62670Ff6cCf8311411a2A2aAb453413987",
    "0xF3A95B30E1Fc2EdCea41fF93270249b6Ab979730",
    "0x52a31D845f4bdC1D47Ee21dB7C25Bde2423A91Ae",
    "0x6CcCc7eA426E14F1E07528296c7d226677fd2fF6",
    "0xc230862406bBe44f499943Ae4E9E6317a95BC7Ad",
  ];
  const nft = await deploy("OnchainGas", {
    from: deployer,
    args: nftArgs,
    log: true,
    waitConfirmations: 5,
  });
  if (nft.newlyDeployed) {
    await run("verify:verify", {
      address: nft.address,
      constructorArguments: nftArgs,
    });
  }
};
export default func;
func.tags = ["mainnet"];
