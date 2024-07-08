export type Transaction<T = unknown> = {
  kind:
    | "mint testnet token"
    | "wrap to"
    | "wrap"
    | "unwrap"
    | "approve collection to be wrapped"
    | "set wrap cost"
    | "update metadata";
  hash: `0x${string}`;
  context?: T;
};
