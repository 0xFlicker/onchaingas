import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { Color } from "three";

export const OutlineMaterial = shaderMaterial(
  {
    color: new Color(0x000000),
    opacity: 1,
    width: 1,
    glow: 1,
    spacing: 1,
    offsetX: 0,
    offsetY: 0,
  },
  `varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }`,
  `
  // The color of grid lines
  uniform vec3 color;
  // The opacity of grid lines
  uniform float opacity;
  // The width of grid lines
  uniform float width;
  // The width of the glow around grid lines
  uniform float glow;

  varying vec2 vUv;

  void main() {
    vec2 coord = vUv.xy;
    coord.x = coord.x + offsetX;
    coord.y = coord.y + offsetY;
  
    vec2 outsideRect = abs(fract(vUv.xy - 0.5) - 0.5) / fwidth(vUv.xy);
    
    float line = min(outsideRect.x, outsideRect.y);

    float alpha = smoothstep(1.0, 0.0, (line - width) / glow);
    gl_FragColor = vec4(vec3(color), opacity * alpha);
  }
}`
);

extend({ OutlineMaterial });
