"use client";
import Container from "@mui/material/Container";
import { DefaultProvider } from "@/context/default";
import { NextPage } from "next";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import { Main } from "@/layouts/Main";
import { SiteMenu } from "@/features/appbar/components/SiteMenu";
import { LinksMenuItems } from "@/features/appbar/components/LinksMenuItems";
import { IMetadata } from "@/utils/metadata";
import { Token } from "@/components/Token";
import { FC } from "react";
import { useFlsTokenAllocation } from "@/features/token/hooks/useFlsTokenAllocation";

const Content: FC<{
  metadata: IMetadata;
  tokenId: number;
  network?: "mainnet" | "sepolia";
}> = ({ metadata, tokenId, network }) => {
  const allocation = useFlsTokenAllocation(tokenId);
  return (
    <Token
      metadata={metadata}
      tokenId={tokenId}
      network={network}
      allocation={allocation}
    />
  );
};

export const TokenPage: FC<{
  metadata: IMetadata;
  tokenId: number;
  network?: "mainnet" | "sepolia";
}> = ({ metadata, tokenId, network }) => {
  return (
    <DefaultProvider mainnet>
      <Main
        menu={
          <>
            <MenuList dense disablePadding>
              <LinksMenuItems />
              <SiteMenu />
            </MenuList>
          </>
        }
        title={
          <Typography variant="h5" component="h1" marginLeft={2}>
            {metadata.name}
          </Typography>
        }
      >
        <Container maxWidth="xl" sx={{ py: 2, mt: 8 }}>
          <Content metadata={metadata} tokenId={tokenId} network={network} />
        </Container>
      </Main>
    </DefaultProvider>
  );
};
