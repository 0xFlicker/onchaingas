import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { FameFAQ } from "./FameFAQ";
import { PresaleFAQ } from "./PresaleFAQ";

export const InfoCard: FC<{}> = () => {
  return (
    <Card>
      <CardHeader title="Important info" />
      <CardContent sx={{ my: 1 }}>
        <FameFAQ />
        <PresaleFAQ />
      </CardContent>
    </Card>
  );
};
