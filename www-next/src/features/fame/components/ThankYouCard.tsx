import React, { FC } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const ThankYouCard: FC<{}> = () => {
  return (
    <CardContent sx={{ my: 8 }}>
      <Typography variant="h3" sx={{ my: 2 }} width="100%" textAlign="center">
        🎉🎉🎉
      </Typography>
      <Typography variant="body1" width="100%" textAlign="center">
        Thank you for your support! We appreciate your contribution and are
        excited to have you as part of our community.
      </Typography>
    </CardContent>
  );
};
