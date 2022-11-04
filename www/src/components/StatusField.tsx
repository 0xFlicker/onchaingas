import { FC, PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const StatusField: FC<
  PropsWithChildren<{
    currentlyLoading: boolean;
    checked: boolean;
  }>
> = ({ currentlyLoading, checked, children }) => {
  const leftHandContent = (() => {
    if (currentlyLoading) {
      return <CircularProgress size={24} />;
    }
    if (!checked) {
      return <CancelIcon />;
    }
    return <CheckCircleIcon />;
  })();
  return (
    <Box display="flex" flexDirection="row">
      {leftHandContent}
      {typeof children === "string" ? (
        <Typography marginLeft={1}>{children}</Typography>
      ) : (
        children
      )}
    </Box>
  );
};
