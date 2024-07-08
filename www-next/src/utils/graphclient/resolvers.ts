import { Resolvers } from "@/graphclient";

const chains = ["mainnet", "sepolia"];

export const resolvers: Resolvers = {
  Query: {
    crossSubgraphs: async (root: any, args: any, context: any, info: any) => {
      console.log("crossSubgraphs", root, args, context, info);

      const results = await Promise.all(
        chains.map((source) =>
          context[source].Query.subgraphs({
            root,
            args,
            context,
            info,
          }).then((subgraphs: any) =>
            subgraphs.map((subgraph: any) => ({
              ...subgraph,
              deployedChain: source.toUpperCase(),
            })),
          ),
        ),
      ).then((allSubgraphs) => allSubgraphs.flat());

      return results;
    },
  },
};
