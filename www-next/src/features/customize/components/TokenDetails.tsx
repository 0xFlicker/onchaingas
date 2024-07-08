import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import * as sentry from "@sentry/nextjs";
import { useSIWE } from "connectkit";
import Grid2 from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IMetadata, defaultDescription, imageUrl } from "@/utils/metadata";
import { useUpdateMetadata } from "../hooks/useUpdateMetadata";
import { useWriteContract } from "wagmi";
import { useChainContracts } from "@/hooks/useChainContracts";
import { TransactionsModal } from "@/features/wrap/components/TransactionsModal";
import { useNotifications } from "@/features/notifications/Context";
import { useRouter } from "next/navigation";
import { Transaction } from "@/features/wrap/types";
import IconButton from "@mui/material/IconButton";
import BackIcon from "@mui/icons-material/ArrowBack";
import { ServiceModal } from "./ServiceModal";
import { SocialShareDialog } from "./SocialShare";

const EditableNameAndDescription: FC<{
  initialName: string;
  initialDescription: string;
  onSubmit: (name: string, description: string) => void;
  isPending: boolean;
}> = ({ initialName, initialDescription, onSubmit, isPending }) => {
  const wantToUpdate = useRef(false);
  const { addNotification } = useNotifications();
  const [name, setName] = useState(initialName);
  const { isLoading, isSignedIn, signIn } = useSIWE({
    onSignIn: () => {
      if (wantToUpdate.current) {
        onSubmit(name, initialDescription);
        wantToUpdate.current = false;
      }
    },
    onSignOut: () => {
      if (wantToUpdate) {
        wantToUpdate.current = false;
        addNotification({
          id: "sign-out",
          message: "You need to sign in with ethereum to update the token",
          type: "info",
        });
      }
    },
  });
  const [description, setDescription] = useState(initialDescription);
  const doSubmit = useCallback(() => {
    if (!isSignedIn) {
      wantToUpdate.current = true;
      setTimeout(() => signIn());
    } else {
      onSubmit(name, description);
    }
  }, [isSignedIn, signIn, onSubmit, name, description]);
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <FormGroup onSubmit={doSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          label="Backstory"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          multiline
          rows={4}
          sx={{
            my: 2,
          }}
        />
      </FormGroup>
      <Button variant="contained" color="primary" onClick={doSubmit}>
        {isPending || isLoading ? (
          <CircularProgress size={24} />
        ) : (
          <Box component="span" width={24} />
        )}
        Update
        <Box component="span" width={24} />
      </Button>
    </Paper>
  );
};

const Attribute: FC<{ name: string; value: string | number }> = ({
  name,
  value,
}) => {
  return (
    <Box
      component="div"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignContent="center"
      padding={2}
    >
      <Typography variant="body1" color="text.secondary">
        {name}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
};

export const TokenDetails: FC<{
  metadata: IMetadata;
  tokenId: number;
  network?: "mainnet" | "sepolia";
}> = ({ metadata, tokenId, network }) => {
  const { refresh, push } = useRouter();
  const { addNotification } = useNotifications();

  const [shareOpen, setShareOpen] = useState(false);
  const [transactionHash, setTransactionHash] = useState<Transaction | null>(
    null,
  );
  const { mutateAsync, isPending } = useUpdateMetadata();
  const { namedLadyRendererAbi, namedLadyRendererAddress } =
    useChainContracts();
  const { writeContractAsync } = useWriteContract();
  const initialDescription = useMemo(() => {
    const chunks = metadata.description?.split(defaultDescription);
    if (chunks && chunks.length > 1) {
      return chunks[0].trim();
    }
    return "";
  }, [metadata.description]);
  const onSubmit = useCallback(
    (name: string, description: string) => {
      if (name !== metadata.name || initialDescription !== description) {
        mutateAsync({ tokenId, name, description })
          .then(({ tokenUri, signature }) =>
            writeContractAsync({
              abi: namedLadyRendererAbi,
              address: namedLadyRendererAddress,
              functionName: "setTokenUri",
              args: [BigInt(tokenId), tokenUri, signature],
            })
              .then((tx) => {
                setTransactionHash({
                  kind: "update metadata",
                  hash: tx,
                });
              })
              .catch((e) => {
                addNotification({
                  id: "set-token-uri",
                  message: "Failed to submit update transaction",
                  type: "error",
                  autoHideMs: 5000,
                });
                sentry.captureException(e, {
                  tags: {
                    tokenId: tokenId.toString(),
                  },
                });
              }),
          )
          .catch((e) => {
            addNotification({
              id: "update-metadata",
              message: "Failed to submit metadata update",
              type: "error",
              autoHideMs: 5000,
            });
            sentry.captureException(e, {
              tags: {
                tokenId: tokenId.toString(),
              },
            });
          });
      } else {
        addNotification({
          id: "no-change",
          message: "No changes to submit",
          type: "info",
          autoHideMs: 5000,
        });
      }
    },
    [
      addNotification,
      initialDescription,
      metadata.name,
      mutateAsync,
      namedLadyRendererAbi,
      namedLadyRendererAddress,
      tokenId,
      writeContractAsync,
    ],
  );
  const pendingTransactions = useMemo(
    () => (transactionHash ? [transactionHash] : []),
    [transactionHash],
  );
  const onTransactionConfirmed = useCallback(() => {
    setTransactionHash(null);
    setShareOpen(true);
    refresh();
  }, [refresh]);
  const onClosed = useCallback(() => {
    setTransactionHash(null);
  }, []);
  const onBack = useCallback(() => {
    // get the current URL and remove the last segment
    const segments = location.pathname.split("/");
    segments.pop();
    push(segments.join("/"));
  }, [push]);
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} display="flex" alignItems="center" justifyItems="center">
          <IconButton onClick={onBack}>
            <BackIcon />
          </IconButton>
          {metadata.name && (
            <Button onClick={() => setShareOpen(true)}>Share</Button>
          )}
        </Grid2>
        <Grid2 xs={12}>
          <EditableNameAndDescription
            isPending={isPending}
            initialName={metadata.name!}
            initialDescription={initialDescription!}
            onSubmit={onSubmit}
          />
        </Grid2>
        <Grid2 xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography variant="h4" align="center">
              {metadata.name}
            </Typography>
            <Box
              component="div"
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignContent="center"
            >
              <Image
                src={imageUrl(tokenId)}
                width={800}
                height={800}
                alt="Fame Lady Society Token Image"
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </Box>
          </Paper>
        </Grid2>
        <Grid2 xs={12} lg={6}>
          <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
            <Typography variant="body1" color="text.secondary">
              {metadata.description?.split("\n").map((line) => (
                <>
                  {line}
                  <br />
                </>
              ))}
            </Typography>
            {metadata.attributes?.map(({ trait_type, value }) => {
              return (
                <Attribute
                  key={`${trait_type}:${value}`}
                  name={trait_type}
                  value={value}
                />
              );
            })}
          </Paper>
        </Grid2>
      </Grid2>
      <ServiceModal open={isPending} message="Preparing metadata" />
      <TransactionsModal
        open={!!transactionHash}
        transactions={pendingTransactions}
        onTransactionConfirmed={onTransactionConfirmed}
        onClose={onClosed}
      />
      <SocialShareDialog
        name={metadata.name!}
        tokenId={BigInt(tokenId)}
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        network={network}
        textProvider={(tokenId: bigint, name: string) => {
          switch (Math.floor(Math.random() * 6)) {
            case 0:
              return `💋 My Lady is NOT number ${tokenId}. Say hi to ${name} and HERstory as she flaunts in the @FameLadiesSociety Collection!! 🔥`;
            case 1:
              return `💋 My Lady is NOT number ${tokenId}. Get ready to wink at ${name} and HERstory as she flaunts in the @FameLadiesSociety Collection!! 🔥 `;
            case 2:
              return `💋 My Lady is NOT number ${tokenId}. Bite your lip at ${name} and HERstory as she flaunts in the @FameLadiesSociety Collection!! 🔥 `;
            case 3:
              return `💋 My Lady is NOT number ${tokenId}. Get fired up for ${name} and HERstory as she flaunts in the @FameLadiesSociety Collection!! 🔥 `;
            case 4:
              return `💋 My Lady is NOT number ${tokenId}. Feel the fame for ${name} and HERstory is all WE need as she flaunts in the @FameLadiesSociety Collection!! 🔥 `;
            case 5:
            default:
              return `💋 My Lady is NOT number ${tokenId}. Say Hello to ${name} and HERstory as she flaunts in the @FameLadiesSociety Collection!! 🔥`;
          }
        }}
      />
    </>
  );
};
7;
