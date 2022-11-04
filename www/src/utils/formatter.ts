export function formatAddressShort(address: string | undefined, length = 8) {
  if (!address || address.length + 2 < length) {
    return "";
  }
  return (
    address.substring(0, Math.floor(length / 2) + 2) +
    "..." +
    address.substring(address.length - Math.floor(length / 2))
  );
}
