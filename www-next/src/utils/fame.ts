import { formatEther } from "viem";

export function presaleAmountToTokens(amount: bigint, maxBuy: bigint) {
  // amount is a number in 1e18 units that we want to convert to amount / maxBuy * 0.2 * 888_000_000 and return as a number in 1e18 units
  const maxBuyFloat = Number(maxBuy) / 1e18;
  const amountFloat = Number(amount) / 1e18;
  return BigInt(
    Math.floor((amountFloat / maxBuyFloat) * 0.2 * 888_000_000) * 1e18,
  );
}

export const formatFame = (amount: bigint) =>
  `${Number(formatEther(amount).split(".")[0]).toLocaleString("en").replaceAll(",", " ")} $FAME`;
