import {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import CopyIcon from "@mui/icons-material/ContentCopy";
import { WrappedLink } from "components/WrappedLink";

export const CopyToClipboardText: FC<
  PropsWithChildren<{
    text: string;
  }>
> = ({ children, text }) => {
  const [open, setOpen] = useState(false);
  const handleClick: MouseEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      setOpen(true);
      window.navigator.clipboard.writeText(text);
    },
    [text]
  );
  return (
    <>
      <Button
        startIcon={<CopyIcon />}
        variant="text"
        sx={{ textTransform: "none" }}
        onClick={handleClick}
      >
        {children}
      </Button>

      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </>
  );
};

export const InfoCard: FC = () => {
  return (
    <>
      <Card>
        <CardHeader title="What is it?" />
        <CardContent sx={{ ml: 2 }}>
          <Typography variant="body2" color="text.primary" gutterBottom>
            On Chain Check Gas is a <b>100% on-chain</b> Open Edition NFT that
            visualizes the current gas price.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Who can claim for free?" />
        <CardContent sx={{ ml: 2 }}>
          <Typography variant="body2" color="text.primary" gutterBottom>
            On Chain Gas holders can claim 1 free token per On Chain Gas token.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="How does it work?" />
        <CardContent sx={{ ml: 2 }}>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Most NFTs are stored on a centralized server, which means that the
            when the token is loaded, the metadata is fetched from the server.
            This is not the case with On Chain Check Gas. The metadata is stored
            on the blockchain, which means that the token can be loaded without
            any additional requests. In addition, the metadata contains a fully
            functioning webpage, which is injected into the token. The
            visualizer you see is the webpage that is stored on the blockchain.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="What does the non-animated token image do?" />
        <CardContent sx={{ ml: 2 }}>
          <Typography variant="body2" color="text.primary" gutterBottom>
            There are two on-chain representations provided. One is the animated
            gas visualizer you see here. The other is the static image that is
            typically shown is list views. The static image is randomly
            generated at mint time and shows the price of gas when the token was
            minted as well as a random field of checks. The higher gas when
            minted, the higher chance of spawning more checks.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Where do gas updates come from?" />
        <CardContent sx={{ ml: 2 }}>
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
        <CardContent sx={{ ml: 2 }}>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Onchain Check Gas NFT has a royalty of 0% on secondary sales.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
