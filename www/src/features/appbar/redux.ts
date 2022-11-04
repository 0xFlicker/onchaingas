import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  darkMode: boolean;
  fancyMode: boolean;
  menuOpen: boolean;
}
const initialState: IState = {
  darkMode: false,
  fancyMode: true,
  menuOpen: false,
};

const slice = createSlice({
  name: "appbar",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    closeMenu: (state) => {
      state.menuOpen = false;
    },
    setFancyMode: (state, action: PayloadAction<boolean>) => {
      state.fancyMode = action.payload;
    },
    toggleFancyMode: (state) => {
      state.fancyMode = !state.fancyMode;
    },
  },
});

const selectRoot = (state: { appbar: IState }) => state.appbar;
export const selectDarkMode = createSelector(
  selectRoot,
  (state) => state.darkMode
);
export const selectMenuOpen = createSelector(
  selectRoot,
  (state) => state.menuOpen
);
export const selectFancyMode = createSelector(
  selectRoot,
  (state) => state.fancyMode
);
export const selectors = {
  darkMode: selectDarkMode,
  menuOpen: selectMenuOpen,
  fancyMode: selectFancyMode,
};

export const actions = slice.actions;
export const reducer = slice.reducer;
