import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";
import { addPlanetyMesh } from "./utils/addPlanetyMesh";
import { applyPlanetaryRotation } from "./utils";

const SUN_SIZE = 500;
const DISTANCE_BETWEEN_SUN_AND_EARTH = SUN_SIZE + 1000;
const EARTH_REVOLUTION_SPEED = 0.000172;
const EARTH_ROTATION_SPEED = 0.02625;

const mercuryToSunSizeRatio = 0.0035 * SUN_SIZE;
const mercuryToSunDistance = 0.387 * DISTANCE_BETWEEN_SUN_AND_EARTH;
const mercuryRotationSpeed = 0.017 * EARTH_ROTATION_SPEED;
const mercuryRevolutionSpeed = 4.15 * EARTH_REVOLUTION_SPEED;

const venusToSunSizeRatio = 0.0087 * SUN_SIZE;
const venusToSunDistance = 0.723 * DISTANCE_BETWEEN_SUN_AND_EARTH;
const venusRotationSpeed = 0.004 * EARTH_ROTATION_SPEED;
const venusRevolutionSpeed = 1.63 * EARTH_REVOLUTION_SPEED;

const earthToSunSizeRatio = 0.009 * SUN_SIZE;
const earthToSunDistance = 1 * DISTANCE_BETWEEN_SUN_AND_EARTH;
const earthRotationSpeed = 1 * EARTH_ROTATION_SPEED;
const earthRevolutionSpeed = 1 * EARTH_REVOLUTION_SPEED;

const moonToEarthSizeRatio = 0.27 * earthToSunSizeRatio;
const moonToEarthDistance = 0.00257 * DISTANCE_BETWEEN_SUN_AND_EARTH;
const moonRotationSpeed = 0.0366 * EARTH_ROTATION_SPEED;
const moonRevolutionSpeed = 13.36 * EARTH_REVOLUTION_SPEED;

const marsToSunSizeRatio = 0.0047 * SUN_SIZE;
const marsToSunDistance = 1.524 * DISTANCE_BETWEEN_SUN_AND_EARTH;
const marsRotationSpeed = 0.972 * EARTH_ROTATION_SPEED;
const marsRevolutionSpeed = 0.53 * EARTH_REVOLUTION_SPEED;

const jupiterToSunSizeRatio = 0.099 * SUN_SIZE;
const jupiterToSunDistance = 5.203 * DISTANCE_BETWEEN_SUN_AND_EARTH;
const jupiterRotationSpeed = 2.411 * EARTH_ROTATION_SPEED;
const jupiterRevolutionSpeed = 0.08 * EARTH_REVOLUTION_SPEED;

const saturnToSunSizeRatio = 0.083 * SUN_SIZE;
const saturnToSunDistance = 9.537 * DISTANCE_BETWEEN_SUN_AND_EARTH;
const saturnRotationSpeed = 2.246 * EARTH_ROTATION_SPEED;
const saturnRevolutionSpeed = 0.03 * EARTH_REVOLUTION_SPEED;

const saturnRingInnerRadius = saturnToSunSizeRatio * 1.8;
const saturnRingOuterRadius = saturnToSunSizeRatio * 2.3;

const uranusToSunSizeRatio = 0.036 * SUN_SIZE;
const uranusToSunDistance = 19.191 * DISTANCE_BETWEEN_SUN_AND_EARTH;
const uranusRotationSpeed = 1.388 * EARTH_ROTATION_SPEED;
const uranusRevolutionSpeed = 0.01 * EARTH_REVOLUTION_SPEED;

const neptuneToSunSizeRatio = 0.035 * SUN_SIZE;
const neptuneToSunDistance = 30.07 * DISTANCE_BETWEEN_SUN_AND_EARTH;
const neptuneRotationSpeed = 1.486 * EARTH_ROTATION_SPEED;
const neptuneRevolutionSpeed = 0.006 * EARTH_REVOLUTION_SPEED;

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath("/textures/CubeMap/");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100000,
);
camera.position.set(0, 0, 1000);

const scene = new THREE.Scene();

const backgroundCubeMap = cubeTextureLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);

scene.background = backgroundCubeMap;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 100000000);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// const pointLight = new THREE.PointLight(0xffffff, 10);
// pointLight.position.set(0, 0, 5);
// scene.add(pointLight);

const canvas = document.querySelector("canvas.threejs");

// Planets and Sun setup

// SUN

const { group: sunGroup, material: sunMaterial } = addPlanetyMesh(
  SUN_SIZE,
  { color: "yellow" },
  {
    parentGroup: scene,
    basicMaterial: true,
  },
);
const sunTexture = textureLoader.load("/textures/sun.jpg");
sunMaterial.map = sunTexture;
// sunMesh.scale.setScalar(10);
// sunGroup.position.set(0, 0, 0);

// MERCURY

const mercuryInfo = addPlanetyMesh(
  mercuryToSunSizeRatio,
  { color: "gray" },
  {
    parentGroup: sunGroup,
    groupRadius: mercuryToSunDistance,
  },
);
mercuryInfo.rotationSpeed = mercuryRotationSpeed;
mercuryInfo.revolutionSpeed = mercuryRevolutionSpeed;

const mercuryTexture = textureLoader.load("/textures/mercury.jpg");
mercuryInfo.material.map = mercuryTexture;

// VENUS

const venusInfo = addPlanetyMesh(
  venusToSunSizeRatio,
  { color: "gray" },
  {
    parentGroup: sunGroup,
    groupRadius: venusToSunDistance,
  },
);
venusInfo.rotationSpeed = venusRotationSpeed;
venusInfo.revolutionSpeed = venusRevolutionSpeed;

const venusTexture = textureLoader.load("/textures/venus.jpg");
venusInfo.material.map = venusTexture;
venusInfo.isClockwiseRotation = true;

// EARTH

const earthInfo = addPlanetyMesh(
  earthToSunSizeRatio,
  { color: "gray" },
  {
    parentGroup: sunGroup,
    groupRadius: earthToSunDistance,
  },
  true,
);
earthInfo.rotationSpeed = earthRotationSpeed;
earthInfo.revolutionSpeed = earthRevolutionSpeed;

const earthTexture = textureLoader.load("/textures/earth.jpg");
earthInfo.material.map = earthTexture;

const earthMoonGeometry = new THREE.SphereGeometry(
  moonToEarthSizeRatio,
  32,
  32,
);
const earthMoonMaterial = new THREE.MeshStandardMaterial({ color: "gray" });
const earthMoonMesh = new THREE.Mesh(earthMoonGeometry, earthMoonMaterial);
earthMoonMesh.position.set(moonToEarthDistance * 5, 0, 0);
const earthMoonMeshGroup = new THREE.Group();
earthMoonMeshGroup.add(earthMoonMesh);
earthMoonMeshGroup.rotation.x = Math.PI / 35;
earthMoonMeshGroup.position.set(0, 0, 0);
earthInfo.planetGroup.add(earthMoonMeshGroup);

const moonTexture = textureLoader.load("/textures/moon.jpg");
earthMoonMaterial.map = moonTexture;

// MARS

const marsInfo = addPlanetyMesh(
  marsToSunSizeRatio,
  { color: "gray" },
  {
    parentGroup: sunGroup,
    groupRadius: marsToSunDistance,
  },
);
marsInfo.rotationSpeed = marsRotationSpeed;
marsInfo.revolutionSpeed = marsRevolutionSpeed;
marsInfo.moons = [
  {
    name: "Phobos",
    size: 0.33 * marsToSunSizeRatio,
    distanceRatio: 0.00015,
    rotationSpeed: 0.01,
    revolutionSpeed: 0.01,
  },
];

const marsTexture = textureLoader.load("/textures/mars.jpg");
marsInfo.material.map = marsTexture;

// JUPITER

const jupiterInfo = addPlanetyMesh(
  jupiterToSunSizeRatio,
  { color: "gray" },
  {
    parentGroup: sunGroup,
    groupRadius: jupiterToSunDistance,
  },
);
jupiterInfo.rotationSpeed = jupiterRotationSpeed;
jupiterInfo.revolutionSpeed = jupiterRevolutionSpeed;

const jupiterTexture = textureLoader.load("/textures/jupiter.jpg");
jupiterInfo.material.map = jupiterTexture;

// SATURN

const saturnInfo = addPlanetyMesh(
  saturnToSunSizeRatio,
  { color: "gray" },
  {
    parentGroup: sunGroup,
    groupRadius: saturnToSunDistance,
  },
);
saturnInfo.rotationSpeed = saturnRotationSpeed;
saturnInfo.revolutionSpeed = saturnRevolutionSpeed;

const saturnRingGeometry = new THREE.RingGeometry(
  saturnRingInnerRadius,
  saturnRingOuterRadius,
  64,
);
const saturnRingMaterial = new THREE.MeshBasicMaterial({
  color: "gray",
  side: THREE.DoubleSide,
});
const saturnRingMesh = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
saturnRingMesh.rotation.x = Math.PI / 2;

const saturnRingTexture = textureLoader.load("/textures/saturn_ring.png");
saturnRingMaterial.map = saturnRingTexture;
// saturnRingMesh.rotation.x = Math.PI / 2;
saturnInfo.mesh.add(saturnRingMesh);

const saturnTexture = textureLoader.load("/textures/saturn.jpg");
saturnInfo.material.map = saturnTexture;

// URANUS

const uranusInfo = addPlanetyMesh(
  uranusToSunSizeRatio,
  { color: "gray" },
  {
    parentGroup: sunGroup,
    groupRadius: uranusToSunDistance,
  },
);
uranusInfo.rotationSpeed = uranusRotationSpeed;
uranusInfo.revolutionSpeed = uranusRevolutionSpeed;

const uranusTexture = textureLoader.load("/textures/uranus.jpg");
uranusInfo.material.map = uranusTexture;
uranusInfo.isClockwiseRotation = true;

// NEPTUNE

const neptuneInfo = addPlanetyMesh(
  neptuneToSunSizeRatio,
  { color: "gray" },
  {
    parentGroup: sunGroup,
    groupRadius: neptuneToSunDistance,
  },
);
neptuneInfo.rotationSpeed = neptuneRotationSpeed;
neptuneInfo.revolutionSpeed = neptuneRevolutionSpeed;

const neptuneTexture = textureLoader.load("/textures/neptune.jpg");
neptuneInfo.material.map = neptuneTexture;

const planetsArray = [
  mercuryInfo,
  venusInfo,
  earthInfo,
  marsInfo,
  jupiterInfo,
  saturnInfo,
  uranusInfo,
  neptuneInfo,
];

planetsArray.forEach((planetInfo) => {
  planetInfo.planetGroup
    ? planetInfo.planetGroup.scale.setScalar(5)
    : planetInfo.mesh.scale.setScalar(5);

  // planetInfo.material.emissive.set(0x333333);
});

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderLoop = () => {
  controls.update();
  planetsArray.forEach((planetInfo) => {
    applyPlanetaryRotation(
      planetInfo,
      planetInfo.rotationSpeed,
      planetInfo.revolutionSpeed,
    );
  });
  earthMoonMesh.rotation.y += moonRotationSpeed;
  earthMoonMeshGroup.rotation.y += moonRevolutionSpeed;

  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};
renderLoop();
