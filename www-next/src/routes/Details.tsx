"use client";
import Container from "@mui/material/Container";
import { DefaultProvider } from "@/context/default";
import { NextPage } from "next";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import { Main } from "@/layouts/Main";
import { SiteMenu } from "@/features/appbar/components/SiteMenu";
import { LinksMenuItems } from "@/features/appbar/components/LinksMenuItems";
import { TokenDetails } from "@/features/customize/components/TokenDetails";
import { IMetadata } from "@/utils/metadata";

const Details: NextPage<{
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
              <SiteMenu isCustomize />
            </MenuList>
          </>
        }
        title={
          <Typography variant="h5" component="h1" marginLeft={2}>
            customize
          </Typography>
        }
      >
        <Container maxWidth="xl" sx={{ py: 2, mt: 8 }}>
          <TokenDetails
            metadata={metadata}
            tokenId={tokenId}
            network={network}
          />
        </Container>
      </Main>
    </DefaultProvider>
  );
};
export default Details;
