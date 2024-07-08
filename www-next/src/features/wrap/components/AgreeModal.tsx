import { FC } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import WarningIcon from "@mui/icons-material/Warning";
import { WrappedLink } from "@/components/WrappedLink";

export const AgreeModal: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <Modal open={open} disableEscapeKeyDown>
      <Card
        sx={{
          width: {
            xs: "100%",
            sm: "auto",
          },
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
        <CardHeader avatar={<WarningIcon />} title="agreement" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Wrapping the Fame Lady Squad token is up to each holders discretion
            and each holder assumes their own risk
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Please see the{" "}
            <WrappedLink href="/faq" target="_blank">
              FAQ
            </WrappedLink>{" "}
            for more details
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", mt: 4 }}>
          <Button variant="contained" onClick={onClose}>
            I understand
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};
