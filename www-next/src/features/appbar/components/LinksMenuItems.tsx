import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import { TwitterIcon } from "@/components/icons/twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";
import { OpenSeaIcon } from "@/components/icons/opensea";
import Divider from "@mui/material/Divider";
import { WrappedLink } from "@/components/WrappedLink";
import { MagicEdenIcon } from "@/components/icons/magiceden";

export const LinksMenuItems: FC<{}> = ({}) => {
  return (
    <>
      <MenuItem
        component={WrappedLink}
        href="https://twitter.com/FameLadySociety"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon>
          <TwitterIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography textAlign="right" color="white">
              @FameLadySociety
            </Typography>
          }
        />
      </MenuItem>
      <MenuItem
        component={WrappedLink}
        href="https://www.instagram.com/famelady.society/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon>
          <InstagramIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography textAlign="right" color="white">
              famelady.society
            </Typography>
          }
        />
      </MenuItem>
      <MenuItem
        component={WrappedLink}
        href="https://www.threads.net/@famelady.society"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon>
          <Image
            src="/images/logos/threads-logo.png"
            alt="threads logo"
            width={20}
            height={25}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography textAlign="right" color="white">
              @famelady.society
            </Typography>
          }
        />
      </MenuItem>
      <MenuItem
        component={WrappedLink}
        href="https://buy.fameladysociety.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon>
          <Image
            src="/images/logos/reservoir.svg"
            alt="reservoir"
            width={25}
            height={25}
            style={{
              maxWidth: "100%",
              height: "auto",
              marginRight: 8,
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography textAlign="right" color="white">
              Our Marketplace
            </Typography>
          }
        />
      </MenuItem>
      <MenuItem
        component={WrappedLink}
        href="https://magiceden.io/collections/ethereum/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon>
          <MagicEdenIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography textAlign="right" color="white">
              Magic Eden Collection
            </Typography>
          }
        />
      </MenuItem>
      <MenuItem
        component={WrappedLink}
        href="https://discord.gg/fameladysociety"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ListItemIcon>
          <Image
            src="/images/reveal/discord-dark.png"
            alt="discord"
            width={90}
            height={25}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography textAlign="right" color="white">
              Invite
            </Typography>
          }
        />
      </MenuItem>
      <Divider component="li" />
    </>
  );
};
