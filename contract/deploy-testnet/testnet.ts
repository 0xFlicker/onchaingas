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
  let currentNonce = await ethers.provider.getTransactionCount(deployer);
  const [ff1Deployed, ff2Deployed] = await Promise.all([
    deploy("FFlateDataChunk1", {
      from: deployer,
      args: [],
      log: true,
      nonce: currentNonce,
    }),
    deploy("FFlateDataChunk2", {
      from: deployer,
      args: [],
      log: true,
      nonce: currentNonce + 1,
    }),
  ]);
  const compilerArgs = [ff1Deployed.address, ff2Deployed.address];
  currentNonce = await ethers.provider.getTransactionCount(deployer);
  const compilerDeployed = await deploy("DataChunkCompiler", {
    from: deployer,
    args: compilerArgs,
    log: true,
    nonce: currentNonce,
  });
  currentNonce = await ethers.provider.getTransactionCount(deployer);
  const [t1, t2, t3, t4, t5, t6, t7, t8, t9] = await Promise.all(
    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, count) => {
      return deploy(`ThreeDataChunk${i}`, {
        from: deployer,
        args: [],
        log: true,
        nonce: currentNonce + count,
      });
    })
  );
  currentNonce = await ethers.provider.getTransactionCount(deployer);
  const rendererArgs = [
    compilerDeployed.address,
    t1.address,
    t2.address,
    t3.address,
    t4.address,
    t5.address,
    t6.address,
    t7.address,
    t8.address,
    t9.address,
  ];
  const renderer = await deploy("OnchainCheckRenderer", {
    from: deployer,
    args: rendererArgs,
    log: true,
    waitConfirmations: 5,
    nonce: currentNonce,
  });
  const nftArgs = [
    renderer.address,
    "0x8661f2e7734f1e8f793701e74b16b18351da87c3",
  ];
  currentNonce = await ethers.provider.getTransactionCount(deployer);
  const nft = await deploy("OnchainCheckGas", {
    from: deployer,
    args: nftArgs,
    log: true,
    waitConfirmations: 5,
    nonce: currentNonce,
  });
  if (ff1Deployed.newlyDeployed) {
    await run("verify:verify", {
      address: ff1Deployed.address,
      constructorArguments: [],
    });
  }
  if (ff2Deployed.newlyDeployed) {
    await run("verify:verify", {
      address: ff2Deployed.address,
      constructorArguments: [],
    });
  }
  if (compilerDeployed.newlyDeployed) {
    await run("verify:verify", {
      address: compilerDeployed.address,
      constructorArguments: compilerArgs,
    });
  }
  if (t1.newlyDeployed) {
    await run("verify:verify", {
      address: t1.address,
      constructorArguments: [],
    });
  }
  if (t2.newlyDeployed) {
    await run("verify:verify", {
      address: t2.address,
      constructorArguments: [],
    });
  }
  if (t3.newlyDeployed) {
    await run("verify:verify", {
      address: t3.address,
      constructorArguments: [],
    });
  }
  if (t4.newlyDeployed) {
    await run("verify:verify", {
      address: t4.address,
      constructorArguments: [],
    });
  }
  if (t5.newlyDeployed) {
    await run("verify:verify", {
      address: t5.address,
      constructorArguments: [],
    });
  }
  if (t6.newlyDeployed) {
    await run("verify:verify", {
      address: t6.address,
      constructorArguments: [],
    });
  }
  if (t7.newlyDeployed) {
    await run("verify:verify", {
      address: t7.address,
      constructorArguments: [],
    });
  }
  if (t8.newlyDeployed) {
    await run("verify:verify", {
      address: t8.address,
      constructorArguments: [],
    });
  }
  if (t9.newlyDeployed) {
    await run("verify:verify", {
      address: t9.address,
      constructorArguments: [],
    });
  }
  const ownerSigner = await ethers.getSigner(deployer);
  const nftContract = OnchainCheckGas__factory.connect(
    nft.address,
    ownerSigner
  );

  if (true) {
    // await run("verify:verify", {
    //   address: renderer.address,
    //   constructorArguments: rendererArgs,
    // });
    await run("verify:verify", {
      address: nft.address,
      constructorArguments: nftArgs,
    });
    const ownerSigner = await ethers.getSigner(deployer);
    const rendererContract = OnchainCheckRenderer__factory.connect(
      renderer.address,
      ownerSigner
    );
    console.log("Setting RPC URL");
    await rendererContract.setRpc(
      "https://mainnet.infura.io/v3/382301aaaf3f4060bdefdbd132ae3c8f"
    );
    console.log("Enabling mint");

    const activeReceipt = await nftContract.setMintActive(true);
    await activeReceipt.wait();
    console.log("Mint ten");
    const tx = await nftContract.gift(deployer, 10);
    await tx.wait();
    // await nftContract.withdraw();
  }
  let uri = await nftContract.tokenURI(1);
  uri = decodeURIComponent(uri.split("data:application/json,")[1]);
  await fs.promises.writeFile("token.json", uri, "utf8");
};
export default func;
func.tags = ["testnet"];
