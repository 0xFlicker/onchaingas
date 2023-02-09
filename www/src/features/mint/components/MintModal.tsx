import { FC, useEffect, useState, useCallback, useMemo } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { Fade } from "transitions/Fade";
import { formatAddressShort } from "utils/formatter";
import { utils } from "ethers";
import { SendTransactionResult } from "@wagmi/core";
import { blockchainExplorerUrl } from "utils/config";
import { TweetMint } from "./TweetMint";
import { TweetCheck } from "./TweetCheck";
import CardActions from "@mui/material/CardActions";

interface IProps {
  open: boolean;
  result?: SendTransactionResult;
  isLoading: boolean;
  isSuccess: boolean;
  handleClose: () => void;
  isCheck?: boolean;
}

export const MintModal: FC<IProps> = ({
  open,
  result,
  handleClose,
  isLoading,
  isSuccess,
  isCheck,
}) => {
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    if (result?.wait) {
      result.wait().then(() => {
        setVerified(true);
      });
    }
  }, [result]);
  const doClose = useCallback(() => {
    handleClose();
    setTimeout(() => {
      setVerified(false);
    }, 5000);
  }, [handleClose]);
  useEffect(() => {
    if (!isSuccess && !isLoading) {
      handleClose();
    }
  }, [handleClose, isSuccess, isLoading]);

  return (
    <Modal
      aria-labelledby="modal-mint-presale-title"
      aria-describedby="modal-mint-presale-description"
      open={open}
      onClose={doClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "600px",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Card>
            <CardHeader id="modal-mint-presale-title" title="Minting" />
            <CardContent>
              <Box
                id="modal-mint-presale-description"
                minHeight={200}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignContent="center"
              >
                {isSuccess && !verified && (
                  <Typography sx={{ my: 2, mx: 2 }} textAlign="center">
                    Your transaction is being processed. Please wait.
                  </Typography>
                )}
                {isLoading && !verified && (
                  <Typography sx={{ my: 2, mx: 2 }} textAlign="center">
                    Accept the mint transaction.
                  </Typography>
                )}
                {!verified && (
                  <Box display="flex" justifyContent="center">
                    <CircularProgress variant="indeterminate" />
                  </Box>
                )}

                {result?.hash && verified && (
                  <Box sx={{ my: 2, mx: 2 }} textAlign="center">
                    <Typography gutterBottom>
                      Your transaction was successful.
                    </Typography>
                  </Box>
                )}
                {result?.hash && (
                  <Box sx={{ my: 2 }} textAlign="center">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${blockchainExplorerUrl.get()}/tx/${result?.hash}`}
                    >{`TX: ${formatAddressShort(result.hash, 12)}`}</a>
                  </Box>
                )}
              </Box>
            </CardContent>
            <CardActions>
              {result?.hash && (isCheck ? <TweetCheck /> : <TweetMint />)}
            </CardActions>
          </Card>
        </Box>
      </Fade>
    </Modal>
  );
};
