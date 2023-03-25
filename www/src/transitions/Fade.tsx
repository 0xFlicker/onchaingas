import { forwardRef } from "react";
import { useSpring, animated } from "react-spring";

interface IFadeProps {
  children?: React.ReactElement;
  in?: boolean;
  duration?: number;
  onEnter?: () => {};
  onExited?: () => {};
}

export const Fade = forwardRef<HTMLDivElement, IFadeProps>(function Fade(
  props,
  ref
) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
    config: {
      duration: props.duration ?? 500,
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});
