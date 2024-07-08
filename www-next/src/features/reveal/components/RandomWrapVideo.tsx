import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSpring, animated } from "@react-spring/web";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface RandomWrapVideoProps {
  urls: string[];
  interval: number;
}

export const RandomWrapVideo: React.FC<RandomWrapVideoProps> = ({
  urls,
  interval,
}) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [springConfig, setSpringConfig] = useState({ duration: interval });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
  const theme = useTheme();

  const matchesSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMediumScreen = useMediaQuery(theme.breakpoints.only("md"));

  const changeVideo = useCallback(() => {
    setCurrentUrl((currentUrl) => {
      do {
        const randomIndex = Math.floor(Math.random() * urls.length);
        const randomUrl = urls[randomIndex];
        if (randomUrl !== currentUrl) {
          return randomUrl;
        }
      } while (true);
    });
    setVideoReady(false);
  }, [urls]);

  const positionVideoOffScreen = useCallback(() => {
    if (videoRef.current) {
      let videoWidth = videoRef.current.videoWidth;
      let videoHeight = videoRef.current.videoHeight;
      // Based off of the screen size, resize the video to better fit the screen
      if (matchesSmallScreen) {
        videoWidth /= 2;
        videoHeight /= 2;
      } else if (matchesMediumScreen) {
        videoWidth /= 1.5;
        videoHeight /= 1.5;
      }
      const randomX = -videoWidth - 10;
      const randomY = Math.random() * (window.innerHeight - videoHeight);
      setSpringConfig({ duration: 0 });
      setCoords({ x: randomX, y: randomY });
      setVideoSize({ width: videoWidth, height: videoHeight });
    }
  }, [matchesMediumScreen, matchesSmallScreen]);

  const moveVideo = useCallback(() => {
    if (videoRef.current) {
      const videoHeight = videoSize.height;

      const randomX = window.innerWidth + 10;
      const randomY = Math.random() * (window.innerHeight - videoHeight);
      setSpringConfig({ duration: interval });
      setCoords({ x: randomX, y: randomY });
    }
  }, [interval, videoSize.height]);

  useEffect(() => {
    changeVideo();
  }, [changeVideo]);

  useEffect(() => {
    if (videoReady) {
      const timer = setTimeout(() => {
        positionVideoOffScreen();

        setTimeout(() => {
          changeVideo();
        }, interval);

        setTimeout(() => {
          setOpacity(1);
          moveVideo();
        }, 0);

        setTimeout(() => {
          setOpacity(0);
        }, interval / 2);
      }, interval);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [interval, videoReady, positionVideoOffScreen, moveVideo, changeVideo]);

  const move = useSpring({
    left: coords.x,
    top: coords.y,
    config: springConfig,
    position: "absolute",
  });
  const fade = useSpring({
    opacity,
    config: {
      ...springConfig,
      duration: interval / 2,
    },
  });

  return (
    <animated.div
      style={{
        ...move,
        ...fade,
        overflow: "hidden",
        position: "fixed",
      }}
    >
      <video
        ref={videoRef}
        key={currentUrl}
        src={currentUrl}
        autoPlay
        loop
        muted
        onCanPlayThrough={() => setVideoReady(true)}
        width={videoSize.width}
        height={videoSize.height}
      />
    </animated.div>
  );
};
