import { DeploymentsExtension } from "hardhat-deploy/types";

export async function contractStat(
  deployments: DeploymentsExtension,
  contractName: string,
  deployerAddress: string,
  args: any[]
) {
  let isDeployed;
  let contractAddress = "";
  try {
    const d = await deployments.get(contractName);
    const { differences } = await deployments.fetchIfDifferent(contractName, {
      from: deployerAddress,
      args,
    });
    isDeployed = !differences;
    if (isDeployed) {
      contractAddress = d.address;
    }
  } catch (e) {
    isDeployed = false;
  }
  return {
    isDeployed,
    contractAddress,
  };
}
