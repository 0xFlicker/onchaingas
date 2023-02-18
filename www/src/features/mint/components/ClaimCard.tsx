import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractReads,
  useContractRead,
} from "wagmi";
import { useAppSelector, useAppDispatch } from "app/store";
import {
  selectors as web3Selectors,
  actions as web3Actions,
} from "features/web3/redux";
import { FC, useCallback, useEffect, useState } from "react";
import {
  nftOnChainGasContractAddress,
  nftOnChainCheckContractAddress,
} from "utils/config";
import gasAbi from "../nft.abi.json";
import checkAbi from "../check.abi.json";
import { BigNumber, utils } from "ethers";
import Slider from "@mui/material/Slider";
import { MintModal } from "./MintModal";
import Box from "@mui/material/Box";
import { TweetCheck } from "./TweetCheck";

export const ClaimCard: FC = () => {
  const [mintModalOpen, setMintModalOpen] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const address = useAppSelector(web3Selectors.address);
  const connected = useAppSelector(web3Selectors.isConnected);

  const {
    data: readData,
    isLoading: readIsLoading,
    isSuccess: readIsSuccess,
    refetch: batchRefetch,
  } = useContractReads({
    contracts: [
      {
        addressOrName: nftOnChainCheckContractAddress.get(),
        contractInterface: checkAbi,
        functionName: "publicSaleActive",
      },
      {
        addressOrName: nftOnChainCheckContractAddress.get(),
        contractInterface: checkAbi,
        functionName: "totalSupply",
      },
      {
        addressOrName: nftOnChainCheckContractAddress.get(),
        contractInterface: checkAbi,
        functionName: "cost",
      },
      {
        addressOrName: nftOnChainCheckContractAddress.get(),
        contractInterface: checkAbi,
        functionName: "maxMint",
      },
      {
        addressOrName: nftOnChainCheckContractAddress.get(),
        contractInterface: checkAbi,
        functionName: "availableMint",
        args: [address],
      },
    ],
  });
  const { data: balanceOfResponse, refetch: balanceRefetch } = useContractRead({
    addressOrName: nftOnChainCheckContractAddress.get(),
    contractInterface: checkAbi,
    functionName: "balanceOf",
    args: [address],
    cacheTime: 0,
  });

  const [
    publicSaleActiveResponse,
    totalSupplyResponse,
    costResponse,
    maxMintResponse,
    availableMintResponse,
  ] = readData || [];

  const cost =
    costResponse instanceof BigNumber ? utils.formatEther(costResponse) : "0";
  const publicSaleActive =
    typeof publicSaleActiveResponse === "boolean"
      ? publicSaleActiveResponse
      : false;
  const balanceOf =
    balanceOfResponse instanceof BigNumber ? balanceOfResponse.toNumber() : 0;
  const totalSupply =
    totalSupplyResponse instanceof BigNumber
      ? totalSupplyResponse.toNumber()
      : 0;
  const costWei =
    costResponse instanceof BigNumber ? costResponse : BigNumber.from(0);
  const maxMint = typeof maxMintResponse === "number" ? maxMintResponse : 0;
  const availableMint =
    availableMintResponse instanceof BigNumber
      ? availableMintResponse.toNumber()
      : 0;
  useEffect(() => {
    setMintAmount(availableMint);
  }, [availableMint]);

  const { data: tokensOfOwnerResponse } = useContractRead({
    addressOrName: nftOnChainGasContractAddress.get(),
    contractInterface: gasAbi,
    functionName: "tokensOfOwner",
    args: [address],
  });
  const tokensOfOwner: number[] =
    tokensOfOwnerResponse?.map((token) => token.toNumber()) || [];

  const { data: availableClaimsResponse } = useContractReads({
    contracts: tokensOfOwner.map((tokenId) => ({
      addressOrName: nftOnChainCheckContractAddress.get(),
      contractInterface: checkAbi,
      functionName: "claimed",
      args: [tokenId],
    })),
  });

  const availableClaims =
    availableClaimsResponse
      ?.map((d, index) => (!d ? tokensOfOwner[index] : null))
      .filter((d) => !!d) || [];

  const { config: mintConfig } = usePrepareContractWrite({
    addressOrName: nftOnChainCheckContractAddress.get(),
    contractInterface: checkAbi,
    functionName: "mint",
    args: [address, mintAmount],
    enabled: availableClaims.length === 0,
    overrides: {
      value: costWei.mul(mintAmount),
    },
  });

  const { config: claimConfig } = usePrepareContractWrite({
    addressOrName: nftOnChainCheckContractAddress.get(),
    contractInterface: checkAbi,
    functionName: "claimAndMint",
    args: [availableClaims, mintAmount],
    enabled: availableClaims.length > 0,
    overrides: {
      value: costWei.mul(mintAmount),
    },
  });

  const { config: claimOnlyConfig } = usePrepareContractWrite({
    addressOrName: nftOnChainCheckContractAddress.get(),
    contractInterface: checkAbi,
    functionName: "claim",
    args: [availableClaims],
    enabled: availableClaims.length > 0,
  });

  const {
    data: claimMintData,
    isLoading: claimMintIsLoading,
    isSuccess: claimMintIsSuccess,
    write: claimMintWrite,
  } = useContractWrite(claimConfig);

  const {
    data: mintOnlyData,
    isLoading: mintOnlyIsLoading,
    isSuccess: mintOnlyIsSuccess,
    write: mintOnlyWrite,
  } = useContractWrite(mintConfig);

  const {
    data: claimOnlyData,
    isLoading: claimOnlyIsLoading,
    isSuccess: claimOnlyIsSuccess,
    write: claimOnlyWrite,
  } = useContractWrite(claimOnlyConfig);

  let description = "";
  if (publicSaleActive) {
    description = `You currently have ${balanceOf} tokens.`;
  } else {
    description = "The mint is now closed.";
  }
  if (availableClaims.length) {
    description += ` You have ${availableClaims.length} available claims from OnChainGas.`;
  }
  const canMint = publicSaleActive && availableMint > 0;
  const willOverAllocate =
    connected &&
    publicSaleActive &&
    mintAmount > availableMint &&
    availableClaims.length === 0;
  const willExceedMaxMint =
    connected &&
    publicSaleActive &&
    availableMint > maxMint &&
    availableClaims.length === 0;
  const allMinted =
    connected &&
    publicSaleActive &&
    availableMint === 0 &&
    availableClaims.length === 0;

  const mintWrite = availableClaims.length
    ? canMint
      ? claimMintWrite
      : claimOnlyWrite
    : mintOnlyWrite;
  const mintIsLoading = availableClaims.length
    ? canMint
      ? claimMintIsLoading
      : claimOnlyIsLoading
    : mintOnlyIsLoading;
  const mintIsSuccess = availableClaims.length
    ? canMint
      ? claimMintIsSuccess
      : claimOnlyIsSuccess
    : mintOnlyIsSuccess;
  const mintData = availableClaims.length
    ? canMint
      ? claimMintData
      : claimOnlyData
    : mintOnlyData;

  const dispatch = useAppDispatch();
  const doConnect = useCallback(() => {
    dispatch(web3Actions.openWalletSelectModal());
  }, [dispatch]);
  const mint = useCallback(() => {
    mintWrite();
    setMintModalOpen(true);
  }, [mintWrite]);

  const handleClose = useCallback(() => {
    setMintModalOpen(false);
    batchRefetch();
    balanceRefetch();
  }, [batchRefetch, balanceRefetch]);
  let minMintAmount = 0;
  if (!availableClaims.length && canMint) {
    minMintAmount = 1;
  }
  return (
    <>
      <MintModal
        open={mintModalOpen}
        handleClose={handleClose}
        isLoading={mintIsLoading}
        isSuccess={mintIsSuccess}
        result={mintData}
        isCheck
      />
      <Card>
        <CardHeader title="Mint" />
        <CardContent>
          <Typography variant="body1" gutterBottom>
            {description}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {`The current cost is ${cost} ETH per token.`}
          </Typography>
          <Typography
            fontSize={16}
            color="text.primary"
            component="p"
            gutterBottom
          >
            {readIsLoading ? "Loading..." : `Total minted (${totalSupply})`}
          </Typography>
          {!connected && (
            <Typography fontSize={16} color="text.secondary" component="p">
              Connect your wallet to mint.
            </Typography>
          )}
          {allMinted && (
            <Typography fontSize={16} color="text.secondary" component="p">
              You have reached the max mint amount.
            </Typography>
          )}
          {!willExceedMaxMint && willOverAllocate && !allMinted && (
            <Typography fontSize={16} color="text.secondary" component="p">
              You will exceed the max mint amount.
            </Typography>
          )}
          {!willExceedMaxMint && willOverAllocate && allMinted && (
            <Typography fontSize={16} color="text.secondary" component="p">
              You have minted your max amount.
            </Typography>
          )}
          <Typography mt={2}>
            {canMint
              ? mintAmount === 0
                ? availableClaims.length
                  ? `Claim ${availableClaims.length} token${
                      availableClaims.length > 1 ? "s" : ""
                    } for free`
                  : "Mint amount: 0"
                : mintAmount === 1
                ? "Mint one token"
                : `Mint ${mintAmount} tokens` +
                  (availableClaims.length > 0
                    ? ` (claiming an additional ${
                        availableClaims.length
                      } token${availableClaims.length > 1 ? "s" : ""} for free)`
                    : "")
              : availableClaims.length
              ? `Claim ${availableClaims.length} token${
                  availableClaims.length > 1 ? "s" : ""
                }`
              : ""}
          </Typography>
          {connected && availableMint === 0 && availableClaims.length === 0 && (
            <Typography>Thank you for your support</Typography>
          )}
          <Box maxWidth="sm" marginLeft={4}>
            {canMint && availableMint > 1 && (
              <Slider
                aria-label="Mint amount"
                value={mintAmount}
                getAriaValueText={(value) => value.toString()}
                onChange={(_, value) => setMintAmount(value as number)}
                step={1}
                max={availableMint}
                min={minMintAmount}
                valueLabelDisplay="auto"
                marks={[]}
              />
            )}
          </Box>
        </CardContent>
        <CardActions>
          {!connected && (
            <Button size="small" onClick={doConnect}>
              Connect
            </Button>
          )}
          {connected && canMint && (
            <Button size="small" onClick={mint} disabled={!canMint}>
              Mint
            </Button>
          )}
          {connected && !canMint && availableClaims.length > 0 && (
            <Button size="small" onClick={mint}>
              Claim
            </Button>
          )}
          {connected &&
            (availableMint === 0 || availableClaims.length == 0) && (
              <TweetCheck />
            )}
        </CardActions>
      </Card>
    </>
  );
};
