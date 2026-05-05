import * as THREE from "three";

export const addPlanetyMesh = (
  radius,
  materialOptions = {},
  options = {
    parentGroup: null,
    groupRadius: 0,
    revolutionSpeed: null,
    basicMaterial: false,
  },
  makeGroup,
) => {
  const returnObj = {};
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = options?.basicMaterial
    ? new THREE.MeshBasicMaterial({ ...materialOptions })
    : new THREE.MeshStandardMaterial({
        ...materialOptions,
      });

  const group = new THREE.Group();

  const mesh = new THREE.Mesh(geometry, material);
  returnObj.mesh = mesh;
  returnObj.material = material;
  returnObj.group = group;

  if (makeGroup) {
    const planetGroup = new THREE.Group();
    planetGroup.add(mesh);
    planetGroup.position.set(options.groupRadius || 0, 0, 0);
    group.add(planetGroup);
    returnObj.planetGroup = planetGroup;
  } else {
    mesh.position.set(options.groupRadius || 0, 0, 0);
    group.add(mesh);
  }

  const revolutionRing = new THREE.TorusGeometry(
    options.groupRadius,
    0.5,
    20,
    200,
  );
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: "lightgray",
    side: THREE.DoubleSide,
  });
  ringMaterial.opacity = 0.5;
  ringMaterial.transparent = true;

  const revolutionMesh = new THREE.Mesh(revolutionRing, ringMaterial);
  revolutionMesh.rotation.x = Math.PI / 2;
  group.add(revolutionMesh);

  group.position.set(0, 0, 0);
  options?.parentGroup?.add(group);

  return returnObj;
};
