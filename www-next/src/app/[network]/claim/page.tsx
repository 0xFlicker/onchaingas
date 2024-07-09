import Claim from "@/routes/Claim";
import { redirect } from "next/navigation";
import { base, sepolia } from "viem/chains";

interface Params {
  network: string;
}

export default function Page({ params }: { params: Params }) {
  const validNetwork = ["base", "sepolia"].includes(params.network);
  if (!validNetwork) {
    return redirect("/fame");
  }
  if (params.network === "base") {
    return <Claim chainId={base.id} />;
  }
  return <Claim chainId={sepolia.id} />;
}
