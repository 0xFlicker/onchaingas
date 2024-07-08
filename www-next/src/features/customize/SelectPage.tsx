import React, { FC, useMemo } from "react";

import { TokenSelect } from "./components/TokenSelect";

export const SelectPage: FC<{
  prefix?: string;
}> = ({ prefix = "" }) => {
  return <TokenSelect prefix={prefix} />;
};
