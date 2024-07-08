import { forwardRef } from "react";
import Button from "@mui/material/Button";
import NextLink from "next/link";
import MuiLink, { LinkProps } from "@mui/material/Link";

export const WrappedLink = forwardRef((props: LinkProps, ref: any) => {
  const { href } = props;
  return <MuiLink ref={ref} href={href!} {...props} component={NextLink} />;
});
WrappedLink.displayName = "WrappedLink";
