
const THREE = require('three');

module.exports = function () {
  let gasPrice = 10;
  let element = null;
  let resizer;
  let rpc = "https://mainnet.infura.io/v3/382301aaaf3f4060bdefdbd132ae3c8f";
  let liveUpdate = false;
  let l;
  const tokenId = 0;
  let updateCount = 240;
  function setLiveUpdate(value) {
    liveUpdate = value;
    updateCount = 0;
  }
  function setGas(value) {
    gasPrice = value
  }
  function setElement(ref) {
    if (!ref) return;
    element = ref;
    let priorGasPrice = gasPrice;
    const gasPriceElement = document.createElement("div");
    gasPriceElement.style =
      "position: absolute; top: 10; right: 10; color: white";
    gasPriceElement.innerText = `Gas price: ${gasPrice} gwei`;
    element.appendChild(gasPriceElement);
    const o = (o) => (
      void 0 !== o && (l = o % 2147483647) <= 0 && (l += 2147483646),
      ((l = (16807 * l) % 2147483647) - 1) / 2147483646
    );
    o(tokenId);
    // get inner width and height of element....

    const { width: innerWidth, height: innerHeight } = element.getBoundingClientRect();
    let halfInnerHeight = innerHeight / 2;
    let gasHeight = innerHeight * 3;
    let pointerY = 0;

    const camera = new THREE.PerspectiveCamera(
      80,
      innerWidth / innerHeight,
      1,
      3e3
    );
    camera.position.z = 1500;

    function onPointerMove(event) {
      if (event.isPrimary) pointerY = event.clientY - halfInnerHeight;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0);
    const light = new THREE.HemisphereLight(16777147, 526368, 1);
    scene.add(light);
    const positionLight = new THREE.PointLight(16777147, 1, 1e3, 0);
    positionLight.position.set(0, 0, 150);
    positionLight.lookAt(0, 0, 0);
    scene.add(positionLight);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);

    // Draw a spigot to release the gas, using a cylinder that ends at 0, gasHeight / 2, 0
    const gasSpigotGeometry = new THREE.CylinderGeometry(
      50,
      100,
      gasHeight,
      32,
      1,
      true
    );
    gasSpigotGeometry.translate(0, gasHeight / 2, 0);
    const gasSpigotMaterial = new THREE.MeshPhongMaterial({
      color: Math.ceil(0xffffff * o()),
      side: THREE.DoubleSide,
      flatShading: true,
    });
    const gasSpigot = new THREE.Mesh(gasSpigotGeometry, gasSpigotMaterial);
    gasSpigot.position.set(0, gasHeight / 2, 0);
    scene.add(gasSpigot);

    const gasParticleMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.5,
      color: 16777147,
      blending: THREE.AdditiveBlending,
    });
    const GAS_PARTICLE_SIZE = 20;
    const gasParticleGeometry = new THREE.BoxGeometry(
      GAS_PARTICLE_SIZE,
      GAS_PARTICLE_SIZE,
      GAS_PARTICLE_SIZE
    );
    let particles = [];

    function addGasParticle() {
      const now = Date.now();
      const gasParticle = new THREE.Mesh(
        gasParticleGeometry,
        gasParticleMaterial
      );
      gasParticle.delay = Math.floor(5000 * Math.random()) + now;
      gasParticle.position.set(
        10 - 20 * Math.random(),
        200000,
        10 - 20 * Math.random()
      );
      gasParticle.rotation.set(o(), o(), o());
      particles.push(gasParticle);
      scene.add(gasParticle);
    }
    for (let i = 0; i < priorGasPrice; i++) {
      addGasParticle();
    }
    const stars = [];
    const starCount = 10 + Math.ceil(10 * o());
    const sphereGeometry = new THREE.SphereGeometry(2, 8, 8);
    const sphereMaterial = new THREE.MeshBasicMaterial();
    sphereMaterial.color.set(0xffffff);
    for (let i = 0; i < starCount; i++) {
      const star = new THREE.Mesh(sphereGeometry, sphereMaterial);
      star.position.set(
        1000 - 2000 * o(),
        1000 - 2000 * o(),
        1000 - 2000 * o()
      );
      stars.push(star);
      scene.add(star);
    }
    function resize() {
      const { width: innerWidth, height: innerHeight } = element.getBoundingClientRect();

      halfInnerHeight = innerHeight / 2;
      gasHeight = innerHeight * 3;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      gasSpigot.position.set(0, gasHeight / 2, 0);
    }
    resizer = resize;

    element.appendChild(renderer.domElement);
    element.style.touchAction = "none";
    element.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", resize);
    resize();

    function nextStep() {
      requestAnimationFrame(nextStep);
      if (liveUpdate && updateCount-- < 0) {
        updateCount = 240;
        fetch(rpc, {
          method: "POST",
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_gasPrice",
            params: [],
            id: 1,
          }),
        }).then(async res => {
          const { result } = await res.json();
          gasPrice = parseInt(result, 16) / 1e9;
        })
      }
      if (gasPrice !== priorGasPrice) {
        if (gasPrice > priorGasPrice) {
          for (let i = 0; i < gasPrice - priorGasPrice; i++) {
            addGasParticle();
          }
        } else {
          // remove particles from particles and scene
          let toRemove = priorGasPrice - gasPrice;
          for (const particle of particles) {
            if (!particle.done) {
              particle.done = true;
              toRemove--;
            }
            if (toRemove <= 0) break;
          }
        }
        priorGasPrice = gasPrice;
        gasPriceElement.innerText = `Gas price: ${gasPrice} gwei`;
      }

      (camera.position.y += 0.05 * (200 - pointerY - camera.position.y)),
        (scene.rotation.y -= 0.005),
        camera.lookAt(scene.position),
        renderer.render(scene, camera);
      const now = Date.now();
      const time = 0.001 * now;
      const turn = Math.sin(time);
      for (const gasParticle of particles) {
        if (gasParticle.delay) {
          if (now > gasParticle.delay) {
            gasParticle.delay = null;
            gasParticle.position.y = gasHeight / 2 + 20 + 20 * Math.random();
          } else {
            continue;
          }
        }
        gasParticle.velocity =
          gasParticle.velocity || new THREE.Vector3(0, -1, 0);
        gasParticle.velocity.y -= 0.267;
        gasParticle.position.add(gasParticle.velocity);
        if (gasParticle.position.y < -gasHeight / 2) {
          if (!gasParticle.bounceCount) {
            gasParticle.bounceCount = 1;
            gasParticle.velocity.x = 8 - 16 * Math.random();
            gasParticle.velocity.z = 8 - 16 * Math.random();
            gasParticle.velocity.y = -gasParticle.velocity.y * 0.2;
            gasParticle.position.y = -gasHeight / 2;
          } else if (gasParticle.bounceCount < 3) {
            gasParticle.bounceCount++;
            gasParticle.velocity.y = -gasParticle.velocity.y * 0.2;
            gasParticle.position.y = -gasHeight / 2;
          } else if (gasParticle.done) {
            particles.splice(particles.indexOf(gasParticle), 1);
            scene.remove(gasParticle);
          } else {
            gasParticle.position.set(
              10 - 20 * Math.random(),
              2000000,
              10 - 20 * Math.random()
            );
            gasParticle.bounceCount = 0;
            gasParticle.velocity.x = 0;
            gasParticle.velocity.y = -1;
            gasParticle.velocity.z = 0;
            gasParticle.delay = Math.floor(5000 * Math.random()) + now;
          }
        }
      }
    }

    nextStep();
  }
  function cleanup() {
    window.removeEventListener('resize', resizer);
  }
  return { setGas, setElement, cleanup, setLiveUpdate };
}
