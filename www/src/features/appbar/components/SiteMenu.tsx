import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { DarkModeSwitch } from "features/appbar/components/DarkModeSwitch";
import { FC } from "react";
import { useSavedTheme } from "features/appbar/hooks";

export const SiteMenu: FC<{
  // Yeah need to do a real sitemap and route stuff...
  isDemo?: boolean;
  isFaq?: boolean;
  isLinks?: boolean;
  isSignup?: boolean;
}> = ({ isDemo = false, isFaq = false, isLinks = false, isSignup = false }) => {
  const { handleChange: handleThemeChange, isDarkMode } = useSavedTheme();
  return (
    <>
      <MenuItem onClick={handleThemeChange}>
        <DarkModeSwitch isDarkMode={isDarkMode} />
        <ListItemText
          primary={
            <Typography textAlign="right" flexGrow={1}>
              Theme
            </Typography>
          }
        />
      </MenuItem>
    </>
  );
};
