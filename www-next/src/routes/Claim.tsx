"use client";
import React, { FC, useEffect } from "react";
import { redirect } from "next/navigation";
import { DefaultProvider } from "@/context/default";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

import { Main } from "@/layouts/Main";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import { FameLadySocietyClaimCard } from "@/features/claim/components/FameLadySocietyClaimCard";
import { OnChainGasClaimCard } from "@/features/claim/components/OnChainGasClaimCard";
import { OnChainCheckGasClaimCard } from "@/features/claim/components/OnChainCheckGasClaimCard";
import { base, sepolia } from "viem/chains";
import { FameBalanceCard } from "@/features/claim/components/FameBalanceCard";

const Content: FC<{
  chainId: typeof sepolia.id | typeof base.id;
}> = ({ chainId }) => {
  const account = useAccount();
  useEffect(() => {
    if (account.address && isAddress(account.address)) {
      redirect(
        `${chainId === sepolia.id ? "/sepolia" : "/base/"}/claim/${account.address}`
      );
    }
  }, [chainId, account.address]);
  return (
    <Container sx={{ mt: 8 }}>
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <FameBalanceCard chainId={chainId} />
        </Grid2>

        {account.address && (
          <>
            <FameLadySocietyClaimCard chainId={chainId} />
            <OnChainGasClaimCard chainId={chainId} />
            <OnChainCheckGasClaimCard chainId={chainId} />
          </>
        )}
        <Grid2 xs={12}>
          <Card>
            <CardActionArea href="/fame">
              <CardContent>
                <Typography variant="body1">
                  Click here for more information on $FAME.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};
const NextPage: FC<{
  chainId: typeof sepolia.id | typeof base.id;
}> = ({ chainId }) => {
  return (
    <DefaultProvider base siwe mainnet>
      <Main
        title={
          <Typography variant="h5" component="h1" marginLeft={2}>
            Claim to $FAME
          </Typography>
        }
      >
        <Content chainId={chainId} />
      </Main>
    </DefaultProvider>
  );
};
export default NextPage;
