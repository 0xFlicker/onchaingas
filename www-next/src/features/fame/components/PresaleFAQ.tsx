import React, { FC } from "react";
import { QA } from "./QA";
import Typography from "@mui/material/Typography";
import { WrappedLink } from "@/components/WrappedLink";

export const PresaleFAQ: FC = () => {
  return (
    <>
      <QA
        question="What is being purchased in the presale?"
        answer={
          <>
            <Typography component="p" mb={2}>
              Presale participants are purchasing locked and vested $FAME tokens
              for the purpose of seeding liquidity for the $FAME token. There is
              no expectation of profit and no guarantee of any return.
            </Typography>
            <Typography component="p" mb={2}>
              Presale participants are purchasing $FAME tokens that are locked
              with a 2 week 10% cliff and 90 day linear vesting period.
            </Typography>
            <Typography component="p" mb={2}>
              Presale participants are assuming all of the risk of the presale.
            </Typography>
            <Typography component="p">
              Presale participants are not purchasing $FAME tokens for the
              purpose of profit, but rather to support the Fame Lady Society and
              the FAMEus DAO.
            </Typography>
          </>
        }
      />
      <QA
        question="Who controls the presale funds?"
        answer={
          <>
            The presale funds are controlled by a{" "}
            <WrappedLink
              href="https://app.safe.global/home?safe=base:0xafC3194EE6139fadD53ED20571F2C78a7e47Cb93"
              target="_blank"
              rel="noopener noreferrer"
            >
              2 of 3 multisig
            </WrappedLink>
            . The 2 of 3 multisig is responsible for the launch of $FAME or
            refund of presale funds.
          </>
        }
      />
      <QA
        question="Can I change my mind and get a refund?"
        answer={
          <>
            Refunds will only be available if the{" "}
            <WrappedLink
              href="https://app.safe.global/home?safe=base:0xafC3194EE6139fadD53ED20571F2C78a7e47Cb93"
              target="_blank"
              rel="noopener noreferrer"
            >
              2 of 3 multisig
            </WrappedLink>{" "}
            decides to refund the presale funds.
          </>
        }
      />
      <QA
        question="When will I get my tokens purchased in the presale?"
        answer={
          <>
            10% of the tokens purchased in the presale will be available to be
            claimed after 2 weeks. The remaining 90% will be vested linearly
            over 90 days and can be claimed at any time after the 2 week cliff.
          </>
        }
      />
      <QA
        question="How much does one Society NFT cost in the presale?"
        answer={
          <>
            The actual answer depends on how much ether is ultimately raised,
            but assuming a 6 ETH raise, then one Society NFT (1 million $FAME)
            will cost 0.035 ETH in the presale.
          </>
        }
      />
    </>
  );
};
