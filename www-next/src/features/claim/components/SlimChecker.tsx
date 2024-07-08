import { FC, useState } from "react";
import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NextImage from "next/image";
import XIcon from "@mui/icons-material/X";
import { formatUnits } from "viem";
import { useAllocation } from "../hooks/useAllocation";
import { useAccount, useChainId, useEnsAddress } from "wagmi";
import { formatFame } from "@/utils/fame";
import { usePresaleAmount } from "../hooks/usePresale";
import { base, sepolia } from "viem/chains";

function formatUnit(amount: bigint) {
  return Math.floor(Number(formatUnits(amount, 18)));
}

const NotConnected: FC = () => {
  return (
    <>
      <CardHeader title="Token Claim Simulator" />
      <CardContent>
        <Typography variant="body1">
          Please connect your wallet to simulate token claims.
        </Typography>
      </CardContent>
    </>
  );
};

const SHARE_TEXT = (address: string, claimAmount: bigint) => {
  switch (Math.floor(Math.random() * 2)) {
    case 0:
      return `💋 OMG! I can claim ${formatFame(
        claimAmount,
      )}!💰 Flaunt with @fameladysociety and embrace WebWE!`;
    case 1:
    default:
      return `✨Feeling fabulous with ${formatFame(
        claimAmount,
      )}!💰 Join me in flaunting @fameladysociety and the power of WebWE!`;
  }
};

export const SlimChecker: FC<
  {
    ageBoost: number;
    rankBoost: number;
    address?: `0x${string}`;
    chainId?: typeof sepolia.id | typeof base.id;
  } & CardProps
> = ({
  ageBoost,
  rankBoost,
  address: defaultAddress,
  chainId: defaultChainId,
  ...cardProps
}) => {
  const { address: currentAddress } = useAccount();
  const connectedChainId = useChainId();
  const chainId = defaultChainId || connectedChainId;
  const address = defaultAddress || currentAddress;

  const {
    fls,
    hunnys,
    mermaids,
    metavixens,
    squad,
    total: allocationTotal,
    isLoading: isAllocationLoading,
  } = useAllocation({
    address,
    rankBoost,
    ageBoost,
  });
  const { amount: presaleAmount, isLoading: isPresaleLoading } =
    usePresaleAmount({
      ...([sepolia.id, base.id].includes(chainId as typeof sepolia.id)
        ? { address, chainId: chainId as typeof sepolia.id }
        : {}),
    });

  const total = allocationTotal + (presaleAmount || 0n);

  const shareUrl = `https://www.fameladysociety.com/fame/claim/${address}`;
  const isLoading = isAllocationLoading || isPresaleLoading;
  return (
    <Card {...cardProps}>
      {!address ? (
        <NotConnected />
      ) : (
        <>
          <CardHeader title="Token Claim Simulator" />
          <CardContent>
            {!isLoading &&
            !fls &&
            !hunnys &&
            !mermaids &&
            !metavixens &&
            !squad &&
            !presaleAmount ? (
              <Typography variant="body1">
                No allocation found for {address}
              </Typography>
            ) : null}
            {fls ? (
              <Typography variant="body1">
                Fame Lady Society: {formatUnit(fls).toLocaleString()}
              </Typography>
            ) : null}
            {squad ? (
              <Typography variant="body1">
                Fame Lady Squad (if wrapped):{" "}
                {formatUnit(squad).toLocaleString()}
              </Typography>
            ) : null}
            {hunnys ? (
              <Typography variant="body1">
                Hunnys: {formatUnit(hunnys).toLocaleString()}
              </Typography>
            ) : null}
            {mermaids ? (
              <Typography variant="body1">
                Mermaids: {formatUnit(mermaids).toLocaleString()}
              </Typography>
            ) : null}
            {metavixens ? (
              <Typography variant="body1">
                Metavixens: {formatUnit(metavixens).toLocaleString()}
              </Typography>
            ) : null}
            {presaleAmount ? (
              <Typography variant="body1">
                Presale: {formatUnit(presaleAmount).toLocaleString()}
              </Typography>
            ) : null}
            {total ? (
              <Typography variant="body1">
                Total $FAME: {formatUnit(total).toLocaleString()}
              </Typography>
            ) : null}
            {total ? (
              <Typography variant="body1">
                Total $FAME NFTs: {Math.floor(formatUnit(total) / 1_000_000)}
              </Typography>
            ) : null}
          </CardContent>
          {total && total > 0n && (
            <CardActions>
              <Button
                href={`https://twitter.com/intent/tweet?text=${SHARE_TEXT(address, total)}%0A&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<XIcon />}
              >
                Share on Twitter
              </Button>
              <Button
                href={`https://warpcast.com/~/compose?text=${SHARE_TEXT(address, total)}&embeds[]=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={
                  <NextImage
                    src="/images/logos/warpcast.png"
                    width={24}
                    height={24}
                    alt=""
                  />
                }
              >
                Share on Warpcast
              </Button>
            </CardActions>
          )}
        </>
      )}
    </Card>
  );
};
