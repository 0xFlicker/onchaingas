import { FC, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { formatUnits, isAddress } from "viem";
import { useAllocation } from "../hooks/useAllocation";
import { useEnsAddress } from "wagmi";
import { OG_AGE_BOOST, OG_RANK_BOOST } from "../hooks/constants";

function formatUnit(amount: bigint) {
  return Math.floor(Number(formatUnits(amount, 18)));
}

export const AdjustableChecker: FC<{}> = ({}) => {
  const [address, setAddress] = useState("");
  const [rankBoost, setRankBoost] = useState(OG_RANK_BOOST);
  const [ageBoost, setAgeBoost] = useState(OG_AGE_BOOST);
  const { data: ensAddress } = useEnsAddress({
    name: address,
  });

  const addressToUse = ensAddress || address;

  const { fls, hunnys, mermaids, metavixens, squad, total } = useAllocation({
    address: isAddress(addressToUse) ? addressToUse : undefined,
    rankBoost,
    ageBoost,
  });

  return (
    <Card>
      <CardHeader title="Adjustable Checker" />
      <CardContent>
        <Typography variant="body1" marginY={2}>
          Token Claim Simulator
        </Typography>
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
        />
        <Typography variant="body1" marginY={2}>
          Rank Boost
        </Typography>
        <Box
          component="div"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop={2}
        >
          <TextField
            value={rankBoost}
            onChange={(e) => setRankBoost(parseFloat(e.target.value))}
            inputProps={{
              step: 0.1,
              min: 1,
              max: 10,
              type: "number",
            }}
            sx={{
              marginRight: 2,
            }}
          />

          <Slider
            value={rankBoost}
            onChange={(_, newValue) => setRankBoost(newValue as number)}
            min={1}
            max={10}
            step={0.1}
          />
        </Box>

        <Typography variant="body1" marginY={2}>
          Age Boost
        </Typography>
        <Box
          component="div"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginY={2}
        >
          <TextField
            value={ageBoost}
            onChange={(e) => setAgeBoost(parseFloat(e.target.value))}
            inputProps={{
              step: 0.1,
              min: 1,
              max: 10,
              type: "number",
            }}
            sx={{
              marginRight: 2,
            }}
          />
          <Slider
            value={ageBoost}
            onChange={(_, newValue) => setAgeBoost(newValue as number)}
            min={1}
            max={10}
            step={0.1}
          />
        </Box>

        <Typography variant="body1">Address: {ensAddress}</Typography>
        <Typography variant="body1">Rank Boost: {rankBoost}</Typography>
        <Typography variant="body1">Age Boost: {ageBoost}</Typography>
        <Typography variant="body1">
          Society: {formatUnit(fls).toLocaleString()}
        </Typography>
        <Typography variant="body1">
          Squad: {formatUnit(squad).toLocaleString()}
        </Typography>
        <Typography variant="body1">
          Hunnys: {formatUnit(hunnys).toLocaleString()}
        </Typography>
        <Typography variant="body1">
          Mermaids: {formatUnit(mermaids).toLocaleString()}
        </Typography>
        <Typography variant="body1">
          Metavixens: {formatUnit(metavixens).toLocaleString()}
        </Typography>
        <Typography variant="body1">
          Total: {formatUnit(total).toLocaleString()}
        </Typography>
        <Typography variant="body1">
          Total $FAME NFTs: {Math.floor(formatUnit(total) / 1_000_000)}
        </Typography>
      </CardContent>
    </Card>
  );
};
