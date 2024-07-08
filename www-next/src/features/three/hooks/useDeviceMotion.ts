import { useEffect, useState } from "react";
import * as THREE from "three";

export function useRelativeOrientationSensor() {
  const [quaternion, setQuaternion] = useState<number[]>([]);
  const [error, setError] = useState<SensorErrorEvent | null>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    let sensor: RelativeOrientationSensor | null = null;
    function onChange() {
      if (sensor?.quaternion) setQuaternion(sensor.quaternion);
    }
    function onError(err: SensorErrorEvent) {
      console.error(err);
      setError(err);
    }
    if ("permissions" in navigator && "query" in navigator.permissions) {
      Promise.all([
        navigator.permissions.query({ name: "accelerometer" } as any),
        navigator.permissions.query({ name: "gyroscope" } as any),
      ])
        .then((results) => {
          if (results.every((result) => result.state === "granted")) {
            if ("RelativeOrientationSensor" in window) {
              sensor = new RelativeOrientationSensor({
                frequency: 30,
                referenceFrame: "screen",
              });
              sensor?.addEventListener("reading", onChange);
              sensor?.addEventListener("error", onError);
              sensor?.start();
              setStarted(true);
            }
          } else {
            console.log("No permissions to use RelativeOrientationSensor.");
          }
        })
        .catch((error) => console.error(error));
    }
    return () => {
      console.log("removed");
      sensor?.removeEventListener("reading", onChange);
      sensor?.removeEventListener("error", onError as any);
      sensor?.stop();
    };
  }, []);
  return {
    quaternion,
    error,
    started,
  };
}

export function useGyroscopeSensor() {
  const [rotation, setRotation] = useState<THREE.Vector3>(new THREE.Vector3());
  const [error, setError] = useState<SensorErrorEvent | null>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    let sensor: Gyroscope | null = null;
    function onChange() {
      if (sensor?.x && sensor?.y && sensor?.z) {
        setRotation(new THREE.Vector3(sensor.x, sensor.y, sensor.z));
      }
    }
    function onError(err: SensorErrorEvent) {
      console.error(err);
      setError(err);
    }
    if ("permissions" in navigator && "query" in navigator.permissions) {
      Promise.all([navigator.permissions.query({ name: "gyroscope" } as any)])
        .then((results) => {
          if (results.every((result) => result.state === "granted")) {
            if ("RelativeOrientationSensor" in window) {
              sensor = new Gyroscope({
                frequency: 30,
                referenceFrame: "screen",
              });
              sensor?.addEventListener("reading", onChange);
              sensor?.addEventListener("error", onError);
              sensor?.start();
              setStarted(true);
            }
          } else {
            console.log("No permissions to use RelativeOrientationSensor.");
          }
        })
        .catch((error) => console.error(error));
    }
    return () => {
      sensor?.removeEventListener("reading", onChange);
      sensor?.removeEventListener("error", onError as any);
      sensor?.stop();
    };
  }, []);
  return {
    rotation,
    error,
    started,
  };
}

export function useDeviceMotionXY() {
  const [{ xAcceleration, yAcceleration }, setMotion] = useState({
    xAcceleration: 0,
    yAcceleration: 0,
  });

  useEffect(() => {
    const handleMotionEvent = (event: DeviceMotionEvent) => {
      console.log("DeviceMotionEvent", event);
      if (
        event.acceleration &&
        typeof event.acceleration.x === "number" &&
        typeof event.acceleration.y === "number"
      ) {
        setMotion({
          xAcceleration: event.acceleration.x,
          yAcceleration: event.acceleration.y,
        });
      }
    };

    window.addEventListener("devicemotion", handleMotionEvent, true);
    return () => window.removeEventListener("devicemotion", handleMotionEvent);
  }, []);
  return { xAcceleration, yAcceleration };
}
