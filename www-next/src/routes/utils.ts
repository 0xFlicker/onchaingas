export function asNetwork(network: string) {
  if (["mainnet", "sepolia"].includes(network)) {
    return network;
  }
  return null;
}
