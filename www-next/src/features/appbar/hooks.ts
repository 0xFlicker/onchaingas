import { useCallback } from "react";
import useLocalStorage from "use-local-storage";

export enum ETheme {
  LIGHT = "light",
  DARK = "dark",
}

export function useSavedTheme() {
  const [isDarkMode, setTheme] = useLocalStorage("darkMode", true, {
    syncData: true,
  });

  const toggleTheme = useCallback(() => {
    setTheme(!isDarkMode);
  }, [setTheme, isDarkMode]);
  return {
    isDarkMode,
    toggleTheme,
    setDarkMode: setTheme,
  };
}
export function useFancyMode() {
  const [savedFancyMode, setFancyMode] = useLocalStorage("fancyMode", true, {
    syncData: true,
  });

  const handleChange = useCallback(() => {
    setFancyMode(!savedFancyMode);
  }, [setFancyMode, savedFancyMode]);
  return { isFancyMode: savedFancyMode, handleChange };
}
