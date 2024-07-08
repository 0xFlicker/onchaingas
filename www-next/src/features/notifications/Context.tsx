import {
  useState,
  useContext,
  createContext,
  useCallback,
  type Context,
  type FC,
  type PropsWithChildren,
} from "react";

export type Notification = {
  id: string;
  message: React.ReactNode;
  type: "success" | "error" | "info";
  autoHideMs?: number;
};

type NotificationsContext = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
};

const NotificationsContext = createContext<NotificationsContext>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const addNotification = useCallback((notification: Notification) => {
    setNotifications((notifications) => [...notifications, notification]);
  }, []);
  const removeNotification = useCallback((id: string) => {
    setNotifications((notifications) => {
      const index = notifications.findIndex((n) => n.id === id);
      if (index === -1) {
        return notifications;
      }
      const newNotifications = [...notifications];
      newNotifications.splice(index, 1);
      return newNotifications;
    });
  }, []);
  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
