import {
  FC,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ChangeEvent,
} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import exampleRender from "example/gas";
import { Box, Typography } from "@mui/material";

export const ExampleCard: FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [lastSetValue, setLastSetValue] = useState(10);
  const { setLiveUpdate, setGas, setElement, cleanup } = useMemo(
    () => (exampleRender as any)(),
    []
  );
  const onSliderUpdate = useCallback(
    (e: unknown, value: any) => {
      setLastSetValue(value);
      setGas(value);
    },
    [setGas]
  );
  const onCheckChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setIsLive(checked);
      setLiveUpdate(checked);
      if (!checked) {
        setGas(lastSetValue);
      }
    },
    [lastSetValue, setGas, setLiveUpdate]
  );
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" flexDirection="column">
            <Box sx={{ width: 350, height: 350 }} ref={setElement} />
          </Box>
          <FormGroup sx={{ mt: 2 }}>
            <FormControlLabel
              control={<Checkbox onChange={onCheckChange} />}
              label="Live update"
            />
          </FormGroup>
          <Slider
            defaultValue={10}
            aria-label="Gas"
            onChange={onSliderUpdate}
            min={0}
            max={500}
            step={1}
            disabled={isLive}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Enable <b>live updates</b> to get a realtime view of gas price
          </Typography>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Otherwise see what different gas prices look like
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
