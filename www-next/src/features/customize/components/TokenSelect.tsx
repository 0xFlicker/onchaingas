"use client";
import React, { FC, useEffect, useMemo, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { thumbnailImageUrl } from "@/utils/metadata";
import { useAccount } from "wagmi";
import { useLadies } from "../hooks/useLadies";
import { Empty } from "./Empty";

export interface TokenProps {
  tokenId?: bigint;
  url?: string;
}

const NotConnected: FC<{}> = () => {
  return (
    <Grid2 xs={12}>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={2}
      >
        <Typography variant="h6" color="text.secondary">
          Connect your wallet to see your Fame Ladies
        </Typography>
      </Box>
    </Grid2>
  );
};

export const TokenSelect: FC<{
  prefix?: string;
}> = ({ prefix = "" }) => {
  const { address, isConnected } = useAccount();
  const [couldLoadMore, setCouldLoreMore] = useState(true);
  const first =
    typeof window !== "undefined"
      ? Math.floor(window.innerHeight / 300) * 8
      : 64;
  const [skip, setSkip] = useState(0);
  const [tokens, setTokens] = useState<TokenProps[]>([]);
  const { data, isLoading } = useLadies({
    owner: address,
    sorted: "asc",
    first,
    skip,
  });
  useEffect(() => {
    if (data) {
      const newTokens = data.map((tokenId) => ({
        tokenId,
        url: `${prefix}/${tokenId}`,
      }));
      setTokens((prevTokens) => [...prevTokens, ...newTokens]);
    }
  }, [data, prefix]);
  const gridTokens = useMemo(
    () =>
      tokens.map(({ tokenId }) => {
        const t = Number(tokenId);
        return (
          <>
            <CardHeader title={`FLS ${t}`} />
            <CardMedia
              component="img"
              image={thumbnailImageUrl(t)}
              sx={{
                objectFit: "contain",
                width: "100%",
                transition: "transform 0.5s ease-in-out",
              }}
            />
          </>
        );
      }),
    [tokens],
  );
  return (
    <Grid2 container spacing={1}>
      {!isLoading && tokens.length === 0 && <Empty />}
      {tokens.map(({ tokenId, url }, i) => {
        return (
          <Grid2 xs={12} sm={6} md={4} lg={3} key={tokenId}>
            <Card>
              {typeof tokenId === "bigint" && typeof url === "string" ? (
                <CardActionArea href={url}>{gridTokens[i]}</CardActionArea>
              ) : (
                gridTokens[i]
              )}
            </Card>
          </Grid2>
        );
      })}
      <Grid2 xs={12}>
        <Box
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          my={2}
        >
          {!isConnected && <NotConnected />}
          {isLoading && isConnected ? (
            <CircularProgress />
          ) : tokens.length > 0 ? (
            <Button
              disabled={!couldLoadMore}
              onClick={() => {
                setSkip((prev) => prev + first);
              }}
              sx={{
                width: "100%",
              }}
            >
              Load more
            </Button>
          ) : null}
        </Box>
      </Grid2>
    </Grid2>
  );
};
