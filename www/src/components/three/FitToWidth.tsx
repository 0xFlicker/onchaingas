import { PerspectiveCamera, Vector3 } from "three";
import { Center, OnCenterCallbackProps } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {
  ComponentProps,
  FC,
  forwardRef,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

type Props = Omit<ComponentProps<typeof Center>, "onCentered"> & {
  maxWidth?: number;
  marginPercent?: number;
  onCentered?: (props: OnCenterCallbackProps) => void;
};

export const FitToWidth: FC<PropsWithChildren<Props>> = forwardRef(
  function FitToWidth(
    { children, maxWidth, marginPercent, onCentered: onCenteredProp, ...props },
    ref
  ) {
    const [centered, setCentered] = useState(false);
    const [viewport, camera] = useThree(
      (state) => [state.viewport, state.camera] as const
    );
    const onCentered = useCallback(
      (onCenteredProps: OnCenterCallbackProps) => {
        if (centered) return;
        setCentered(true);
        const { container, width } = onCenteredProps;
        if (camera instanceof PerspectiveCamera) {
          // Calculate the frustum width at the depth of the container from the near clipping plane
          const nearPos = new Vector3(0, 0, camera.near).unproject(camera);
          const zDepth = Math.abs(nearPos.z - container.position.z);
          const frustumHeight =
            2 * zDepth * Math.tan(camera.fov * 0.5 * (Math.PI / 180));
          const frustumWidth = frustumHeight * camera.aspect;

          // Calculate margin
          const margin = marginPercent * frustumWidth;

          // Scale the container to fit the frustum width, considering the maxWidth and margin
          let scale = (frustumWidth - margin) / width;
          if (maxWidth !== undefined) {
            scale = Math.min(scale, maxWidth / width);
          }
          container.scale.setScalar(scale);
          onCenteredProp?.({
            ...onCenteredProps,
            width: frustumWidth,
          });
        } else {
          // Fall back to the viewport for non-perspective cameras
          container.scale.setScalar(viewport.width / width);
          onCenteredProp?.(onCenteredProps);
        }
      },
      [
        camera,
        centered,
        marginPercent,
        maxWidth,
        onCenteredProp,
        viewport.width,
      ]
    );
    return (
      <Center onCentered={onCentered} {...props} ref={ref}>
        {children}
      </Center>
    );
  }
);
