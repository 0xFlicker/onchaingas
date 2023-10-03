import {
  FC,
  MouseEventHandler,
  MouseEvent,
  useCallback,
  useState,
  ReactNode,
} from "react";
import { AppBar as MuiAppBar, Toolbar, Box, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Connect } from "features/web3";
import { HomeMenu } from "./HomeMenu";
import { ChainSelector } from "features/web3/components/ChainSelector";

export const AppBar: FC<{
  menu: ReactNode;
  title?: ReactNode;
  right?: ReactNode;
}> = ({ menu, title, right }) => {
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

          <Typography variant="h1" component="div" sx={{ flexGrow: 1, ml: 4 }}>
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} component="span" />
          {right}
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
