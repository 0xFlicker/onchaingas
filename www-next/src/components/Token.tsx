import React, { FC, Fragment, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { IMetadata, imageUrl } from "@/utils/metadata";
import { SocialShareDialog } from "@/features/customize/components/SocialShare";
import Button from "@mui/material/Button";
import { formatEther } from "viem";
import { isBannedToken } from "@/service/bannedTokenIds";
import { boba } from "viem/chains";

const Attribute: FC<{ name: string; value: string | number }> = ({
  name,
  value,
}) => {
  return (
    <Box
      component="div"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignContent="center"
      padding={2}
    >
      <Typography variant="body1" color="text.secondary">
        {name}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
};

export const Token: FC<{
  metadata: IMetadata;
  tokenId: number;
  network?: "mainnet" | "sepolia";
  allocation?: bigint;
}> = ({ allocation, metadata, tokenId, network }) => {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              ...(isBannedToken(tokenId) && {
                border: "2px solid red",
              }),
            }}
          >
            {metadata.name && (
              <Button onClick={() => setShareOpen(true)}>Share</Button>
            )}
            <Typography variant="h4" align="center">
              {metadata.name}
            </Typography>
            {isBannedToken(tokenId) && (
              <Typography variant="body1" align="center">
                This token has been banned from the $FAME allocation because it
                was owned by the prior team.
              </Typography>
            )}
            {typeof allocation !== "undefined" && (
              <Typography variant="body1" align="center">
                Allocation: {formatEther(allocation).split(".")[0]} $FAME
              </Typography>
            )}
            <Box
              component="div"
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignContent="center"
            >
              <Image
                src={imageUrl(tokenId)}
                width={800}
                height={800}
                alt="Fame Lady Society Token Image"
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </Box>
          </Paper>
        </Grid2>
        <Grid2 xs={12} lg={6}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <Typography variant="body1" color="text.secondary">
              {metadata.description?.split("\n").map((line) => (
                <Fragment key={line}>
                  {line}
                  <br />
                </Fragment>
              ))}
            </Typography>
            {metadata.attributes?.map(({ trait_type, value }) => {
              return (
                <Attribute
                  key={`${trait_type}:${value}`}
                  name={trait_type}
                  value={value}
                />
              );
            })}
          </Paper>
        </Grid2>
      </Grid2>
      <SocialShareDialog
        name={metadata.name!}
        tokenId={BigInt(tokenId)}
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        network={network}
        textProvider={(_: bigint, name: string) => {
          switch (Math.floor(Math.random() * 4)) {
            case 0:
              return `Meet @fameladysociety's gem ${name}. She's a BIG DEAL! WE💋 feel the FAME, do you?`;
            case 1:
              return `💃 Flaunting the fabulous @fameladysociety ${name} 🔥 Check her out! Join us & feel the Fame!💋`;
            case 2:
              return `👀 Look at this glowing star! Check out @fameladysociety's ${name} She’s HOT & WE💋 feel it! 🔥 !`;
            case 3:
            default:
              return `💃WE are Flaunt READY! Excited to show off @fameladysociety's ${name} 🌟 💋 get FAMEUS with US!`;
          }
        }}
      />
    </>
  );
};
7;
