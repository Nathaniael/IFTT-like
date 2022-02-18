import * as THREE from "three";

const texturesPathList = [
    "three/baptiste.jpg",
    "three/emile.jpg",
    "three/nathaniael.jpg",
    "three/kilian.jpg",
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