import * as THREE from "three";

// Here the list of all the logos displayed on the Three.js 3D particules scene
const texturesPathList = [
    "three/baptiste.png",
    "three/emile.png",
    "three/nathaniael.png",
    "three/kilian.png",
    "three/chrome.png",
    "three/clashroyale.png",
    "three/discord.png",
    "three/facebook.png",
    "three/fortnite.png",
    "three/reddit.png",
    "three/tft.png",
]

// Export to use it in HomeThree.js
export function texturesParticules() {
    return texturesPathList;
}

// Add the particules represented by pictures in the given group following a given geometry system and a texture
// Called multiple times to create different pictures particules system
function addPicturesPoints(group: THREE.Group, geometry: THREE.BufferGeometry, texture: THREE.Texture) {
    const pointMaterial = new THREE.PointsMaterial({
        size: 0.1,
        alphaTest: 0.01,
        transparent: true,
        map: texture
    })
    const pointsObject = new THREE.Points(geometry, pointMaterial)

    group.add(pointsObject)
}

// Create particules and lines for a given texture and geometry, add to group
export function addParticules(group: THREE.Group, positions: Float32Array, distance: number, circleTextureIndex: number, textureLoader: THREE.TextureLoader) {

    // Load the given texture
    const texture = textureLoader.load(texturesPathList[circleTextureIndex])
    for (let i = 0; i < positions.length; i++) {//
      positions[i] = THREE.MathUtils.randFloatSpread(distance)
    }

    // The geometry system that points and lines follow (positions)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    
    // Add points in group
    addPicturesPoints(group, geometry, texture)
    
    // Create and add lines that link points
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 1,
      transparent: true,
      opacity: 0.12,
      depthWrite: false
    })
    const lineObject = new THREE.Line(geometry, lineMaterial)
    group.add(lineObject)
  }