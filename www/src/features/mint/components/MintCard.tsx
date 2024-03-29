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
import { nftOnChainGasContractAddress } from "utils/config";
import nftAbi from "../nft.abi";
import { BigNumber, utils } from "ethers";
import Slider from "@mui/material/Slider";
import { MintModal } from "./MintModal";
import Box from "@mui/material/Box";
import { TweetMint } from "./TweetMint";

export const MintCard: FC = () => {
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
        address: nftOnChainGasContractAddress.get(),
        abi: nftAbi,
        functionName: "publicSaleActive",
      },
      {
        address: nftOnChainGasContractAddress.get(),
        abi: nftAbi,
        functionName: "totalSupply",
      },
      {
        address: nftOnChainGasContractAddress.get(),
        abi: nftAbi,
        functionName: "maxSupply",
      },
      {
        address: nftOnChainGasContractAddress.get(),
        abi: nftAbi,
        functionName: "cost",
      },
      {
        address: nftOnChainGasContractAddress.get(),
        abi: nftAbi,
        functionName: "maxMint",
      },
      {
        address: nftOnChainGasContractAddress.get(),
        abi: nftAbi,
        functionName: "availableMint",
        args: [address],
      },
    ],
  });
  const { data: balanceOfResponse, refetch: balanceRefetch } = useContractRead({
    address: nftOnChainGasContractAddress.get(),
    abi: nftAbi,
    functionName: "balanceOf",
    args: [address],
    cacheTime: 0,
  });

  const [
    publicSaleActiveResponse,
    totalSupplyResponse,
    maxSupplyResponse,
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
  const maxSupply =
    maxSupplyResponse instanceof BigNumber ? maxSupplyResponse.toNumber() : 0;
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
  const { config } = usePrepareContractWrite({
    address: nftOnChainGasContractAddress.get(),
    abi: nftAbi,
    functionName: "mint",
    args: [address, BigNumber.from(mintAmount)],
    overrides: {
      value: costWei.mul(mintAmount),
    },
  });
  const {
    data: mintData,
    isLoading: mintIsLoading,
    isSuccess: mintIsSuccess,
    write: mintWrite,
  } = useContractWrite(config);

  let description = "";
  if (publicSaleActive) {
    description = `You currently have ${balanceOf} tokens.`;
  } else {
    description = "The mint is not active yet.";
  }
  const canMint = connected && publicSaleActive && availableMint > 0;
  const willOverAllocate =
    connected && publicSaleActive && mintAmount > availableMint;
  const willExceedMaxSupply =
    connected && publicSaleActive && mintAmount + totalSupply > maxSupply;
  const willExceedMaxMint =
    connected && publicSaleActive && availableMint > maxMint;
  const allMinted = connected && publicSaleActive && availableMint === 0;

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

  return (
    <>
      <MintModal
        open={mintModalOpen}
        handleClose={handleClose}
        isLoading={mintIsLoading}
        isSuccess={mintIsSuccess}
        result={mintData}
      />
      <Card variant="outlined">
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
            {readIsLoading
              ? "Loading..."
              : `supply (${totalSupply} / ${maxSupply})`}
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
          {!willExceedMaxMint && !willOverAllocate && willExceedMaxSupply && (
            <Typography fontSize={16} color="text.secondary" component="p">
              You will exceed the max supply.
            </Typography>
          )}
          <Typography mt={2}>
            {canMint
              ? mintAmount === 0
                ? "Mint amount: 0"
                : mintAmount === 1
                ? "Mint one token"
                : `Mint ${mintAmount} tokens`
              : ""}
          </Typography>
          {connected && availableMint === 0 && (
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
                min={canMint ? 1 : 0}
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
          {connected && availableMint === 0 && <TweetMint />}
        </CardActions>
      </Card>
    </>
  );
};
