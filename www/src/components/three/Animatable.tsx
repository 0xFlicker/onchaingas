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

type AnimatableChildProps<TRef> = {
  ref?: React.Ref<TRef>;
};

type AnimatableProps<TChildProps extends AnimatableChildProps<TRef>, TRef> = {
  animationClip: (ref: React.RefObject<TRef>) => {
    mixer: AnimationMixer;
    action: AnimationAction;
  };
  autoPlay?: boolean;
  delay?: number;
  children: ReactElement<TChildProps>;
};

type AnimatableFC<TChildProps extends AnimatableChildProps<TRef>, TRef> = FC<
  PropsWithChildren<AnimatableProps<TChildProps, TRef>>
>;

const createAnimatableComponent = <TRef extends Object3D>() => {
  const AnimatableComponent: ForwardRefRenderFunction<
    TRef & {
      mixer: AnimationMixer;
    },
    AnimatableProps<AnimatableChildProps<TRef>, TRef>
  > = (props, ref) => {
    const { animationClip, autoPlay, children, delay } = props;
    const [mixer, setMixer] = useState<AnimationMixer | null>(null);
    const internalRef = useRef<TRef>(null);

    useImperativeHandle(
      ref,
      () => {
        (
          internalRef.current as unknown as TRef & {
            mixer: AnimationMixer;
          }
        ).mixer = mixer;
        return internalRef.current as any;
      },
      [internalRef, mixer]
    );

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

    let now = Date.now() + delay ?? 0;
    useFrame((_state, deltaTime) => {
      if (!mixer || !autoPlay) return;
      if (delay && now > Date.now()) return;
      mixer.update(deltaTime);
    });

    const childrenWithRef = cloneElement(children, { ref: internalRef });

    return childrenWithRef;
  };

  return forwardRef(AnimatableComponent);
};

export const Animatable: AnimatableFC<
  AnimatableChildProps<Object3D>,
  Object3D
> = createAnimatableComponent();
