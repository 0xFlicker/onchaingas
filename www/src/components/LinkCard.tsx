import { FC, ReactNode } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia, { CardMediaProps } from "@mui/material/CardMedia";
import { WrappedLink } from "./WrappedLink";

export const LinkCard: FC<{
  to: string;
  content: ReactNode;
  headerTitle: ReactNode;
  CardMediaProps?: CardMediaProps<any>;
}> = ({ to, content, headerTitle, CardMediaProps }) => {
  return (
    <Card variant="elevation" sx={{ width: 640 }}>
      <CardActionArea LinkComponent={WrappedLink} href={to}>
        <CardHeader title={headerTitle} />
        {CardMediaProps && <CardMedia {...CardMediaProps} />}
        <CardContent>{content}</CardContent>
      </CardActionArea>
    </Card>
  );
};
