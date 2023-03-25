import {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
  MouseEventHandler,
  ReactNode,
} from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import { AppBar } from "features/appbar/components/appBar";
import { useAppDispatch } from "app/store";
import { actions as appbarActions } from "features/appbar/redux";

export const Main: FC<
  PropsWithChildren<{
    menu: ReactNode;
    title?: ReactNode;
  }>
> = ({ children, menu, title }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [height, setSize] = useState<number>(0);

  useEffect(() => {
    if (!toolbarRef.current) return;

    const clintRect = toolbarRef.current.getClientRects();
    setSize(window.innerHeight - clintRect[0].height);
    function onResize() {
      setSize(window.innerHeight - clintRect[0].height);
    }
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <AppBar menu={menu} title={title} />
      <Box
        ref={targetRef}
        component="main"
        display="flex"
        sx={{ flexFlow: "column", height: "100%" }}
      >
        <Toolbar ref={toolbarRef} sx={{ flex: "0 1 auto" }} />
        <Box component="div" display="flex" sx={{ flex: "1 1 auto", height }}>
          {children}
        </Box>
      </Box>
    </>
  );
};
