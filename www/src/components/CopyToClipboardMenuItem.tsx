import { FC, ReactNode, PropsWithChildren, useCallback } from "react";
import {
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { useState } from "react";

export const CopyToClipboardMenuItem: FC<
  PropsWithChildren<{
    text: string;
    icon?: ReactNode;
  }>
> = ({ children, text, icon }) => {
  const [open, setOpen] = useState(false);
  const handleClick = useCallback(() => {
    setOpen(true);
    if (navigator.share) {
      navigator.share({
        title: "share this",
        url: text,
      });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  }, [text]);
  return (
    <MenuItem onClick={handleClick}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={children} />
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </MenuItem>
  );
};
