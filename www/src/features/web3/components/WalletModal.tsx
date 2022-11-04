import { FC } from "react";
import { Backdrop, Box, Button, Grid, Modal, Typography } from "@mui/material";
import Image from "next/image";
import { Fade } from "transitions/Fade";

interface IProps {
  open: boolean;
  handleClose: () => void;
  handleMetamask: () => void;
  handleWalletConnect: () => void;
  handleCoinbaseConnect: () => void;
}

export const WalletModal: FC<IProps> = ({
  open,
  handleClose,
  handleMetamask,
  handleWalletConnect,
  handleCoinbaseConnect,
}) => {
  return (
    <Modal
      aria-labelledby="modal-wallet-title"
      aria-describedby="modal-wallet-description"
      open={open}
      onClose={handleClose}
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
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-wallet-title" variant="h6" component="h2">
            Connect your wallet
          </Typography>
          <Typography id="modal-wallet-description" sx={{ mt: 2 }}>
            Pick from the following web wallets
          </Typography>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ marginTop: "2rem" }}
          >
            <Grid item style={{ marginTop: "1rem" }}>
              <Button
                onClick={handleMetamask}
                variant="outlined"
                startIcon={
                  <Image
                    alt=""
                    src="/metamask-fox.svg"
                    width={25}
                    height={25}
                  />
                }
              >
                Metamask
              </Button>
            </Grid>
            <Grid item style={{ marginTop: "1rem" }}>
              <Button
                onClick={handleWalletConnect}
                variant="outlined"
                startIcon={
                  <Image
                    alt=""
                    src="/walletconnect.svg"
                    width={25}
                    height={25}
                  />
                }
              >
                WalletConnect
              </Button>
            </Grid>
            <Grid item style={{ marginTop: "1rem" }}>
              <Button
                onClick={handleCoinbaseConnect}
                variant="outlined"
                startIcon={
                  <Image
                    alt=""
                    src="/wallets/coinbase_wallet.png"
                    width={25}
                    height={25}
                  />
                }
              >
                Coinbase Wallet
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};
