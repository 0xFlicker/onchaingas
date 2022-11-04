import { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";

interface IProps {
  anchorEl: Element;
  handleClose: () => void;
  handleDisconnect: () => void;
}

export const ConnectedDropDownModal: FC<IProps> = ({
  anchorEl,
  handleClose,
  handleDisconnect,
}) => {
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
          <MenuItem onClick={handleDisconnect}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography textAlign="right">Disconnect</Typography>}
            />
          </MenuItem>
        </MenuList>
      </Box>
    </Menu>
  );
};
