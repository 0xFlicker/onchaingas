import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { Color } from "three";

export const GridMaterial = shaderMaterial(
  {
    color: new Color(0x000000),
    opacity: 1,
    width: 1,
    glow: 1,
    spacing: 1,
    offsetX: 0,
    offsetY: 0,
  },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `,
  `
  // The color of grid lines
  uniform vec3 color;
  // The opacity of grid lines
  uniform float opacity;
  // The width of grid lines
  uniform float width;
  // The spacing of grid lines
  uniform vec2 spacing;
  // The x and y offset of grid lines
  uniform float offsetX;
  uniform float offsetY;
  // The width of the glow around grid lines
  uniform float glow;

  varying vec2 vUv;

  void main() {
    vec2 coord = vUv.xy;
    coord.x = coord.x + offsetX;
    coord.y = coord.y + offsetY;
  
    vec2 outsideRect = abs(fract(vUv.xy - 0.5) - 0.5) / fwidth(vUv.xy);
    vec2 v = mod(coord, spacing);
    vec2 v2 = mod(-coord, spacing);
    vec2 gridLeft = abs(fract(v.xy - 0.5) - 0.5) / fwidth(v.xy);
    vec2 gridRight = abs(fract(v2.xy - 0.5) - 0.5) / fwidth(v2.xy);
    
    float line = min(
      min(gridRight.x, gridRight.y),
      min(
        min(gridLeft.x, gridLeft.y),
        min(outsideRect.x, outsideRect.y)
      )
    );

    float alpha = smoothstep(1.0, 0.0, (line - width) / glow);
    gl_FragColor = vec4(vec3(color), opacity * alpha);

  }`
);

extend({ GridMaterial });
