import { FC, useCallback, useState, FormEventHandler } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useNotifications } from "@/features/notifications/Context";

export const MintCard: FC<{
  onMint(count: bigint): void;
  transactionInProgress?: boolean;
}> = ({ onMint, transactionInProgress }) => {
  const { addNotification } = useNotifications();
  // const { address: selectedAddress, chain: currentChain } = useAccount();
  const [count, setCount] = useState("");

  const countError =
    count.length && (count === "0" || !Number.isInteger(Number(count)));

  const onUpdateTokenId = useCallback((e: any) => {
    setCount(e.target.value);
  }, []);
  const onSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      onMint(BigInt(count));
    },
    [count, onMint],
  );
  const onClick = useCallback(() => {
    const bcount = BigInt(count);
    if (bcount > 25n) {
      addNotification({
        id: "mint-error",
        message: "You can only mint 25 tokens at a time",
        type: "error",
      });
      return;
    }
    onMint(bcount);
  }, [addNotification, count, onMint]);
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Mint testnet FLS
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          For testing purposes, as many tokens as you like can be minted
        </Typography>
        <FormGroup onSubmit={onSubmit}>
          <TextField
            value={count}
            onChange={onUpdateTokenId}
            margin="normal"
            fullWidth
            helperText="Mint count"
            error={!!countError}
          />
        </FormGroup>
        {!!countError && (
          <Typography sx={{ mb: 1.5 }} color="text.error">
            Invalid count
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={onClick}
          disabled={!(Number(count) > 0) || transactionInProgress}
        >
          Mint
        </Button>
      </CardActions>
    </Card>
  );
};
