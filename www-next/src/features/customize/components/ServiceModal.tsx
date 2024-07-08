import { FC, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import UploadIcon from "@mui/icons-material/Upload";

export const ServiceModal: FC<{
  open: boolean;
  onClose?: () => void;
  message: string;
}> = ({ open, onClose, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Card
        sx={{
          px: {
            xs: 2,
            sm: 4,
            md: 6,
          },
          py: {
            xs: 2,
            sm: 4,
            md: 6,
          },
        }}
      >
        <CardHeader avatar={<UploadIcon />} title={message} />
        <CardContent>
          <Box
            component="div"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            my={2}
          >
            <CircularProgress size={64} />
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  );
};
