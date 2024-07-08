import { FC, PropsWithChildren } from "react";
import { Backdrop, Box, Menu } from "@mui/material";

interface IProps {
  handleClose: () => void;
  anchorEl: Element | null;
}

export const HomeMenu: FC<PropsWithChildren<IProps>> = ({
  handleClose,
  anchorEl,
  children,
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
      <Box component="div" sx={{ width: 320 }}>
        {children}
      </Box>
    </Menu>
  );
};
