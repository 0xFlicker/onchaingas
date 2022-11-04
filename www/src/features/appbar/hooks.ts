import { useEffect, useCallback } from "react";
import useLocalStorage from "use-local-storage";
import { useAppDispatch, useAppSelector } from "app/store";
import {
  selectors as appbarSelectors,
  actions as appbarActions,
} from "features/appbar/redux";

export enum ETheme {
  LIGHT = "light",
  DARK = "dark",
}

export function useSavedTheme() {
  const isDarkMode = useAppSelector(appbarSelectors.darkMode);
  const [theme, setTheme] = useLocalStorage("darkMode", true, {
    syncData: true,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appbarActions.setDarkMode(theme));
  }, [dispatch, theme]);

  const handleChange = useCallback(() => {
    setTheme(!isDarkMode);
  }, [setTheme, isDarkMode]);
  return {
    isDarkMode,
    handleChange,
  };
}
export function useFancyMode() {
  const isFancyMode = useAppSelector(appbarSelectors.fancyMode);
  const [savedFancyMode, setFancyMode] = useLocalStorage("fancyMode", true, {
    syncData: true,
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(appbarActions.setFancyMode(savedFancyMode));
  }, [dispatch, savedFancyMode, isFancyMode]);

  const handleChange = useCallback(() => {
    setFancyMode(!isFancyMode);
  }, [setFancyMode, isFancyMode]);
  return { isFancyMode, handleChange };
}
