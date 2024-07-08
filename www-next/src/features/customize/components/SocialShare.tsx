import React, { FC, useState } from "react";

import XIcon from "@mui/icons-material/X";
import Button from "@mui/material/Button";
import NextImage from "next/image";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { mainnet } from "viem/chains";
import { useChainId } from "wagmi";
import Skeleton from "@mui/material/Skeleton";

export const SocialShareDialog: FC<{
  name: string;
  tokenId: bigint;
  open: boolean;
  network?: "mainnet" | "sepolia";
  textProvider: (tokenId: bigint, name: string) => string;
  onClose: () => void;
}> = ({ name, tokenId, open, onClose, network, textProvider }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <SocialShare
          name={name}
          tokenId={tokenId}
          onClose={onClose}
          network={network}
          textProvider={textProvider}
        />
      </Dialog>
    </>
  );
};

export const SocialShare: FC<{
  tokenId: bigint;
  name: string;
  network?: "mainnet" | "sepolia";
  textProvider: (tokenId: bigint, name: string) => string;
  onClose?: () => void;
}> = ({ tokenId, name, network: propsNetwork, textProvider, onClose }) => {
  const chainId = useChainId();
  const network =
    propsNetwork ?? chainId === mainnet.id ? "mainnet" : "sepolia";
  const imgUrl = `${process.env.OG_BASE_URL}/${network}/og/token/${tokenId}`;
  const shareUrl = `${process.env.OG_BASE_URL}/${network}/token/${tokenId}`;

  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Card>
      <CardHeader title="Share" />
      {!imageLoaded && (
        <Skeleton
          variant="rectangular"
          width={1100}
          style={{ paddingTop: "52.36%" }}
        />
      )}
      <CardMedia
        component="img"
        src={imgUrl}
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? "block" : "none" }}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          (if sharing on x, copy the image above so that you can paste the image
          to the post)
        </Typography>

        <Typography variant="body2" color="textPrimary" mt={1}>
          Share on
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          href={`https://twitter.com/intent/tweet?text=${textProvider(tokenId, name)}%0A&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<XIcon />}
        >
          Twitter
        </Button>
        <Button
          href={`https://warpcast.com/~/compose?text=${textProvider(tokenId, name)}&embeds[]=${shareUrl}`}
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
          Warpcast
        </Button>

        {onClose && <Button onClick={onClose}>Close</Button>}
      </CardActions>
    </Card>
  );
};
