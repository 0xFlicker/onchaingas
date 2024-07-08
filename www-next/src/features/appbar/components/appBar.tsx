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
import { HomeMenu } from "./HomeMenu";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/theme";
import { ConnectKitButton } from "connectkit";

export const AppBar: FC<{
  menu?: ReactNode;
  title?: ReactNode;
  right?: ReactNode;
  disableConnect?: boolean;
}> = ({ disableConnect, menu, title, right }) => {
  const tinyScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
          {menu && <MenuIcon onClick={handleMenu} />}
          {title}
          <Box sx={{ flexGrow: 1 }} component="span" />
          {right}
          <Box ml={2} component="span" />
          {disableConnect ? null : (
            <ConnectKitButton showAvatar={!tinyScreen} />
          )}
        </Toolbar>
      </MuiAppBar>
      {menu && (
        <HomeMenu anchorEl={menuAnchorEl} handleClose={onMenuClose}>
          {menu}
        </HomeMenu>
      )}
    </>
  );
};
