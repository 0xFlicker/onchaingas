import Button from "@mui/material/Button";
import TwitterIcon from "@mui/icons-material/Twitter";
import { WrappedLink } from "components/WrappedLink";
import { FC } from "react";

export const TweetCheck: FC = () => {
  return (
    <Button
      startIcon={<TwitterIcon />}
      LinkComponent={WrappedLink}
      target="_blank"
      href="https://twitter.com/intent/tweet?text=I%20just%20minted%20an%20On%20Chain%20Check%20Gas%20by%20%400xflick!%20On%20Chain%20Check%20Gas%20is%20a%20100%25%20on-chain%20NFT%20that%20visualizes%20the%20current%20price%20of%20gas%20on%20Ethereum%20using%20three.js.%20Now%20I%20can%20check%20gas%20prices%20just%20be%20looking%20at%20this%20NFT.%20Mint%20your%20own%20at&url=0xflick.xyz%2Fcheck&hashtags=nft,mint,alpha"
    >
      tweet it
    </Button>
  );
};
