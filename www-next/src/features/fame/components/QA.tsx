import { FC, ReactNode } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

export const QA: FC<{ question: ReactNode; answer: ReactNode }> = ({
  question,
  answer,
}) => (
  <Accordion>
    <AccordionSummary>
      <Typography variant="h6">{question}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      {typeof answer === "string" ? <Typography>{answer}</Typography> : answer}
    </AccordionDetails>
  </Accordion>
);
