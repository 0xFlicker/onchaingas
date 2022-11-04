import { FC, useCallback, useState, MouseEvent, useMemo } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Image from "next/image";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/CheckCircle";
import { IconButton, ListItem } from "@mui/material";
import { decorateChainImageUrl, TChain, useWeb3 } from "../hooks";
import { supportedChains } from "utils/config";
import { useNetwork, useSwitchNetwork } from "wagmi";

export const ConnectedDropDownModal: FC<{
  anchorEl: Element;
  chains: TChain[];
  handleClose: () => void;
  handleSwitch: (chain: TChain) => void;
  currentChain: TChain;
}> = ({ anchorEl, handleClose, handleSwitch, chains, currentChain }) => {
  const open = Boolean(anchorEl);
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      onClose={handleClose}
      keepMounted
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ width: 320 }}>
        <MenuList disablePadding>
          {chains.map((chain) => (
            <MenuItem key={chain.id} onClick={() => handleSwitch(chain)}>
              <ListItemIcon>
                {currentChain.id === chain.id ? (
                  // large CheckIcon
                  <CheckIcon sx={{ fontSize: 40 }} />
                ) : (
                  <Image
                    src={chain.chainImageUrl}
                    alt=""
                    width={40}
                    height={40}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography textAlign="right">{chain.name}</Typography>
                }
              />
            </MenuItem>
          ))}
        </MenuList>
      </Box>
    </Menu>
  );
};
export const ChainSelector: FC = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null);

  const { chain: networkChain } = useNetwork();
  const chain = useMemo(
    () => decorateChainImageUrl(networkChain),
    [networkChain]
  );
  const {
    chains: wagmiChains,
    error,
    isLoading,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork();
  const chains = useMemo(
    () => wagmiChains.filter((a) => !!a).map(decorateChainImageUrl),
    [wagmiChains]
  );
  const handleMenu = useCallback((event: MouseEvent) => {
    setMenuAnchorEl(event.currentTarget);
  }, []);
  const onMenuClose = useCallback(() => {
    setMenuAnchorEl(null);
  }, []);
  const handleSwitch = useCallback(
    (chain: TChain) => {
      onMenuClose();
      switchNetwork(chain.id);
    },
    [onMenuClose, switchNetwork]
  );
  return (
    <>
      <IconButton onClick={handleMenu} size="small">
        <Image src={chain.chainImageUrl} alt="" width={40} height={40} />
        {isLoading && (
          <CircularProgress
            variant="indeterminate"
            sx={{
              width: 40,
              height: 40,
              position: "absolute",
            }}
          />
        )}
      </IconButton>
      <ConnectedDropDownModal
        anchorEl={menuAnchorEl}
        handleClose={onMenuClose}
        handleSwitch={handleSwitch}
        chains={chains}
        currentChain={chain}
      />
    </>
  );
};
