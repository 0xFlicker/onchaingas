import {
  FC,
  MouseEventHandler,
  MouseEvent,
  useCallback,
  useState,
  ReactNode,
} from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import NextImage from "next/image";
import { Connect } from "features/web3";
import { HomeMenu } from "./HomeMenu";
import { ChainSelector } from "features/web3/components/ChainSelector";

export const AppBar: FC<{
  menu: ReactNode;
  title?: ReactNode;
}> = ({ menu, title }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null);

  const onMenuClose = useCallback(() => {
    setMenuAnchorEl(null);
  }, []);
  const handleMenu = useCallback((event: MouseEvent) => {
    setMenuAnchorEl(event.currentTarget);
  }, []);
  return (
    <>
      <MuiAppBar color="default">
        <Toolbar>
          <MenuIcon onClick={handleMenu} />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 4 }}>
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} component="span" />
          <ChainSelector />
          <Connect />
        </Toolbar>
      </MuiAppBar>
      <HomeMenu anchorEl={menuAnchorEl} handleClose={onMenuClose}>
        {menu}
      </HomeMenu>
    </>
  );
};
