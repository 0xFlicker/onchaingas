import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Button, { ButtonProps } from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "app/store";
import { FC, useCallback, useState, MouseEvent } from "react";
import {
  actions as web3Actions,
  selectors as web3Selectors,
  WalletType,
} from "../redux";
import { WalletModal } from "./WalletModal";
import { WrongChainModal } from "./WrongChainModal";
import { ConnectedDropDownModal } from "./ConnectedDropDownModal";
import { defaultChain } from "utils/config";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useEnsAvatar, useEnsName } from "wagmi";

const Connect: FC<{
  size?: ButtonProps["size"];
}> = ({ size }) => {
  // Used to lazy render the ENS name, to avoid hydration mismatch
  const [settleEnsName, setSettledEnsName] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null);
  const address = useAppSelector(web3Selectors.address);
  const { data: ensName, isLoading: ensNameIsLoading } = useEnsName({
    address,
  });
  const { data: ensAvatar, isLoading: ensAvatarIsLoading } = useEnsAvatar({
    address,
  });
  const onClick = useCallback(() => {
    dispatch(web3Actions.openWalletSelectModal());
  }, [dispatch]);

  const handleDisconnect = useCallback(() => {
    dispatch(web3Actions.reset());
    setMenuAnchorEl(null);
  }, [dispatch]);

  const onMenuClose = useCallback(() => {
    setMenuAnchorEl(null);
  }, []);
  const handleMenu = useCallback((event: MouseEvent) => {
    setMenuAnchorEl(event.currentTarget);
  }, []);

  const isOpen = useAppSelector(web3Selectors.isWalletSelectModalOpen);
  const isWrongNetwork = useAppSelector(web3Selectors.isWrongNetwork);
  const selectedAddress = useAppSelector(web3Selectors.address);
  const currentChainId = useAppSelector(web3Selectors.currentChainId);
  const currentChainName = defaultChain.get().name;
  const handleModalClose = useCallback(() => {
    dispatch(web3Actions.closeWalletSelectModal());
  }, [dispatch]);
  const handleMetamask = useCallback(() => {
    dispatch(web3Actions.walletPending(WalletType.METAMASK));
    dispatch(web3Actions.closeWalletSelectModal());
  }, [dispatch]);
  const handleWalletConnect = useCallback(() => {
    dispatch(web3Actions.walletPending(WalletType.WALLET_CONNECT));
    dispatch(web3Actions.closeWalletSelectModal());
  }, [dispatch]);
  const handleCoinbaseConnect = useCallback(() => {
    dispatch(web3Actions.walletPending(WalletType.COINBASE_WALLET));
    dispatch(web3Actions.closeWalletSelectModal());
  }, [dispatch]);
  const handleChangeNetworkAbort = useCallback(() => {
    dispatch(web3Actions.reset());
  }, [dispatch]);
  const handleSwitchNetwork = useCallback(() => {
    dispatch(web3Actions.switchChain());
  }, [dispatch]);

  return (
    <>
      {selectedAddress ? (
        <Tooltip title={ensName ? ensName : selectedAddress}>
          <Button
            variant="outlined"
            size={size}
            sx={{
              m: "0.5rem",
            }}
            onClick={handleMenu}
          >
            {ensNameIsLoading ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "12rem",
                }}
              >
                <CircularProgress size={30} />
              </Box>
            ) : (
              <Typography
                component="span"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  px: "1rem",
                  py: "0.5rem",
                  maxWidth: "12rem",
                }}
              >
                {ensName ? ensName : selectedAddress}
              </Typography>
            )}
          </Button>
        </Tooltip>
      ) : (
        <Button onClick={onClick}>Connect</Button>
      )}
      <WalletModal
        open={isOpen}
        handleClose={handleModalClose}
        handleMetamask={handleMetamask}
        handleWalletConnect={handleWalletConnect}
        handleCoinbaseConnect={handleCoinbaseConnect}
      />
      <WrongChainModal
        chainName={currentChainName}
        open={isWrongNetwork}
        handleClose={handleChangeNetworkAbort}
        handleChangeNetwork={handleSwitchNetwork}
      />
      <ConnectedDropDownModal
        anchorEl={menuAnchorEl}
        handleClose={onMenuClose}
        handleDisconnect={handleDisconnect}
      />
    </>
  );
};

export { Connect };
