import NextLink from "next/link";
import { Link as MUILink, LinkProps } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const FlickLink: FC<PropsWithChildren<LinkProps>> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href} passHref>
      <MUILink {...props}>{children}</MUILink>
    </NextLink>
  );
};
