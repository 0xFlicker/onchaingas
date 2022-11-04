import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export interface IReadState<T, I extends unknown = unknown> {
  readonly fetching: boolean;
  readonly error: string | null;
  readonly input?: I;
  readonly value?: T;
}
export function defaultReadContractState<T, I>(input?: I): IReadState<T, I> {
  return {
    fetching: false,
    error: null,
    input,
  };
}

export function readContractRedux<T, I extends unknown = unknown>(
  name: string
) {
  const slice = createSlice({
    name,
    initialState: defaultReadContractState<T, I>(),
    reducers: {
      fetch(state) {
        state.fetching = true;
        state.error = null;
      },
      fetchSuccess(state, action: PayloadAction<T>) {
        state.fetching = false;
        state.value = action.payload as Draft<T>;
      },
      fetchError(state, action: PayloadAction<string>) {
        state.fetching = false;
        state.error = action.payload;
      },
      input(state, action: PayloadAction<I>) {
        state.input = action.payload as Draft<I>;
      },
    },
  });

  const selectValue = <I>(state: IReadState<T, I>) => state.value;
  const selectIsFetching = <I>(state: IReadState<T, I>) => state.fetching;
  const selectError = <I>(state: IReadState<T, I>) => state.error;

  const selectors = {
    value: selectValue,
    isFetching: selectIsFetching,
    error: selectError,
  };
  const reducer = slice.reducer;
  const actions = slice.actions;

  return { selectors, reducer, actions };
}

export function createReadInputRedux<T, I extends unknown = unknown>(
  name: string,
  keyCreator: (input: I) => string
) {
  const slice = createSlice({
    name,
    initialState: {} as Record<string, IReadState<T, I>>,
    reducers: {
      fetch(state, action: PayloadAction<I>) {
        const key = keyCreator(action.payload);
        state[key] = {
          fetching: true,
          error: null,
          input: action.payload as Draft<I>,
        };
      },
      fetchSuccess(
        state,
        action: PayloadAction<{
          input: I;
          value: T;
        }>
      ) {
        const key = keyCreator(action.payload.input);
        state[key] = {
          fetching: false,
          error: null,
          value: action.payload.value as Draft<T>,
        };
      },
      fetchError(
        state,
        action: PayloadAction<{
          input: I;
          errorMessage: string;
        }>
      ) {
        const key = keyCreator(action.payload.input);
        state[key] = {
          fetching: false,
          error: action.payload.errorMessage,
        };
      },
    },
  });

  const selectValue = <I>(state: IReadState<T, I>) => state.value;
  const selectIsFetching = <I>(state: IReadState<T, I>) => state.fetching;
  const selectError = <I>(state: IReadState<T, I>) => state.error;

  const selectors = {
    value: selectValue,
    isFetching: selectIsFetching,
    error: selectError,
  };
  const selectorFactory = (input: I) => {
    const key = keyCreator(input);
    return {
      value: (state: Record<string, IReadState<T, I>>) =>
        key in state ? selectors.value(state[key]) : undefined,
      isFetching: (state: Record<string, IReadState<T, I>>) =>
        key in state ? selectors.isFetching(state[key]) : false,
      error: (state: Record<string, IReadState<T, I>>) =>
        key in state ? selectors.error(state[key]) : null,
    };
  };
  const reducer = slice.reducer;
  const actions = slice.actions;

  return { selectors, selectorFactory, reducer, actions };
}
