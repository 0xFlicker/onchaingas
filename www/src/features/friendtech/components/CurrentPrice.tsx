import { FC, useMemo } from "react";
import { utils } from "ethers";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useCurrentPrice } from "../hooks/useCurrentPrice";
import { WrappedLink } from "components/WrappedLink";
import { Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

function numberToMaxThreeDecimals(number: number) {
  return Math.round(number * 1000) / 1000;
}
function numberToMaxTwoDecimals(number: number) {
  return Math.round(number * 100) / 100;
}

export const CurrentPrice: FC<{ address: `0x${string}` }> = ({ address }) => {
  const price = useCurrentPrice(address);

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const priceFormatted = useMemo(() => {
    if (price) {
      const num = Number(utils.formatEther(price));
      return `${
        smallScreen
          ? numberToMaxTwoDecimals(num)
          : numberToMaxThreeDecimals(num)
      }E`;
    }
    return undefined;
  }, [price, smallScreen]);
  return (
    <WrappedLink
      href="https://www.friend.tech/rooms/0x90348e325bc286c7b7c1ec575cbb775b4b1903f0"
      underline="hover"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ mr: 1, ml: 1 }}>
          <Typography variant="h6">
            {smallScreen ? "ft:" : "friend tech:"}
          </Typography>
        </Box>

        <Box sx={{ mr: 1 }}>
          {priceFormatted ? (
            <Typography variant="h6">{priceFormatted}</Typography>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
    </WrappedLink>
  );
};
