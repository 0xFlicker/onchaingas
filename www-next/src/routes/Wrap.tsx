"use client";
import { FC } from "react";
import Head from "next/head";
import { DefaultProvider } from "@/context/default";
import { NextPage } from "next";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import { Main } from "@/layouts/Main";
import { SiteMenu } from "@/features/appbar/components/SiteMenu";
import { useAccount, useReadContract } from "wagmi";
import { LinksMenuItems } from "@/features/appbar/components/LinksMenuItems";
import { WrapPage } from "@/features/wrap/components/WrapPage";
import { useChainContracts } from "@/hooks/useChainContracts";
import { formatEther } from "viem";
import { useRouter } from "next/navigation";
import { UnsupportedNetwork } from "@/features/wrap/UnsupportedNetwork";

const Content: FC<{
  network: "mainnet" | "sepolia";
}> = ({ network }) => {
  const { replace } = useRouter();
  const { chain } = useAccount();
  if (chain && chain?.name.toLowerCase() !== network) {
    if ([1, 11155111].includes(chain?.id)) {
      const name = chain.id === 1 ? "mainnet" : chain.name.toLowerCase();
      replace(`/${name}/wrap`);
    }
  }

  const { wrappedNftContractAbi, wrappedNftContractAddress } =
    useChainContracts();
  const { data: wrapCost } = useReadContract({
    abi: wrappedNftContractAbi,
    address: wrappedNftContractAddress,
    functionName: "wrapCost",
  });

  if (chain && ![1, 11155111].includes(chain?.id)) {
    return <UnsupportedNetwork />;
  }

  return (
    <Main
      menu={
        <>
          <MenuList dense disablePadding>
            <LinksMenuItems />
            <SiteMenu isWrap />
          </MenuList>
        </>
      }
      title={
        <Typography
          variant="h5"
          component="h1"
          marginLeft={2}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          it&apos;s a wrap
        </Typography>
      }
      right={
        <Typography
          variant="h6"
          component="h1"
          marginLeft={2}
          sx={{
            fontSize: {
              xs: "0.75rem",
              sm: "1rem",
              md: "1.25rem",
              lg: "1.5rem",
            },
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {wrapCost ? (
            <>
              <span style={{ whiteSpace: "nowrap", marginRight: "0.5rem" }}>
                wrap fee:
              </span>
              <span style={{ whiteSpace: "nowrap" }}>
                {formatEther(wrapCost)} ETH
              </span>
            </>
          ) : null}
        </Typography>
      }
    >
      <WrapPage network={network} />
    </Main>
  );
};

const Wrap: NextPage<{
  network: "mainnet" | "sepolia";
}> = ({ network }) => {
  return (
    <DefaultProvider mainnet>
      <Head>
        <title>Fame Lady Society Wrap</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Content network={network} />
    </DefaultProvider>
  );
};
export default Wrap;
