import { ShaderMaterialParameters } from "three";

/**
 * Glowing outline shader is a fragment shader that expresses a glowing outline around a mesh.
 */

export const outlineShader: ShaderMaterialParameters = {
  // uniforms: {
  //   color: { value: new Color(0x000000) },
  //   opacity: { value: 1.0 },
  //   width: { value: 0.005 },
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
    
  `,
};
