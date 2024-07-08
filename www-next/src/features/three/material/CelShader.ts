import * as THREE from "three";

const CelShaderMaterial = (color: THREE.Color) => {
  const uniforms = {
    u_color: { value: color },
  };

  const vertexShader = `
    varying vec3 vNormal;

    void main() {
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 u_color;

    varying vec3 vNormal;

    void main() {
      vec3 lightDirection = normalize(vec3(0.0, 1.0, 1.0));
      float dotProduct = dot(normalize(vNormal), lightDirection);

      float celShadedLight = ceil(dotProduct * 4.0) * 0.25;

      gl_FragColor = vec4(u_color * celShadedLight, 1.0);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });
};

export default CelShaderMaterial;
