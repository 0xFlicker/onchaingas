import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import MonetizationOn from "@mui/icons-material/MonetizationOn";
import MuiInput from "@mui/material/Input";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Link } from "@mui/material";
import { formatEther, parseEther } from "viem";

const Input = styled(MuiInput)`
  width: 64px;
`;

export type TipCloseReason = "cancel" | "confirm";

const TipSlider: FC<{
  value: number;
  onChange: (value: number) => void;
}> = ({ value, onChange }) => {
  const handleSliderChange = (event: Event, newValue: number) => {
    onChange(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      onChange(Number(event.target.value));
    }
  };

  const handleBlur = () => {
    if (value < 0) {
      onChange(0);
    }
  };

  return (
    <Box component="div" sx={{ width: "100%" }}>
      <Typography id="input-slider" gutterBottom color="text.primary">
        per token tip
      </Typography>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={0.025}
            min={0}
            step={0.0005}
          />
        </Grid2>
        <Grid2>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 0.0001,
              min: 0,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export const DevTipModal: FC<{
  wrapCost: bigint;
  numberOfTokens: number;
  open: boolean;
  handleClose: (reason: TipCloseReason, tip?: bigint) => void;
}> = ({ wrapCost, open, handleClose, numberOfTokens }) => {
  const [tip, setTip] = useState<bigint | undefined>();
  const [tipPerToken, setTipPerToken] = useState(0);
  useEffect(() => {
    setTip(parseEther((tipPerToken * numberOfTokens).toString()));
  }, [numberOfTokens, tipPerToken]);
  const tipString = useMemo(
    () =>
      formatEther(tip || 0n)
        .slice(0, 6)
        .replace(/0+$/, ""),
    [tip],
  );
  const totalValueStr = useMemo(
    () =>
      wrapCost
        ? formatEther(wrapCost * BigInt(numberOfTokens) + (tip || 0n))
            .slice(0, 6)
            .replace(/0+$/, "")
        : "",
    [wrapCost, numberOfTokens, tip],
  );
  return (
    <Modal
      open={open}
      onClose={() => handleClose("cancel")}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Container
        maxWidth="sm"
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card
          variant="elevation"
          sx={{
            p: 2,
          }}
        >
          <CardHeader
            title={
              <>
                <Box
                  component="span"
                  display="flex"
                  justifyContent="center"
                  sx={{
                    mt: 2,
                  }}
                >
                  <MonetizationOn />
                </Box>
                <Typography
                  sx={{ mt: 2, mb: 2 }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  textAlign="center"
                >
                  dev tip
                </Typography>
              </>
            }
          />
          <CardContent>
            <Typography
              id="modal-modal-description"
              sx={{ mb: 2 }}
              color="text.secondary"
            >
              this website, the code, the wrapping smart contract, and all costs
              related to the deployment of the Fame Lady Society are paid for by{" "}
              <Link
                href="https://twitter.com/@0xflick"
                target="_blank"
                rel="noopener noreferrer"
              >
                0xflick
              </Link>{" "}
              and have been provided completely free and made open source for
              the community
              <br />
              <br />a donation is completely optional and is not required to
              wrap your tokens
              {wrapCost > 0n && (
                <>
                  <br />
                  <br />
                  With wrap cost of {formatEther(wrapCost)} ETH per token, the
                  total cost of wrapping (before gas fees) will be{" "}
                  {totalValueStr} ETH
                </>
              )}
            </Typography>
            <TipSlider onChange={setTipPerToken} value={tipPerToken} />
          </CardContent>
          <CardActions>
            <Button
              onClick={() => handleClose("confirm", tip)}
              variant="contained"
              color="success"
              fullWidth
            >
              {`Confirm ${totalValueStr !== "" ? `${totalValueStr} ${tipString !== "" ? `E (${tipString} tip)` : ""}` : tipString !== "" ? `${tipString} E` : ""}`}
            </Button>
          </CardActions>
          <CardActions>
            <Button
              onClick={() => handleClose("cancel")}
              variant="outlined"
              color="error"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleClose("confirm", 0n)}
              variant="contained"
              color="success"
            >
              No Tip
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Modal>
  );
};
