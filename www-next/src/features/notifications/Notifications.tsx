import React, { FC, useCallback, useMemo, useState } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useNotifications, type Notification } from "./Context";

export const Notifications: FC = () => {
  const { notifications, removeNotification } = useNotifications();
  const [messageInfo, setMessageInfo] = useState<Notification | null>(null);

  const handleClose = useCallback(
    (
      event: Event | React.SyntheticEvent<any, Event>,
      reason: SnackbarCloseReason,
    ) => {
      if (messageInfo) {
        removeNotification(messageInfo.id);
      }
      setMessageInfo(null);
    },
    [messageInfo, removeNotification],
  );

  const processQueue = useCallback(() => {
    if (notifications.length > 0) {
      const topTransaction = notifications[0];
      setMessageInfo(topTransaction);
      removeNotification(topTransaction.id);
    }
  }, [notifications, removeNotification]);

  useMemo(() => {
    if (notifications.length > 0 && !messageInfo) {
      processQueue();
    }
  }, [notifications, messageInfo, processQueue]);

  return (
    <Snackbar
      key={messageInfo?.id}
      open={messageInfo !== null}
      autoHideDuration={messageInfo?.autoHideMs}
      onClose={handleClose}
      message={messageInfo?.message}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      ContentProps={{
        sx: {
          backgroundColor: messageInfo?.type === "error" ? "red" : "white",
          color: messageInfo?.type === "error" ? "white" : "black",
        },
      }}
      style={{
        // translate down 50px to avoid the header
        top: "80px",
      }}
    />
  );
};
