import { FC, ReactNode } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const QA: FC<{ question: ReactNode; answer: ReactNode }> = ({
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

export const FAQ: FC = () => {
  return (
    <>
      <Card
        sx={{
          mb: 6,
        }}
      >
        <QA
          question="What is the Fame Lady Society?"
          answer={
            <>
              <Typography>
                The Fame Lady Society (FLSoc) is a community of NFT collectors
                and creators who share a deep passion for the Fame Lady Squad
                (FLS) NFTs. FLS is an HERstoric NFT project established July 12,
                2021 as the first all female generative PFP project consisting
                of 8,888 tokens.
              </Typography>
              <Typography mt={2}>
                The project was originally founded by Russian men pretending to
                be women and the smart contract was transferred to an elected
                steward on August 11, 2021, to hold until a multi-signature
                wallet was established on behalf of the community as a whole.
              </Typography>
              <Typography mt={2}>
                Unfortunately, the community currently has no access to the
                smart contract that created the FLS NFT tokens. The Fame Lady
                Society was established on November 2022 to join members
                together and reclaim access to the original smart contract, and
                return to our standing as a community-owned and managed NFT
                project
              </Typography>
            </>
          }
        />
        <QA
          question="What is wrapping?"
          answer={
            <>
              <Typography>
                Wrapping is a process of exchanging one token for another. In
                this case, you are exchanging one Fame Lady Squad NFT for a Fame
                Lady Society NFT.
              </Typography>
              <Typography mt={2}>
                While wrapping, you will have the option to send the new Fame
                Lady Society NFT to a different address than the address than
                currently holds the Fame Lady Squad token. This way you can save
                gas and transfer the wrapped token to a different address, for
                example a ledger wallet.
              </Typography>
            </>
          }
        />
        <QA
          question="What happens to my NFT when I wrap it?"
          answer="Upon wrapping your Fame Lady Squad NFT, it's deposited into the Fame Lady Society smart contract and you receive an equivalent Fame Lady Society NFT. The original NFT is owned by the contract and becomes immovable. You can then engage in the Fame Lady Society community using your new NFT."
        />
        <QA
          question="Can I unwrap my Fame Lady Society NFT?"
          answer="Yes, you can unwrap your Fame Lady Society NFT at any time. When you unwrap your Fame Lady Society NFT, you will relinquish ownership of the Fame Lady Society NFT and receive the original Fame Lady Squad NFT in return. The Fame Lady Squad NFT is a 1:1 representation of your Fame Lady Society NFT."
        />
        <QA
          question="Why should I wrap my Fame Lady Squad NFT?"
          answer="By wrapping your Fame Lady Squad NFT, you can remain engaged with the Fame Lady Society community. Since the Fame Lady Squad community and its smart contract are now inactive and inaccessible, this wrapping process is essential for continued participation. Additionally, the modern and efficient Fame Lady Society smart contract ensures royalty enforcement and facilitates gas-efficient transfers, in contrast to the former Fame Lady Squad contract."
        />
        <QA
          question="What if I want to transfer my Fame Lady Society NFT to another address after I wrap it?"
          answer="While wrapping, you will have the option to send the new Fame Lady Society NFT to a different address than the address that currently holds the Fame Lady Squad token. This was you can save gas and transfer the wrapped token to a different address, for example a ledger wallet."
        />
        <QA
          question="What will the governance structure of the Fame Lady Society be?"
          answer={
            <>
              <Typography>
                The Fame Lady Society will be governed by Fame Lady Society NFT
                holders, who will have the power to vote on proposals aimed at
                concerning the operational affairs of the Fame Lady Society.
              </Typography>
              <Typography mt={2}>
                The Fame Lady Society shall be guided by an elected Community
                Council voted in by verified holders. The FLSoc Council is
                responsible for planning the overall direction, vision, and
                long-term strategy.
              </Typography>
            </>
          }
        />
      </Card>
    </>
  );
};

export default FAQ;
