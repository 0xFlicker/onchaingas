import FameClaim from "@/routes/FameClaim";
import Whoops from "@/routes/Whoops";
import { isAddress } from "viem";
import { base, sepolia } from "viem/chains";

interface Params {
  network: string;
  address: string;
}

export default function Page({ params }: { params: Params }) {
  if (!isAddress(params.address)) {
    return (
      <Whoops
        errorMessage={`${params.address} is not a valid address`}
        goBack="/fame"
        goBackTitle="Click to go back to FAME"
      />
    );
  }
  if (params.network === "base") {
    return <FameClaim address={params.address} chainId={base.id} />;
  }
  if (params.network === "sepolia") {
    return <FameClaim address={params.address} chainId={sepolia.id} />;
  }
  return (
    <Whoops
      errorMessage={`Unknown network ${params.network}`}
      goBack="/fame"
      goBackTitle="Click to go back to FAME"
    />
  );
}
