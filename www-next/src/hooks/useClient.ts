import { useLayoutEffect, useState } from "react";

export default function useClient() {
  const [isClient, setIsClient] = useState(false);

  if (typeof window === "undefined") {
    return false;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
