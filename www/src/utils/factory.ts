export function lazy<R>(getter: () => R) {
  return {
    get() {
      return getter();
    },
  };
}

export function lazySingleton<R>(getter: () => R) {
  let value: R;
  return lazy<R>(() => {
    if (!value) {
      value = getter();
    }
    return value;
  });
}
