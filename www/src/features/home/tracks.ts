import {
  AnimationClip,
  BooleanKeyframeTrack,
  InterpolationEndingModes,
  Vector3,
  VectorKeyframeTrack,
} from "three";

export function createTextKeyframeTracks({
  startPosition,
  endPosition,
  name,
  startTime,
  endTime,
}: {
  startPosition: Vector3;
  endPosition: Vector3;
  name: string;
  startTime: number;
  endTime: number;
}) {
  const positionKF = new VectorKeyframeTrack(
    ".position",
    [startTime, endTime],
    [...startPosition.toArray(), ...endPosition.toArray()]
  );
  const opacityKF = new VectorKeyframeTrack(
    "text.material.opacity",
    [
      startTime,
      (endTime - startTime) / 2,
      startTime + ((endTime - startTime) * 4) / 5,
    ],
    [1, 1, 0]
  );
  const visibilityKF = new BooleanKeyframeTrack(
    ".visible",
    [0, startTime, endTime, 1],
    [false, true, true, false]
  );
  return new AnimationClip(name, 1.00001, [
    positionKF,
    opacityKF,
    visibilityKF,
  ]);
}

export function createTrailingTextKeyframeTracks({
  startPosition,
  endPosition,
  name,
  startTime,
  endTime,
}: {
  startPosition: Vector3;
  endPosition: Vector3;
  name: string;
  startTime: number;
  endTime: number;
}) {
  const positionKF = new VectorKeyframeTrack(
    ".position",
    [startTime, endTime],
    [...startPosition.toArray(), ...endPosition.toArray()]
  );
  const opacityKF = new VectorKeyframeTrack(
    "text.material.opacity",
    [
      startTime,
      startTime + ((endTime - startTime) * 3) / 5,
      startTime + ((endTime - startTime) * 5) / 5,
    ],
    [0, 1, 0]
  );
  const visibilityKF = new BooleanKeyframeTrack(
    ".visible",
    [0, startTime, endTime, 1],
    [false, true, true, false]
  );
  return new AnimationClip(name, 1.00001, [
    positionKF,
    opacityKF,
    visibilityKF,
  ]);
}
