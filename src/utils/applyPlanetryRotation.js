export const applyPlanetaryRotation = (
  meshInfo,
  rotationSpeed,
  revolutionSpeed,
) => {
  meshInfo.mesh.rotation.y += rotationSpeed;
  meshInfo.group.rotation.y += revolutionSpeed;
};
