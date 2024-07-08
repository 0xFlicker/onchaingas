import React, { FC } from "react";
import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

type Props = {
  value: number;
  step: number;
  min: number;
  max: number;
  formatStepLabel: (value: number) => string;
};

function greenToRedGradient(min: number, max: number, value: number) {
  const range = max - min;
  const valuePercentage = ((value - min) / range) * 100;
  const red = Math.round(255 * (valuePercentage / 100));
  const green = Math.round(255 * (1 - valuePercentage / 100));
  return `rgb(${red}, ${green}, 0)`;
}

export const ContributionGauge: FC<Props> = ({
  value,
  step,
  min,
  max,
  formatStepLabel,
}) => {
  const range = max - min;
  const steps = range / step;

  return (
    <GaugeComponent
      arc={{
        subArcs: Array.from({ length: steps + 1 }, (_, i) => ({
          limit: i * step,
          color: greenToRedGradient(min, max, i * step),
          showTick: true,
        })),
      }}
      minValue={min}
      maxValue={max}
      labels={{
        valueLabel: { formatTextValue: formatStepLabel },
        tickLabels: {
          type: "outer",
          defaultTickValueConfig: {
            formatTextValue: formatStepLabel,
            style: {
              fontSize: 10,
            },
          },
          ticks: Array.from({ length: steps + 1 }, (_, i) => ({
            value: i * step,
            style: {
              fontSize: 10,
            },
          })),
        },
      }}
      value={value}
    />
  );
};
