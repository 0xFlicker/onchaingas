import {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import CopyIcon from "@mui/icons-material/ContentCopy";
import { WrappedLink } from "components/WrappedLink";
import Input from "@mui/material/Input";
import { useContractRead } from "wagmi";
import { nftOnChainCheckContractAddress } from "utils/config";
import check from "example/check";
import checkAbi from "../check.abi.json";

export const CheckClaimCard: FC = () => {
  const [empty, setEmpty] = useState(true);
  const [tokenId, setTokenId] = useState(0);
  const handleTokenIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setTokenId(parseInt(event.target.value));
      if (event.target.value === "") {
        setEmpty(true);
      } else {
        setEmpty(false);
      }
    } catch (e) {
      setEmpty(true);
    }
  };
  const {
    data: claimed,
    error: claimedError,
    isLoading: claimedLoading,
    isSuccess: claimedSuccess,
  } = useContractRead({
    addressOrName: nftOnChainCheckContractAddress.get(),
    contractInterface: checkAbi,
    functionName: "claimed",
    args: [tokenId],
    cacheTime: 0,
  });
  return (
    <>
      <Card>
        <CardHeader title="Check on an On Chain Gas claim" />
        <CardContent sx={{ ml: 2 }}>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Check if an On Chain Gas claim is valid by entering the token ID.
            Please note that tokens can be claimed at any time so exercise care
            when purchasing an unclaimed token on OpenSea
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Token ID" />
        <CardContent sx={{ ml: 2 }}>
          <Input onChange={handleTokenIdChange} />
        </CardContent>
      </Card>
      <Card>
        <CardContent sx={{ ml: 2 }}>
          <Typography variant="body2" color="text.primary" gutterBottom>
            {claimedLoading && !empty ? "Loading..." : ""}
            {claimedError && !empty ? "Error" : ""}
            {claimedSuccess && !empty && (claimed ? "Claimed" : "Not claimed")}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
