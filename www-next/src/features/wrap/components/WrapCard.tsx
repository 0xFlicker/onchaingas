import { FC, useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid2 from "@mui/material/Unstable_Grid2";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import { DevTipModal, TipCloseReason } from "./DevTipModal";
import { useEnsAddress } from "wagmi";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { isAddress } from "viem";

export const WrapCard: FC<{
  isApprovedForAll?: boolean;
  tokenIds: readonly bigint[];
  transactionInProgress?: boolean;
  onWrapTo: (o: { args: [`0x${string}`, bigint[]]; value: bigint }) => void;
  onWrap: (o: { args: [bigint[]]; value: bigint }) => void;
  wrapCost?: bigint;
  onApprove: () => void;
  nonce: number;
}> = ({
  isApprovedForAll,
  tokenIds,
  transactionInProgress,
  onWrapTo,
  onWrap,
  wrapCost = 0n,
  onApprove,
  nonce,
}) => {
  const [selectedTokenIds, setTokenIds] = useState<bigint[]>([]);
  const [transferTo, setTransferTo] = useState(false);

  const [sendToInput, setSendToInput] = useState<string>("");
  const [isTipRequested, setIsTipRequested] = useState(false);
  const [tipState, setTipState] = useState<{
    reason?: TipCloseReason;
    value?: bigint;
    wrapTo?: boolean;
  }>({});
  const { data: sendTo, isLoading: ensAddressIsLoading } = useEnsAddress({
    name: sendToInput,
  });

  useEffect(() => {
    if (nonce) {
      setTipState({});
    }
  }, [nonce]);

  const onRequestWrapTip = useCallback(() => {
    setIsTipRequested(true);
  }, []);
  const onHandleTipClose = useCallback(
    async (reason: TipCloseReason, tip?: bigint) => {
      setIsTipRequested(false);
      if (reason === "confirm") {
        setTipState({
          reason,
          value: tip,
          wrapTo: transferTo && isAddress(sendTo || sendToInput),
        });
      }
    },
    [sendTo, sendToInput, transferTo],
  );

  useEffect(() => {
    if (tipState.reason === "confirm") {
      if (tipState.wrapTo && isAddress(sendTo || sendToInput)) {
        onWrapTo({
          args: [
            (sendTo || sendToInput) as `0x${string}`,
            selectedTokenIds
              .filter((tokenId) => tokenId !== null)
              .map((n) => BigInt(n)),
          ],
          value:
            wrapCost * BigInt(selectedTokenIds.length) + (tipState.value || 0n),
        });
      } else {
        onWrap({
          args: [
            selectedTokenIds
              .filter((tokenId) => tokenId !== null)
              .map((n) => BigInt(n)),
          ],
          value:
            wrapCost * BigInt(selectedTokenIds.length) + (tipState.value || 0n),
        });
      }
    }
  }, [
    tipState,
    transferTo,
    sendTo,
    selectedTokenIds,
    onWrapTo,
    onWrap,
    wrapCost,
    sendToInput,
  ]);

  const resolvedAddress = sendTo || sendToInput;
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            wrap
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            select your tokens to wrap
          </Typography>
          <FormGroup>
            <FormControlLabel
              onClick={(event) => {
                event.preventDefault();
                setTransferTo(!transferTo);
              }}
              control={<Switch checked={transferTo} />}
              label={"wrap and transfer"}
            />
            <TextField
              sx={{
                my: 1,
              }}
              label="send wrapped tokens to"
              variant="outlined"
              disabled={!transferTo}
              onChange={(e) => {
                setSendToInput(e.target.value);
              }}
              InputProps={{
                endAdornment: ensAddressIsLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : sendTo ? (
                  <CheckCircle color="success" />
                ) : null,
              }}
            />
          </FormGroup>
          <Grid2 container spacing={1}>
            {tokenIds.map((tokenId) => (
              <Grid2 xs={12} sm={6} md={4} lg={3} key={tokenId}>
                <Card>
                  <CardActionArea
                    onClick={() => {
                      if (selectedTokenIds.includes(tokenId)) {
                        setTokenIds(
                          selectedTokenIds.filter((id) => id !== tokenId),
                        );
                      } else {
                        setTokenIds([...selectedTokenIds, tokenId]);
                      }
                    }}
                    sx={{
                      ...(selectedTokenIds.includes(tokenId) && {
                        borderColor: "primary.main",
                        borderStyle: "solid",
                        borderWidth: 5,
                      }),
                    }}
                  >
                    <CardHeader title={`FLS ${Number(tokenId)}`} />
                    <CardMedia
                      component="img"
                      image={`https://fls-prod-imagestoragef1b24905-1ftqhtk2cy7nl.s3.amazonaws.com/thumb/${tokenId}.png`}
                      sx={{
                        objectFit: "contain",
                        width: "100%",
                        transition: "transform 0.5s ease-in-out",
                      }}
                    />
                  </CardActionArea>
                </Card>
              </Grid2>
            ))}
          </Grid2>

          <Box component="div" sx={{ height: 32 }}>
            {!transactionInProgress && isApprovedForAll === false && (
              <Typography variant="body2" color="text.warning">
                you must approve the contract to wrap your tokens
              </Typography>
            )}
            {!transactionInProgress && isApprovedForAll === true && (
              <>
                {(() => {
                  if (tokenIds.length > 0) {
                    switch (selectedTokenIds.length) {
                      case 0:
                        return (
                          <Typography variant="body2" color="error">
                            select one or more tokens to wrap
                          </Typography>
                        );
                      case 1:
                        return (
                          <Typography variant="body2" color="text.secondary">
                            1 token selected
                          </Typography>
                        );
                      default:
                        return (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >{`${selectedTokenIds.length} tokens selected`}</Typography>
                        );
                    }
                  }
                })()}

                {(() => {
                  if (
                    selectedTokenIds.length &&
                    transferTo &&
                    resolvedAddress &&
                    isAddress(resolvedAddress)
                  ) {
                    return (
                      <Typography variant="body2" color="text.secondary">
                        {`send wrapped tokens to ${resolvedAddress}`}
                      </Typography>
                    );
                  } else if (
                    transferTo &&
                    !(resolvedAddress && isAddress(resolvedAddress))
                  ) {
                    return (
                      <Typography variant="body2" color="error">
                        invalid address
                      </Typography>
                    );
                  } else if (selectedTokenIds.length) {
                    return (
                      <Typography variant="body2" color="text.secondary">
                        wrapped tokens will be sent back to your wallet
                      </Typography>
                    );
                  } else {
                    return null;
                  }
                })()}
              </>
            )}
          </Box>
        </CardContent>
        <CardActions>
          {isApprovedForAll === false && (
            <Button onClick={onApprove}>Approve</Button>
          )}
          <Button
            onClick={onRequestWrapTip}
            disabled={
              transactionInProgress ||
              !isApprovedForAll ||
              selectedTokenIds.length === 0 ||
              (transferTo && !(resolvedAddress && isAddress(resolvedAddress)))
            }
          >
            Wrap
          </Button>
        </CardActions>
      </Card>
      <DevTipModal
        handleClose={onHandleTipClose}
        open={isTipRequested}
        numberOfTokens={selectedTokenIds.length}
        wrapCost={wrapCost}
      />
    </>
  );
};
