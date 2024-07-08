import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import { QA } from "./QA";
import { WrappedLink } from "@/components/WrappedLink";

export const FameFAQ: FC = () => {
  return (
    <>
      <QA
        question="What is $FAME?"
        answer={
          <>
            <Typography component="p" mb={2}>
              $FAME is a community token for the Fame Lady Society. $FAME was
              presented to the Fame Lady Society community in March 2024 vote as
              a way to reward holders and encourage more people to wrap their
              Fame Lady Squad NFTs and join the Fame Lady Society.
            </Typography>
            <Typography component="p" mb={2}>
              $FAME is both an ERC20 token called $FAME and an ERC721 NFT called
              Society. These tokens are linked together using a informal
              standard called DN404 (Divisible NFT). Each Society NFT is exactly
              1 million $FAME tokens and each 1 million $FAME tokens is exactly
              1 Society NFT.
            </Typography>
            <Typography component="p" mb={2}>
              Because each Society NFT is exactly 1 million $FAME tokens, and
              $FAME will have DeFi liquidity, the Society NFTs will have a floor
              price based on the $FAME token price.
            </Typography>
            <Typography component="p">
              You can think of each Society NFT as being backed by the liquidity
              of 1 million $FAME tokens.
            </Typography>
          </>
        }
      />
      <QA
        question="What are the Society NFTs?"
        answer={
          <>
            The Society NFTs are each unique 1/1 art pieces that represent the
            bold HERstory of the Fame Lady Society. The reveal date for the art
            is two weeks after launch or when the free claim period ends.
          </>
        }
      />
      <QA
        question="How can an NFT and an ERC20 token be linked?"
        answer={
          <>
            <Typography component="p" mb={2}>
              Every time a wallet collects 1 million or more $FAME tokens, a
              society NFT is automatically minted to the wallet. Each additional
              1 million $FAME tokens collected will mint an additional society
              NFT.
            </Typography>
            <Typography component="p" mb={2}>
              If at any time the wallet balance falls below the 1 million $FAME
              tokens needed to mint a society NFT, the society NFT will be
              automatically burned.
            </Typography>
            <Typography component="p">
              This process is automatic and requires no action from the wallet.
            </Typography>
          </>
        }
      />
      <QA
        question="Can I transfer my Society NFT?"
        answer={
          <>
            <Typography component="p">
              If you transfer your Society NFT to another wallet, the linked 1
              million $FAME tokens will be transferred with it.
            </Typography>
          </>
        }
      />
      <QA
        question="What happens when I sell my $FAME?"
        answer={
          <>
            <Typography component="p">
              If you sell enough $FAME to bring your balance below the 1 million
              $FAME tokens needed to mint a Society NFT, the Society NFT will be
              automatically burned.
            </Typography>
          </>
        }
      />
      <QA
        question="How is the $FAME allocation calculated?"
        answer={
          <>
            <Typography component="p">
              The $FAME allocation is rank and
            </Typography>
          </>
        }
      />
      <QA
        question="Tokenomics?"
        answer={
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Typography
                  component="span"
                  fontWeight={700}
                  style={{ minWidth: "60px" }}
                >
                  50%
                </Typography>
                <span>Locked liquidity.</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Typography
                  component="span"
                  fontWeight={700}
                  style={{ minWidth: "60px" }}
                >
                  23.5%
                </Typography>
                <span>Free claim for Fame Lady Society holders.</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Typography
                  component="span"
                  fontWeight={700}
                  style={{ minWidth: "60px" }}
                >
                  1.5%
                </Typography>
                <span>
                  Free claim for Hunnys, Mermaid Power and Metavixen holders.
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Typography
                  component="span"
                  fontWeight={700}
                  style={{ minWidth: "60px" }}
                >
                  20%
                </Typography>
                <span>
                  Presale allocation, for those providing the initial liquidity.
                  Locked with a 2 week 10% cliff and 90 day linear vesting
                  period.
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Typography
                  component="span"
                  fontWeight={700}
                  style={{ minWidth: "60px" }}
                >
                  5%
                </Typography>
                <span>
                  Fame Lady Society community council multisig donation.
                </span>
              </div>
            </div>
          </>
        }
      />
      <QA
        question="What is locked liquidity?"
        answer={
          <>
            <Typography component="p" mb={2}>
              Locked liquidity is liquidity that is locked in a smart contract
              and cannot be accessed by anyone. This ensures that there is
              always liquidity for the token.
            </Typography>
            <Typography component="p">
              Since liquidity requires both $FAME and ether, the ether side of
              the liquidity comes from the presale. This presale is being raised
              entirely inside the Fame Lady Society community and is only
              available to Fame Lady Society holders. In exchange for providing
              the initial liquidity, the presale participants receive $FAME
              tokens.
            </Typography>
          </>
        }
      />
      <QA
        question="What is the free claim?"
        answer={
          <>
            <Typography component="p" mb={2}>
              To reward the Fame Lady Society community (and related sister
              collections), a portion of $FAME is freely claimable by Fame Lady
              Society holders. This free claim is available for two weeks after
              the launch of $FAME.
            </Typography>
            <Typography component="p">
              All unclaimed $FAME will be deposited into a FAMEus DAO that all
              Society NFT holders can vote on. The expectation is that the DAO
              will use the unclaimed $FAME to further the goals of $FAME and the
              Fame Lady Society.
            </Typography>
          </>
        }
      />
      <QA
        question="What is the FAMEus DAO?"
        answer={
          <>
            <Typography component="p" mb={2}>
              The primary goal of the FAMEus DAO is to decide how to use the
              unclaimed $FAME. The DAO will be controlled by Society NFT
              holders. While ultimately the DAO can decide how to use the funds,
              the expectation is that the funds will be used to further the
              goals of $FAME and the Fame Lady Society.
            </Typography>
            <Typography component="p" mb={2}>
              Examples of on-chain proposals that the DAO could vote on include
              burning tokens, funding community projects, or incentivizing
              liquidity.
            </Typography>
            <Typography component="p">
              The DAO will be controlled by a real governor contract that will
              be accessible via{" "}
              <WrappedLink
                href="https://www.tally.xyz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tally
              </WrappedLink>
              .
            </Typography>
          </>
        }
      />
      <QA
        question="What chain is $FAME on?"
        answer={
          <>
            $FAME is on the Base chain. The Base chain is a layer 2 chain that
            uses ether as its native token. The Base chain supports low gas fees
            and fast transactions.
          </>
        }
      />
      <QA
        question="How can I bridge to the Base chain?"
        answer={
          <>
            Use one of the bridges{" "}
            <WrappedLink
              href="https://bridge.base.org/deposit"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </WrappedLink>{" "}
            to move ether from the Ethereum chain to the Base chain.
          </>
        }
      />
      <QA
        question="When is the $FAME launch?"
        answer={
          <>
            There is no ETA for the launch of $FAME. The smart contracts are
            still being developed and tested. The art for the Society NFTs is
            still being created. The launch will happen when the community
            decides it is ready.
          </>
        }
      />
    </>
  );
};
