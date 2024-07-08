import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export function useUpdateMetadata() {
  const { chain } = useAccount();
  console.log(chain?.name?.toLowerCase());

  return useMutation({
    mutationFn: async ({
      tokenId,
      name,
      description,
    }: {
      tokenId: number;
      name: string;
      description: string;
    }) => {
      const response = await fetch(
        `/api/${chain?.name?.toLowerCase()}/metadata`,
        {
          method: "POST",
          body: JSON.stringify({ tokenId, name, description }),
        },
      );
      const r = await response.json();
      return r as {
        tokenUri: string;
        signature: `0x${string}`;
      };
    },
  });
}
