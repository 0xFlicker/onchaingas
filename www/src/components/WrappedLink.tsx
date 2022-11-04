import { forwardRef } from "react";
import NextLink from "next/link";
import MuiLink, { LinkProps } from "@mui/material/Link";

export const WrappedLink = forwardRef((props: LinkProps, ref: any) => {
  const { href } = props;
  return (
    <NextLink href={href} passHref>
      <MuiLink ref={ref} {...props} />
    </NextLink>
  );
});
WrappedLink.displayName = "WrappedLink";
