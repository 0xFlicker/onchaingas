import React, {
  FC,
  useEffect,
  useRef,
  useState,
  PropsWithChildren,
} from "react";

type Point = [number, number];

function createRandomCurve(): (T: number) => Point {
  const randomAngle = Math.random() * (Math.PI / 2); // Angle between 0 and PI/2 (0 and 90 degrees)
  const randomVelocity = 5 + Math.random() * 20; // Random initial velocity between 5 and 25 m/s

  const initialVelocityX = randomVelocity * Math.cos(randomAngle);
  const initialVelocityY = randomVelocity * Math.sin(randomAngle);

  const g = 9.81; // Gravity constant (m/s^2)

  return function (T: number): Point {
    const x = initialVelocityX * T;
    const y = initialVelocityY * T - (1 / 2) * g * T * T;
    return [x, Math.max(0, y)]; // Ensure y is non-negative (i.e., above ground)
  };
}

type Props = {
  count: number;
  children: React.ReactElement;
};

const SurpriseShower: FC<Props> = ({ count, children }) => {
  const [animatedChildren, setAnimatedChildren] = useState<JSX.Element[]>([]);
  const frameRef = useRef<number>();

  useEffect(() => {
    const curves = Array.from({ length: count }, () => createRandomCurve());
    const startTimes = Array.from({ length: count }, () => performance.now());

    const updatePositions = () => {
      const currentTime = performance.now();

      const updatedChildren = curves.map((curve, index) => {
        const elapsedTime = (currentTime - startTimes[index]) / 1000;
        const [x, y] = curve(elapsedTime);

        return React.cloneElement(children, {
          key: index,
          style: {
            position: "fixed",
            left: `calc(50% + ${x}px)`,
            bottom: `${y}px`,
          },
        });
      });

      setAnimatedChildren(
        updatedChildren.filter(
          (_, index) => curves[index](performance.now() / 1000)[1] > 0
        )
      );

      frameRef.current = requestAnimationFrame(updatePositions);
    };

    frameRef.current = requestAnimationFrame(updatePositions);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [count, children]);

  return <>{animatedChildren}</>;
};

export default SurpriseShower;
