import { Color, ShaderMaterialParameters } from "three";

/**
 * Grid shader is a fragment shader that expresses an x,y moveable grid pattern.
 * The color of the grid lines is exposed as a uniform.
 * The grid lines have an adjustable width.
 * The grid lines have an adjustable opacity.
 * The grid lines have an adjustable spacing.
 * The grid lines have an adjustable offset.
 * The grid lines have an adjustable glow.
 *
 * The background color is transparent.
 */

export const gridShader: ShaderMaterialParameters = {
  // uniforms: {
  //   color: { value: new Color(0x000000) },
  //   opacity: { value: 1.0 },
  //   width: { value: 0.005 },
  //   spacing: { value: 0.1 },
  //   offsetX: { value: 0.0 },
  //   offsetY: { value: 0.0 },
  //   glow: { value: 0.05 },
  // },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
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
      vec2 grid = abs(fract(v - 0.5) - 0.5) / fwidth(v);
      
      float line = 1.0 - min(min(grid.x, grid.y), min(outsideRect.x, outsideRect.y));
      
      float edge = smoothstep(0.0, 1.0, (line - width) / glow);
      // float glowValue = smoothstep(0.0, glow, line) / smoothstep(0.0, 1.0, line) - edge;
      
      float alpha = edge;
      
      gl_FragColor = vec4(vec3(color), opacity * alpha);
    }
    
  `,
};
