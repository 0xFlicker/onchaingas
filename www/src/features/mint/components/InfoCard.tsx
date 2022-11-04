import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

export const InfoCard: FC = () => {
  return (
    <>
      <Card>
        <CardHeader title="What is it?" />
        <CardContent>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Onchain Gas is a <b>100% on-chain</b> NFT that visualizes the
            current gas price.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="How does it work?" />
        <CardContent>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Most NFTs are stored on a centralized server, which means that the
            when the token is loaded, the metadata is fetched from the server.
            This is not the case with Onchain Gas. The metadata is stored on the
            blockchain, which means that the token can be loaded without any
            additional requests. In addition, the metadata contains a fully
            functioning webpage, which is injected into the token. The
            visualizer you see is the webpage that is stored on the blockchain.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Where do gas updates come from?" />
        <CardContent>
          <Typography variant="body2" color="text.primary" gutterBottom>
            When the token is loaded, the current gas price is injected into the
            visualizer. There is an option for live updates, which will make a
            connection to a web3 RPC for additional updates after the first
            load. This RPC is currently provided by infura, but can be updated
            in the future to any other RPC provider by the contract owner.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Royalties?" />
        <CardContent>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Onchain Gas NFT has a royalty of 0% on secondary sales.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
