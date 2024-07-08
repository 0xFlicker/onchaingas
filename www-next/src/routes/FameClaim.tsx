"use client";
import React, { FC } from "react";
import { redirect } from "next/navigation";
import { DefaultProvider } from "@/context/default";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

import { Main } from "@/layouts/Main";
import { SlimChecker } from "@/features/claim/components/SlimChecker";
import { OG_AGE_BOOST, OG_RANK_BOOST } from "@/features/claim/hooks/constants";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import { FameLadySocietyClaimCard } from "@/features/claim/components/FameLadySocietyClaimCard";
import { OnChainGasClaimCard } from "@/features/claim/components/OnChainGasClaimCard";
import { OnChainCheckGasClaimCard } from "@/features/claim/components/OnChainCheckGasClaimCard";
import { base, sepolia } from "viem/chains";
import { FameBalanceCard } from "@/features/claim/components/FameBalanceCard";

const Content: FC<{
  address: `0x${string}`;
  chainId: typeof sepolia.id | typeof base.id;
}> = ({ address, chainId }) => {
  const account = useAccount();

  return (
    <Container sx={{ mt: 8 }}>
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <Card
            sx={{
              marginTop: 4,
            }}
          >
            <CardContent>
              <Typography variant="body1">
                These numbers are an estimate and subject to change.
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 xs={12}>
          <FameBalanceCard chainId={chainId} />
        </Grid2>
        <Grid2 xs={12}>
          <SlimChecker
            address={address}
            chainId={8453}
            ageBoost={OG_AGE_BOOST}
            rankBoost={OG_RANK_BOOST}
          />
        </Grid2>
        {account.address && account.address !== address && (
          <Grid2 xs={12}>
            <Card>
              <CardActionArea
                href={`/${chainId === sepolia.id ? "sepolia" : ""}/claim/${account.address}`}
              >
                <CardContent>
                  <Typography variant="body1">
                    You are connected with the address {account.address}, click
                    here to go to your claim page
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid2>
        )}
        {account.address === address && (
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
  address: string;
  chainId: typeof sepolia.id | typeof base.id;
}> = ({ address, chainId }) => {
  const isValid = isAddress(address);
  return (
    <DefaultProvider base siwe mainnet>
      <Main
        title={
          <Typography variant="h5" component="h1" marginLeft={2}>
            Claim to $FAME
          </Typography>
        }
      >
        {isValid ? (
          <Content address={address} chainId={chainId} />
        ) : (
          <Container sx={{ mt: 8 }}>
            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <Card
                  sx={{
                    marginTop: 4,
                  }}
                >
                  <CardContent>
                    <Typography variant="body1">
                      Invalid address {address}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            </Grid2>
          </Container>
        )}
      </Main>
    </DefaultProvider>
  );
};
export default NextPage;
