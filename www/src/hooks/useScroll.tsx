import { useScroll as useDreiScroll } from "@react-three/drei";
import { easeQuadOut } from "d3-ease";
import {
  Provider,
  Context,
  createContext,
  useMemo,
  FC,
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

function useScrollInner({
  isSwipeOnly,
  dampingFactor,
  pages,
}: {
  dampingFactor: number;
  isSwipeOnly: boolean;
  pages: number;
}) {
  if (!isSwipeOnly) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const threeScroll = useDreiScroll();
    function scrollTo(scrollOptions: ScrollToOptions) {
      // convert scrollOptions.top from 0-1 to 0-threeScroll.el.clientHeight
      scrollOptions.top = scrollOptions.top * window.innerHeight * pages;
      threeScroll.el.scrollTo(scrollOptions);
    }
    return useMemo(
      () => ({
        isSwipeOnly,
        get offset() {
          return threeScroll.offset;
        },
        pages,
        scrollTo,
      }),
      [isSwipeOnly, pages, threeScroll.offset, threeScroll.el]
    );
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [initialOffset, setInitialOffset] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [scrollStartTime, setScrollStartTime] = useState<null | number>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [targetOffset, setTargetOffset] = useState(0);
  const duration = 500; // Duration of the smooth scroll in milliseconds
  const scrollToTouch = useCallback((scrollOptions: ScrollToOptions) => {
    setInitialOffset((initialOffset) => {
      if (initialOffset === scrollOptions.top || scrollStartTime !== null) {
        return initialOffset;
      }

      // calculate the initial offset based on the current offset
      const timeSinceScrollStart = Date.now() - scrollStartTime;
      if (timeSinceScrollStart >= duration) {
        return targetOffset;
      }
      const normalizeTime = timeSinceScrollStart / duration;
      const easedNormalizedTime = easeQuadOut(normalizeTime);
      return (
        initialOffset + (targetOffset - initialOffset) * easedNormalizedTime
      );
    }); // Save the current value of the offset before scrolling
    setTargetOffset(scrollOptions.top);
    setScrollStartTime(Date.now());
  }, []);
  return useMemo(
    () => ({
      get offset() {
        if (scrollStartTime === null || initialOffset === targetOffset) {
          return targetOffset;
        }

        const timeSinceScrollStart = Date.now() - scrollStartTime;

        if (timeSinceScrollStart >= duration) {
          setScrollStartTime(null);
          setInitialOffset(targetOffset);
          return targetOffset;
        }

        // normalize timeSinceScrollStart to 0-1
        const normalizeTime = timeSinceScrollStart / duration;
        const easedNormalizedTime = easeQuadOut(normalizeTime);

        const ret =
          initialOffset + (targetOffset - initialOffset) * easedNormalizedTime;
        return ret;
      },
      scrollTo: scrollToTouch,
      pages,
      isSwipeOnly,
    }),
    [initialOffset, isSwipeOnly, pages, scrollStartTime, targetOffset]
  );
}

const ScrollContext = createContext({
  isSwipeOnly: false,
  offset: 0,
  pages: 1,
  scrollTo: (scrollOptions: ScrollToOptions) => {},
});

export const ScrollProvider: FC<
  PropsWithChildren<{
    swipeOnly?: boolean;
    pages: number;
  }>
> = ({ children, swipeOnly, pages }) => {
  const value = useScrollInner({
    isSwipeOnly: !!swipeOnly,
    dampingFactor: 0.1,
    pages,
  });
  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};

export function useScroll() {
  return useContext(ScrollContext);
}
