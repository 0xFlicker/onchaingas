import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Card from "@mui/material/Card";
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
import { useAccount, useEnsAddress } from "wagmi";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { isAddress } from "viem";

export const UnwrapCard: FC<{
  transactionInProgress?: boolean;
  onUnwrapMany: (args: [string, bigint[]]) => void;
}> = ({ transactionInProgress, onUnwrapMany }) => {
  const { address } = useAccount();
  const [selectedTokenIds, setTokenIds] = useState<bigint[]>([]);
  const [transferTo, setTransferTo] = useState(false);
  const [tokenIdInputError, setTokenIdInputError] = useState("");

  const [sendToInput, setSendToInput] = useState<string>();

  const { data: sendTo, isLoading: ensAddressIsLoading } = useEnsAddress({
    name: sendToInput,
  });

  const onRequestWrapTip = useCallback(() => {
    onUnwrapMany([sendTo || sendToInput || address!, selectedTokenIds]);
  }, [address, onUnwrapMany, selectedTokenIds, sendTo, sendToInput]);
  const onTokenIdsUpdates = useCallback(
    (e: string) => {
      try {
        const tokenIds = e
          .split(",")
          .map((s) => s.trim())
          .map((s) => BigInt(s));
        setTokenIds(tokenIds);
        setTokenIdInputError("");
      } catch (e) {
        setTokenIdInputError("invalid token ids");
      }
    },
    [setTokenIds],
  );

  const resolvedAddress = sendTo || sendToInput;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          unwrap
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          select your tokens to unwrap
        </Typography>
        <FormGroup>
          <FormControlLabel
            onClick={(event) => {
              event.preventDefault();
              setTransferTo(!transferTo);
            }}
            control={<Switch checked={transferTo} />}
            label={"unwrap and transfer"}
          />
          <TextField
            sx={{
              my: 1,
            }}
            label="send unwrapped tokens to"
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
          <TextField
            sx={{
              my: 1,
            }}
            label="token ids to unwrap"
            variant="outlined"
            placeholder="e.g. 1,2,3"
            onChange={(e) => {
              onTokenIdsUpdates(e.target.value);
            }}
          />
        </FormGroup>

        <Box component="div" sx={{ height: 32 }}>
          {!transactionInProgress && (
            <>
              {tokenIdInputError && (
                <Typography variant="body2" color="error">
                  {tokenIdInputError}
                </Typography>
              )}
              {(() => {
                if (sendTo || isAddress(sendToInput ?? "")) {
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
                      {`send unwrapped tokens to ${resolvedAddress}`}
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
                      unwrapped tokens will be sent back to your wallet
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
        <Button
          onClick={onRequestWrapTip}
          disabled={
            transactionInProgress ||
            selectedTokenIds.length === 0 ||
            (transferTo && !(resolvedAddress && isAddress(resolvedAddress)))
          }
        >
          unwrap
        </Button>
      </CardActions>
    </Card>
  );
};
