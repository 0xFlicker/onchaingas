import { CSSProperties, FC, ReactNode } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia, { CardMediaProps } from "@mui/material/CardMedia";
import { WrappedLink } from "components/WrappedLink";

export const LinkCard: FC<{
  to: string;
  content: ReactNode;
  headerTitle: ReactNode;
  CardMediaProps?: CardMediaProps<any>;
  style?: CSSProperties;
}> = ({ to, content, headerTitle, CardMediaProps, style }) => {
  return (
    <Card variant="outlined" sx={{ width: "100%" }} style={style}>
      <CardActionArea LinkComponent={WrappedLink} href={to}>
        <CardHeader title={headerTitle} />
        {CardMediaProps && <CardMedia {...CardMediaProps} />}
        <CardContent>{content}</CardContent>
      </CardActionArea>
    </Card>
  );
};
