import React, { ChangeEventHandler, FC, useCallback, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import MuiInput, { InputProps } from "@mui/material/Input";
import FormGroup from "@mui/material/FormGroup";
import { styled } from "@mui/material/styles";
import { erc721Abi, formatUnits } from "viem";
import { formatFame } from "@/utils/fame";
import { useSnapshot } from "../hooks/useSnapshot";
import { OG_AGE_BOOST, OG_RANK_BOOST } from "../hooks/constants";
import { useReadContract } from "wagmi";
import { fameLadySocietyAddress, fameLadySquadAddress } from "@/wagmi";
import { isBannedToken } from "@/service/bannedTokenIds";

const Input = styled(MuiInput)`
  width: 100%;
`;

function formatUnit(amount: bigint) {
  return Math.floor(Number(formatUnits(amount, 18)));
}

export const SingleTokenChecker: FC<{}> = () => {
  const [inputValue, setInputValue] = useState("");
  const [tokenId, setTokenId] = useState<bigint | null>(null);
  const [blurred, setBlurred] = useState(false);
  const { flsPoolAllocation } = useSnapshot(OG_RANK_BOOST, OG_AGE_BOOST);
  const allocationAmount = flsPoolAllocation.get(Number(inputValue));

  const { data: squadOwnerOf, isSuccess } = useReadContract({
    abi: erc721Abi,
    address: fameLadySquadAddress[1],
    chainId: 1,
    functionName: "ownerOf",
    args: tokenId !== null && blurred ? [BigInt(tokenId)] : undefined,
  });

  const isSquad = isSuccess
    ? squadOwnerOf !== fameLadySocietyAddress[1]
    : undefined;

  const onInputChanged: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setBlurred(false);
      setInputValue(e.target.value);
      const t = Number(e.target.value);
      if (Number.isInteger(t)) {
        setTokenId(BigInt(t));
      } else {
        setTokenId(null);
      }
    },
    [],
  );

  const onInputBlur = useCallback(() => {
    setBlurred(true);
  }, []);

  const onKeyPress: InputProps["onKeyDown"] = useCallback((e) => {
    if (e.key === "Enter") {
      setBlurred(true);
    }
  }, []);

  const isBanned = tokenId !== null && isBannedToken(Number(tokenId));

  return (
    <Card>
      <CardHeader title="Token ID Claim Checker" />
      <CardContent>
        {isSuccess ? (
          <>
            <Typography variant="body1" color="red">
              {isBanned === true ? "This token cannot claim $FAME" : ""}
            </Typography>
            <Typography variant="body1">
              {isSquad === true && !isBanned
                ? "This token needs to be wrapped in order to claim $FAME"
                : "\u00A0"}
            </Typography>
            <Typography variant="body1">
              {formatFame(allocationAmount ?? 0n)}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body1">{"\u00A0"}</Typography>
            <Typography variant="body1">{"\u00A0"}</Typography>
          </>
        )}
        <FormGroup
          sx={{
            mt: 2,
            mb: 1,
          }}
        >
          <Typography variant="body2" component="label" htmlFor="token-input">
            Token ID
          </Typography>
          <Input
            id="token-input"
            value={inputValue}
            onChange={onInputChanged}
            onBlur={onInputBlur}
            onKeyDown={onKeyPress}
            inputProps={{
              step: 1,
              min: 0,
              max: 8887,
              type: "number",
            }}
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
};
