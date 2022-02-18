import * as THREE from "three";

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

export function texturesParticules() {
    return texturesPathList;
}

function addPicturesPoints(group, geometry, texture) {
    const pointMaterial = new THREE.PointsMaterial({
        size: 0.1,
        alphaTest: 0.01,
        transparent: true,
        map: texture
    })
    const pointsObject = new THREE.Points(geometry, pointMaterial)

    group.add(pointsObject)
}

export function addParticules(group, positions, distance, circleTextureIndex, textureLoader) {
    const texture = textureLoader.load(texturesPathList[circleTextureIndex])
    for (let i = 0; i < positions.length; i++) {//
      positions[i] = THREE.MathUtils.randFloatSpread(distance)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    
    addPicturesPoints(group, geometry, texture)
    
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