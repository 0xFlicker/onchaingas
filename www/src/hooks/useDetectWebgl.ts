import { useState, useEffect } from "react";
import { isWebGL2Supported, isWebGLSupported } from "webgl-detector";

export function useDetectWebgl() {
  const [supportsWebGL, setSupportsWebGL] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only run this code in the browser environment
      setSupportsWebGL(isWebGLSupported() || isWebGL2Supported());
    }
  }, []);

  return supportsWebGL;
}
