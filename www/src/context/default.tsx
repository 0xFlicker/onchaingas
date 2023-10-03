import { FC, PropsWithChildren } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider as Web3Provider } from "features/web3/Provider";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store, useAppSelector } from "app/store";
import { selectors as appbarSelectors } from "features/appbar/redux";
import dark from "themes/dark";
import light from "themes/light";
import { WagmiConfig } from "wagmi";

export const StateAvailableContent: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const isDarkMode = useAppSelector(appbarSelectors.darkMode);
  return (
    <ThemeProvider theme={isDarkMode ? dark : light}>
      <Web3Provider>{children}</Web3Provider>
    </ThemeProvider>
  );
};

export const DefaultProvider: FC<PropsWithChildren<{}>> = ({ children }) => (
  <Provider store={store}>
    <StateAvailableContent>
      <CssBaseline />
      {children}
    </StateAvailableContent>
  </Provider>
);
