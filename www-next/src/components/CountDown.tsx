import { FC, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ReactCountDown from "react-countdown";
import { useRouter } from "next/router";

const END_DATE = new Date("2023-04-27T17:20:00.000Z");
const SIZED_COUNTER = {
  typography: {
    sm: "h2",
    lg: "h1",
  },
};
const SIZED_TEXT = {
  typography: {
    sm: "h5",
    lg: "h4",
  },
};

const CELL_SIZE = {
  xs: 12,
  sm: 6,
  md: 3,
};
export const CountDown: FC<{
  onEnd?: () => void;
}> = ({ onEnd }) => {
  const [start, setStart] = useState(false);
  useEffect(() => {
    setStart(true);
  }, []);

  return start ? (
    <ReactCountDown
      date={END_DATE}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          onEnd?.();
        }
        return (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item {...CELL_SIZE}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={SIZED_COUNTER}
                  component="span"
                  color="text.primary"
                >
                  {days}
                </Typography>
                <Typography
                  sx={SIZED_TEXT}
                  component="span"
                  marginLeft={3}
                  color="text.primary"
                  noWrap
                >
                  Days
                </Typography>
              </Box>
            </Grid>
            <Grid item {...CELL_SIZE}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={SIZED_COUNTER}
                  component="span"
                  color="text.primary"
                >
                  {hours}
                </Typography>
                <Typography
                  sx={SIZED_TEXT}
                  component="span"
                  marginLeft={3}
                  color="text.primary"
                  noWrap
                >
                  Hours
                </Typography>
              </Box>
            </Grid>
            <Grid item {...CELL_SIZE}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={SIZED_COUNTER}
                  component="span"
                  color="text.primary"
                >
                  {minutes.toString().padStart(2, "0")}
                </Typography>
                <Typography
                  sx={SIZED_TEXT}
                  component="span"
                  marginLeft={3}
                  color="text.primary"
                  noWrap
                >
                  Minutes
                </Typography>
              </Box>
            </Grid>
            <Grid item {...CELL_SIZE}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={SIZED_COUNTER}
                  component="span"
                  color="text.primary"
                >
                  {seconds.toString().padStart(2, "0")}
                </Typography>
                <Typography
                  sx={SIZED_TEXT}
                  component="span"
                  marginLeft={3}
                  color="text.primary"
                  noWrap
                >
                  Seconds
                </Typography>
              </Box>
            </Grid>
          </Grid>
        );
      }}
    />
  ) : null;
};
