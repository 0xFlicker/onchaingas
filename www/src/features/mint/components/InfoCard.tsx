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
    <Card variant="outlined">
      <Card>
        <CardHeader title="What is it?" />
        <CardContent sx={{ ml: 2 }}>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Onchain Gas is a <b>100% on-chain</b> NFT that visualizes the
            current gas price.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="How does it work?" />
        <CardContent sx={{ ml: 2 }}>
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
            Onchain Gas NFT has a royalty of 0% on secondary sales.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Embedding" />
        <CardContent sx={{ ml: 2 }}>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Embed the visualizer on your website by using the following code{" "}
            <i>(replace 1 with the token ID you want to load)</i>:
          </Typography>
          <Typography variant="body2" color="text.primary" gutterBottom>
            To get the svg image:
          </Typography>
          <WrappedLink
            sx={{ ml: 2 }}
            href="https://0xflick.xyz/onchaingas/svg/1"
          >
            https://0xflick.xyz/onchaingas/svg/1
          </WrappedLink>
          <Typography variant="body2" color="text.primary" gutterBottom>
            To get the embedded webpage:
          </Typography>
          <WrappedLink
            sx={{ ml: 2 }}
            href="https://0xflick.xyz/onchaingas/iframe/1"
          >
            https://0xflick.xyz/onchaingas/iframe/1
          </WrappedLink>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Raw onchain metadata:
          </Typography>
          <WrappedLink
            sx={{ ml: 2 }}
            href="https://0xflick.xyz/onchaingas/metadata/1"
          >
            https://0xflick.xyz/onchaingas/metadata/1
          </WrappedLink>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Example embedded HTML image:
          </Typography>
          <Typography
            sx={{ ml: 2 }}
            variant="caption"
            component="pre"
            color="text.primary"
            gutterBottom
          >
            <CopyToClipboardText
              text={`<image src="https://0xflick.xyz/onchaingas/svg/1" width="500" height="500" />`}
            >
              {`<image src="https://0xflick.xyz/onchaingas/svg/1" width="500" height="500" />`}
            </CopyToClipboardText>
          </Typography>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Example embedded webpage:
          </Typography>
          <Typography
            sx={{ ml: 2 }}
            variant="caption"
            component="pre"
            color="text.primary"
            gutterBottom
          >
            <CopyToClipboardText
              text={`<iframe src="https://0xflick.xyz/onchaingas/iframe/1" width="500" height="500" />`}
            >
              {`<iframe src="https://0xflick.xyz/onchaingas/iframe/1" width="500" height="500" />`}
            </CopyToClipboardText>
          </Typography>
        </CardContent>
      </Card>
    </Card>
  );
};
