"use client";
import Container from "@mui/material/Container";
import { DefaultProvider } from "@/context/default";
import { NextPage } from "next";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import { Main } from "@/layouts/Main";
import { SiteMenu } from "@/features/appbar/components/SiteMenu";
import { LinksMenuItems } from "@/features/appbar/components/LinksMenuItems";
import { SelectPage } from "@/features/customize/SelectPage";
import { FC } from "react";
import { useAccount } from "wagmi";
import { UnsupportedNetwork } from "@/features/wrap/UnsupportedNetwork";
import { useRouter } from "next/navigation";

const Content: FC<{ prefix?: string; network: "mainnet" | "sepolia" }> = ({
  network,
  prefix = "",
}) => {
  const { replace } = useRouter();
  const { chain } = useAccount();
  if (chain && chain?.name.toLowerCase() !== network) {
    const name = chain.id === 1 ? "mainnet" : chain.name.toLowerCase();
    replace(`/${name}/customize`);
  }

  if (chain && ![1, 11155111].includes(chain?.id)) {
    return <UnsupportedNetwork />;
  }
  return (
    <Container maxWidth="lg" sx={{ py: 2, mt: 8 }}>
      <SelectPage prefix={prefix} />
    </Container>
  );
};

const Customize: NextPage<{
  network: "mainnet" | "sepolia";
  prefix?: string;
}> = ({ prefix = "", network }) => {
  return (
    <DefaultProvider siwe mainnet>
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
        <Content prefix={prefix} network={network} />
      </Main>
    </DefaultProvider>
  );
};
export default Customize;
