import { useFrame } from "@react-three/fiber";
import {
  FC,
  useRef,
  useEffect,
  useState,
  ReactElement,
  PropsWithChildren,
  ForwardRefRenderFunction,
  cloneElement,
  forwardRef,
  useImperativeHandle,
} from "react";
import { AnimationMixer, AnimationAction, Object3D } from "three";

interface UseMixerTimeUpdateProps {
  scroll: { offset: number };
  mixer: AnimationMixer | null;
}

export const useMixerTimeUpdate = ({
  scroll,
  mixer,
}: UseMixerTimeUpdateProps) => {
  useFrame(() => {
    if (!mixer) return;

    mixer.setTime(scroll.offset);
  });
};

type AnimatableChildProps<TRef> = {
  ref?: React.Ref<TRef>;
};

type AnimatableProps<TChildProps extends AnimatableChildProps<TRef>, TRef> = {
  animationClip: (ref: React.RefObject<TRef>) => {
    mixer: AnimationMixer;
    action: AnimationAction;
  };
  scroll: { offset: number };
  children: ReactElement<TChildProps>;
};

type AnimatableFC<TChildProps extends AnimatableChildProps<TRef>, TRef> = FC<
  PropsWithChildren<AnimatableProps<TChildProps, TRef>>
>;

const createAnimatableComponent = <TRef extends Object3D>() => {
  const AnimatableComponent: ForwardRefRenderFunction<
    TRef,
    AnimatableProps<AnimatableChildProps<TRef>, TRef>
  > = (props, ref) => {
    const { animationClip, children, scroll } = props;
    const [mixer, setMixer] = useState<AnimationMixer | null>(null);
    const internalRef = useRef<TRef>(null);

    useImperativeHandle(ref, () => internalRef.current);

    useEffect(() => {
      if (!internalRef.current) return;
      const { mixer, action } = animationClip(internalRef);
      setMixer(mixer);
      action.play();

      return () => {
        mixer.stopAllAction();
        action.stop();
      };
    }, [animationClip, internalRef]);

    useMixerTimeUpdate({ scroll, mixer });

    const childrenWithRef = cloneElement(children, { ref: internalRef });

    return childrenWithRef;
  };

  return forwardRef(AnimatableComponent);
};

export const ScrollAnimatable: AnimatableFC<
  AnimatableChildProps<Object3D>,
  Object3D
> = createAnimatableComponent();
